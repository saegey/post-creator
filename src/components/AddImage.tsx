import { Box, Close, Flex, Image, Button, Grid } from 'theme-ui';
import CloudinaryUpload from './CloudinaryUpload';
import { useState } from 'react';
import { createEditor, Descendant, Transforms } from 'slate';

const AddImage = ({ isOpen, post, editor }) => {
  const images = JSON.parse(post.images);
  const [selectedImage, setSelectedImage] = useState('');
  const [uploadedImages, setUploadedImages] = useState(images ? images : []);

  const insertImage = () => {
    isOpen(false);

    Transforms.insertNodes(editor, [
      {
        type: 'image',
        src: selectedImage,
        children: [{ text: '' }],
        void: true,
      } as Descendant,
      { type: 'text', children: [{ text: '' }] } as Descendant,
    ]);
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
          width: '70%',
          height: '90%',
          margin: 'auto',
          background: 'white',
          borderRadius: '5px',
        }}
        onClick={() => console.log('box clicked')}
      >
        <Box
          sx={{
            padding: '20px',
          }}
        >
          <Flex>
            <Box>
              <h2>Media</h2>
            </Box>
            <Box sx={{ marginLeft: 'auto' }}>
              <Close onClick={() => isOpen(false)} />
            </Box>
          </Flex>
          <CloudinaryUpload post={post} setUploadedImages={setUploadedImages} />
          {/* <Flex sx={{ marginTop: '50px', gap: '20px' }}> */}
          <Grid
            gap={'20px'}
            columns={[2, 2, 2]}
            sx={{ marginTop: '50px', overflowY: 'auto' }}
          >
            {uploadedImages.map((image) => (
              <Box
                // onBlur={() => {
                //   console.log('blur');
                // }}
                sx={{
                  height: '100%',
                  // border:
                  //   image.secureUrl === selectedImage
                  //     ? '2px solid blue'
                  //     : 'none',
                }}
              >
                <Image
                  onClick={() => {
                    setSelectedImage(image.secureUrl);
                  }}
                  src={image.secureUrl}
                  sx={{
                    maxWidth: '300px',
                    maxHeight: '200px',
                    width: 'auto',
                    height: 'auto',
                    // width: 'auto',
                    border:
                      image.secureUrl === selectedImage
                        ? '2px solid blue'
                        : 'none',
                  }}
                />
              </Box>
            ))}
          </Grid>
          <Box sx={{ marginTop: '20px' }}>
            <Button
              onClick={insertImage}
              disabled={selectedImage ? false : true}
            >
              Choose
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddImage;
