import { Box, Flex, Button, Text, Input, Progress, Close } from 'theme-ui';
import { useState } from 'react';
// import { Storage, API } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { GraphQLSubscription } from '@aws-amplify/api';
import * as subscriptions from '../graphql/subscriptions';
import { OnUpdatePostSubscription } from '../API';

import { UpdatePostMutation } from '../../src/API';
import { updatePost } from '../../src/graphql/mutations';
import BlackBox from './BlackBox';

const UploadGpxModal = ({ openModal, post, setProcess }) => {
  const [fileData, setFileData] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState({ loaded: 0, total: 0 });

  const uploadFile = async () => {
    setIsUploading(true);

    if (!fileData || !fileData.name) return;
    const result = await Storage.put(fileData.name, fileData, {
      progressCallback(progress) {
        setProgress({ loaded: progress.loaded, total: progress.total });
      },
      metadata: { postId: post.id, hello: 'world' },
      contentType: fileData.type,
      level: 'public',
    });

    try {
      const response = (await API.graphql({
        authMode: 'AMAZON_COGNITO_USER_POOLS',
        query: updatePost,
        variables: {
          input: {
            id: post.id,
            gpxFile: result.key,
          },
        },
      })) as GraphQLResult<UpdatePostMutation>;

      // Subscribe to creation of Todo
      const sub = API.graphql<GraphQLSubscription<OnUpdatePostSubscription>>(
        graphqlOperation(subscriptions.onUpdatePost)
      ).subscribe({
        next: ({ provider, value }) => console.log({ provider, value }),
        error: (error) => console.warn(error),
      });
      console.log(response, sub);
      console.log(21, result);

      setIsUploading(false);
      setProcess('processing');
      openModal(false);
    } catch (error) {
      console.error(error);
      setIsUploading(false);
      // throw new Error(errors[0].message);
    }
  };

  return (
    <BlackBox>
      <Box
        sx={{
          width: '80%',
          height: '70%',
          margin: 'auto',
          background: 'white',
          borderRadius: '5px',
          padding: '20px',
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
  );
};

export default UploadGpxModal;
