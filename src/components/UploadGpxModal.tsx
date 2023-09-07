import { Box, Flex, Button, Text, Input, Progress, Close } from 'theme-ui';
import React from 'react';
import { GraphQLResult } from '@aws-amplify/api';
import { Storage, API, PubSub } from 'aws-amplify';

import { UpdatePostMutation } from '../../src/API';
import { updatePost } from '../../src/graphql/mutations';
import BlackBox from './BlackBox';
import { PostContext, PostContextType } from '../PostContext';
import { getActivity, getPostQuery } from '../actions/PostGet';
import {
  attachIoTPolicyToUser,
  configurePubSub,
  getEndpoint,
} from '../../src/actions/PubSub';
import { EditorContext } from './EditorContext';

const processStatuses = {
  'file-downloaded': 'File being downloaded for processing.',
  'meta-downloaded': 'File metadata being fetched',
  'xml-parse': 'XML is being parsed',
  'gpx-parse': 'GPX XML is being converted to GeoJSON',
  'process-data': 'Data is being processed and deriving metrics',
  'update-data': 'Metrics and data is being saved',
};

const UploadGpxModal = () => {
  const [fileData, setFileData] = React.useState<File>();
  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState({ loaded: 0, total: 0 });
  const [processingGpxStatus, setProcessingGpxStatus] =
    React.useState('Pending');
  const [processingFile, setIsProcessingFile] = React.useState(false);
  const [subPubConfigured, setSubPubConfigured] = React.useState(false);

  const {
    id,
    currentFtp,
    setActivity,
    setGpxFile,
    setDistance,
    setElevationTotal,
    setElapsedTime,
    setStoppedTime,
    setTimeInRed,
    setNormalizedPower,
    setTempAnalysis,
    setHeartAnalysis,
    setCadenceAnalysis,
    setPowerAnalysis,
    setPowerZoneBuckets,
    setPowerZones,
  }: PostContextType = React.useContext(PostContext);

  const { setIsGpxUploadOpen } = React.useContext(EditorContext);

  const uploadFile = async () => {
    setIsUploading(true);
    setIsProcessingFile(true);

    if (!fileData || !fileData.name) return;
    const result = await Storage.put(fileData.name, fileData, {
      progressCallback(progress) {
        setProgress({ loaded: progress.loaded, total: progress.total });
        if (progress.total === progress.loaded) {
          setProcessingGpxStatus('File successfully uploaded');
        }
      },
      metadata: {
        postId: id,
        currentFtp: currentFtp ? currentFtp : '0',
      },
      contentType: fileData.type,
      level: 'public',
    });

    try {
      (await API.graphql({
        authMode: 'AMAZON_COGNITO_USER_POOLS',
        query: updatePost,
        variables: {
          input: {
            id: id,
            gpxFile: result.key,
          },
        },
      })) as GraphQLResult<UpdatePostMutation>;
    } catch (error) {
      console.error(error);
      setIsUploading(false);
    }
  };

  const processUpdates = async (post) => {
    const activity = await getActivity(post);
    console.log(post);
    setActivity(activity);
    setGpxFile(post.gpxFile);
    setElevationTotal(post.elevationTotal);
    setDistance(post.distance);
    setElapsedTime(post.elapsedTime);
    setStoppedTime(post.stoppedTime);
    setNormalizedPower(post.normalizedPower);
    setTempAnalysis(JSON.parse(post.tempAnalysis));
    setHeartAnalysis(JSON.parse(post.heartAnalysis));
    setCadenceAnalysis(JSON.parse(post.cadenceAnalysis));
    setPowerAnalysis(JSON.parse(post.powerAnalysis));
    setPowerZones(JSON.parse(post.powerZones));
    setPowerZoneBuckets(JSON.parse(post.powerZoneBuckets));
    setTimeInRed(post.timeInRed);
  };

  // React.useEffect(() => {
  //   if (processingGpxStatus === 'update-data') {
  //     getPostQuery(id).then((d) => {
  //       processUpdates(d.data?.getPost).then(() => {
  //         // setIsGpxUploadOpen(false);
  //         setProcessingGpxStatus('GPX file has been processed and analyzed');
  //       });
  //     });
  //   }
  // }, [processingGpxStatus]);

  const setUpSub = async () => {
    if (!subPubConfigured) {
      const endpoint = await getEndpoint();
      await configurePubSub(endpoint);
      await attachIoTPolicyToUser();
      setSubPubConfigured(true);
    }

    return PubSub.subscribe('newpost').subscribe({
      next: (data: any) => {
        console.log(data.value.phase);
        const phase = data.value.phase;
        setProcessingGpxStatus(processStatuses[data.value.phase]);

        if (phase === 'update-data') {
          getPostQuery(id).then((d) => {
            processUpdates(d.data?.getPost).then(() => {
              // setIsGpxUploadOpen(false);
              setProcessingGpxStatus(
                'GPX file has been processed and analyzed'
              );
              setIsProcessingFile(false);
            });
          });
        }
      },
      error: (error) => console.error(error),
    });
  };

  React.useEffect(() => {
    let subUpdates;

    setUpSub().then((sub) => {
      subUpdates = sub;
    });

    return () => {
      // console.log('destroy');
      if (subUpdates) {
        subUpdates.unsubscribe();
      }
    };
  }, [subPubConfigured]);

  return (
    <>
      {/* {processingGpxStatus && (
        <BlackBox>
          <Flex sx={{ width: '100%', height: '100%' }}>
            <Box sx={{ margin: 'auto' }}>
              <Text as='p' sx={{ color: 'text', fontSize: '30px' }}>
                {processingGpxStatus}
              </Text>
            </Box>
          </Flex>
        </BlackBox>
      )} */}
      <BlackBox>
        <Box
          sx={{
            width: '80%',
            maxWidth: '710px',
            margin: 'auto',
            background: 'background',
            borderRadius: '5px',
            padding: '20px',
            zIndex: 5000,
          }}
        >
          <Flex>
            <Box>
              <Text as='h2'>Upload GPX file</Text>
            </Box>
            <Box
              sx={{
                marginLeft: 'auto',
              }}
            >
              <Close
                onClick={() => {
                  setIsGpxUploadOpen(false);
                }}
              />
            </Box>
          </Flex>

          <Box>
            <Box>
              <Input
                type='file'
                disabled={isUploading}
                sx={{ marginY: '20px', border: '1px solid #cdcdcd' }}
                onChange={(e) => {
                  if (e.target && e.target.files && e.target.files.length > 0) {
                    setFileData(e.target?.files[0]);
                  } else {
                    console.log('no file attached');
                  }
                }}
              />
            </Box>
            <Box>
              <Button
                onClick={uploadFile}
                sx={{
                  ':disabled': {
                    backgroundColor: '#c6c6c6',
                    cursor: 'not-allowed',
                  },
                }}
                disabled={processingFile}
              >
                Upload
              </Button>
            </Box>
            <Box sx={{ marginTop: '20px' }}>
              {progress.loaded > 0 && (
                <>
                  <Progress
                    max={progress.total}
                    value={progress.loaded}
                  ></Progress>
                  <p>{`${((progress.loaded / progress.total) * 100).toFixed(
                    0
                  )}%`}</p>
                </>
              )}
            </Box>
            <Text as='span'>
              {progress.total === progress.loaded && progress.loaded !== 0
                ? processingGpxStatus
                : ''}
            </Text>
          </Box>
        </Box>
      </BlackBox>
    </>
  );
};

export default UploadGpxModal;
