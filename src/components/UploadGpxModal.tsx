import { Box, Flex, Button, Text, Input, Progress, Close } from 'theme-ui';
import React from 'react';
// import { Storage, API } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import { Storage, API, PubSub } from 'aws-amplify';

import { UpdatePostMutation } from '../../src/API';
import { updatePost } from '../../src/graphql/mutations';
import BlackBox from './BlackBox';
import { PostContext } from '../PostContext';
import { getActivity, getPostQuery } from '../actions/PostGet';
import {
  attachIoTPolicyToUser,
  configurePubSub,
  getEndpoint,
} from '../../src/actions/PubSub';

const UploadGpxModal = ({ openModal }) => {
  const [fileData, setFileData] = React.useState<File>();
  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState({ loaded: 0, total: 0 });
  const [processingGpxStatus, setProcessingGpxStatus] = React.useState('');
  const [subPubConfigured, setSubPubConfigured] = React.useState(false);

  const { id, setActivity, setGpxFile } = React.useContext(PostContext);

  const uploadFile = async () => {
    setIsUploading(true);

    if (!fileData || !fileData.name) return;
    const result = await Storage.put(fileData.name, fileData, {
      progressCallback(progress) {
        setProgress({ loaded: progress.loaded, total: progress.total });
      },
      metadata: { postId: id, hello: 'world' },
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

      // setIsUploading(false);
    } catch (error) {
      console.error(error);
      setIsUploading(false);
    }
  };

  const processUpdates = async (post) => {
    const activity = await getActivity(post);
    setActivity(activity);
    setGpxFile(post.gpxFile);
  };

  React.useEffect(() => {
    if (processingGpxStatus === 'update-data') {
      getPostQuery(id).then((d) => {
        processUpdates(d.data.getPost).then(() => {
          // console.log('data is updated');
          openModal(false);
        });
        // setPowerAnalysis(JSON.parse(d.data.getPost.powerAnalysis));
      });
    }
  }, [processingGpxStatus]);

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
        setProcessingGpxStatus(data.value.phase);
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
      {processingGpxStatus && (
        <BlackBox>
          <Flex sx={{ width: '100%', height: '100%' }}>
            <Box sx={{ margin: 'auto' }}>
              <Text as='p' sx={{ color: 'white', fontSize: '30px' }}>
                {processingGpxStatus}
              </Text>
            </Box>
          </Flex>
        </BlackBox>
      )}
      {!processingGpxStatus && (
        <BlackBox>
          <Box
            sx={{
              width: '80%',
              margin: 'auto',
              background: 'white',
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
                    openModal(false);
                  }}
                />
              </Box>
            </Flex>

            <Box>
              <Box>
                <Input
                  type='file'
                  disabled={isUploading}
                  sx={{ marginY: '20px' }}
                  onChange={(e) => setFileData(e.target.files[0])}
                />
              </Box>
              <Box>
                <Button onClick={uploadFile} disabled={isUploading}>
                  Upload file
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
              {progress.total === progress.loaded && progress.loaded !== 0
                ? 'File uploaded successfully'
                : ''}
            </Box>
          </Box>
        </BlackBox>
      )}
    </>
  );
};

export default UploadGpxModal;
