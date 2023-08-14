import { Box, Close, Flex, Image, Button } from 'theme-ui';
import CloudinaryUpload from './CloudinaryUpload';
import { useState } from 'react';
import { createEditor, Descendant, Transforms } from 'slate';

const AddImage = ({ isOpen, post, editor }) => {
  // console.log(post.images)
  const images = JSON.parse(post.images);
  const [selectedImage, setSelectedImage] = useState('');
  const [uploadedImages, setUploadedImages] = useState(images ? images : []);

  const insertImage = () => {
    isOpen(false);
    console.log(selectedImage);
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
        // onClick={() => {
        //   console.log('blah');
        // }}
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
          <Flex sx={{ marginTop: '50px', gap: '20px' }}>
            {uploadedImages.map((image) => (
              <Box
                onClick={() => {
                  // console.log(image);
                  setSelectedImage(image.secureUrl);
                }}
                onBlur={() => {
                  console.log('blur');
                }}
                sx={{
                  height: '310px',
                  border:
                    image.secureUrl === selectedImage
                      ? '2px solid blue'
                      : 'none',
                }}
              >
                <Image
                  src={image.secureUrl}
                  sx={{ height: '100%', width: 'auto' }}
                />
                {/* <p>{image.secureUrl}</p> */}
              </Box>
            ))}
          </Flex>
          <Box sx={{ marginTop: '20px' }}>
            {/* <p>{JSON.stringify(uploadedImages)}</p> */}
            {/* <p>{selectedImage}</p> */}
            <Button onClick={insertImage}>Choose</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddImage;
