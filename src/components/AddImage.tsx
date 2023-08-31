import { Box, Close, Flex, Button, Grid } from 'theme-ui';
import React from 'react';
import { Descendant, Transforms } from 'slate';
import { CldImage } from 'next-cloudinary';

import CloudinaryUpload from './CloudinaryUpload';
import { PostContext } from '../PostContext';

import BlackBox from './BlackBox';

export interface CloudinaryImage {
  asset_id: string;
  public_id: string;
  secure_url: string;
  format: 'jpeg' | 'jpg' | 'png';
}

const AddImage = ({ isOpen, editor }) => {
  const [selectedImage, setSelectedImage] = React.useState<CloudinaryImage>();
  const { setImages, images, id } = React.useContext(PostContext);

  const insertImage = () => {
    if (!selectedImage) {
      return;
    }
    isOpen(false);

    Transforms.insertNodes(editor, [
      {
        type: 'image',
        asset_id: selectedImage?.asset_id,
        public_id: selectedImage?.public_id,
        children: [{ text: '' }],
        void: true,
      } as Descendant,
      { type: 'text', children: [{ text: '' }] } as Descendant,
    ]);
  };

  return (
    <BlackBox>
      <Box
        sx={{
          width: '70%',
          height: '90%',
          margin: 'auto',
          background: 'white',
          borderRadius: '5px',
        }}
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
          <CloudinaryUpload
            images={images}
            postId={id}
            setUploadedImages={setImages}
          />
          <Grid
            gap={'20px'}
            columns={[2, 2, 2]}
            sx={{ marginTop: '50px', overflowY: 'auto' }}
          >
            {images &&
              images.map((image, i) => (
                <Box
                  sx={{
                    height: '100%',
                  }}
                  key={`image-${i}`}
                >
                  <CldImage
                    onClick={() => {
                      setSelectedImage(image);
                    }}
                    width='300'
                    height='200'
                    src={image.public_id}
                    // preserveTransformations
                    underlay={image.public_id}
                    quality={90}
                    sizes='100vw'
                    alt='Description of my image'
                    style={{
                      border:
                        selectedImage &&
                        image.secure_url === selectedImage.secure_url
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
    </BlackBox>
  );
};

export default AddImage;
