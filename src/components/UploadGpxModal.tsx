import { Box, Flex, Button } from 'theme-ui';
import { useState } from 'react';
import { Storage, API } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';

import { UpdatePostMutation } from '../../src/API';
import { updatePost } from '../../src/graphql/mutations';

const UploadGpxModal = ({ openModal, post }) => {
  const [fileData, setFileData] = useState<File>();
  const [fileStatus, setFileStatus] = useState(false);

  const uploadFile = async () => {
    if (!fileData || !fileData.name) return;
    const result = await Storage.put(fileData.name, fileData, {
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
      console.log(response);
      console.log(21, result);
      setFileStatus(true);
    } catch (error) {
      console.error(error);
      // throw new Error(errors[0].message);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '0',
        height: '100%',
        width: '100%',
        left: '0',
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 10000,
        display: 'flex',
      }}
    >
      <Box
        sx={{
          width: '80%',
          height: '70%',
          margin: 'auto',
          background: 'white',
          borderRadius: '5px',
        }}
      >
        <Flex>
          <Box
            sx={{
              marginLeft: 'auto',
              paddingRight: '10px',
              paddingTop: '10px',
            }}
          >
            <Button
              onClick={() => {
                openModal(false);
              }}
            >
              X
            </Button>
          </Box>
        </Flex>

        <Box sx={{ padding: '20px' }}>
          <div>
            <input
              type='file'
              onChange={(e) => setFileData(e.target.files[0])}
            />
          </div>
          <div>
            <Button onClick={uploadFile}>Upload file</Button>
          </div>
          {fileStatus ? 'File uploaded successfully' : ''}
        </Box>
      </Box>
    </Box>
  );
};

export default UploadGpxModal;
