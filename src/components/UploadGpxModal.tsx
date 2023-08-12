import { Box, Flex, Button } from 'theme-ui';
import { useState } from 'react';
import { Storage } from 'aws-amplify';

const UploadGpxModal = ({openModal}) => {
  const [fileData, setFileData] = useState<File>();
  const [fileStatus, setFileStatus] = useState(false);

  const uploadFile = async () => {
    if (!fileData || !fileData.name) return;
    const result = await Storage.put(fileData.name, fileData, {
      contentType: fileData.type,
    });
    setFileStatus(true);
    console.log(21, result);
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

        <Box>
          <div>
            <input
              type='file'
              onChange={(e) => setFileData(e.target.files[0])}
            />
          </div>
          <div>
            <button onClick={uploadFile}>Upload file</button>
          </div>
          {fileStatus ? 'File uploaded successfully' : ''}
        </Box>
      </Box>
    </Box>
  );
};

export default UploadGpxModal