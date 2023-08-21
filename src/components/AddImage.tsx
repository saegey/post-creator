import { Box, Close, Flex, Image, Button, Grid } from 'theme-ui';
import { useContext, useState } from 'react';
import { Descendant, Transforms } from 'slate';

import CloudinaryUpload from './CloudinaryUpload';
import { PostContext } from '../PostContext';

import BlackBox from './BlackBox';

const thumbnailUrl = (image) => {
  return `https://res.cloudinary.com/dprifih4o/image/upload/t_resize-tst/${image.public_id}.${image.format}`;
};

const editorUrl = (image) => {
  return `https://res.cloudinary.com/dprifih4o/image/upload/f_auto,q_auto/${image.public_id}.${image.format}`;
};

interface CloudinaryImage {
  asset_id: string;
  public_id: string;
  secure_url: string;
}

const AddImage = ({ isOpen, editor }) => {
  const [selectedImage, setSelectedImage] = useState<CloudinaryImage>();
  const { setImages, images, post } = useContext(PostContext);

  const insertImage = () => {
    isOpen(false);

    Transforms.insertNodes(editor, [
      {
        type: 'image',
        src: editorUrl(selectedImage),
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
            postId={post.id}
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
                  <Image
                    onClick={() => {
                      setSelectedImage(image);
                    }}
                    src={thumbnailUrl(image)}
                    sx={{
                      maxWidth: '300px',
                      maxHeight: '200px',
                      width: 'auto',
                      height: 'auto',
                      // width: 'auto',
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
