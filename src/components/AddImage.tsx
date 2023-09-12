import { Box, Flex, Button, Grid } from 'theme-ui';
import React from 'react';
import { CldImage, CldUploadButton } from 'next-cloudinary';
import { GraphQLResult } from '@aws-amplify/api';
import { API } from 'aws-amplify';

import { PostContext } from '../PostContext';
import StandardModal from './StandardModal';
import { updatePost } from '../../src/graphql/mutations';
import { UpdatePostMutation } from '../../src/API';
import { EditorContext } from './EditorContext';

export interface CloudinaryImage {
  asset_id: string;
  public_id: string;
  secure_url: string;
  format: 'jpeg' | 'jpg' | 'png';
  width: number;
  height: number;
}

const AddImage = ({ callback }) => {
  const [selectedImage, setSelectedImage] = React.useState<CloudinaryImage>();
  const { setImages, images, id } = React.useContext(PostContext);
  const { setIsImageModalOpen, isImageModalOpen } =
    React.useContext(EditorContext);

  return (
    <StandardModal
      title={'Images'}
      isOpen={isImageModalOpen}
      setIsOpen={setIsImageModalOpen}
    >
      <Box sx={{}}>
        <Box
          sx={{
            '.cloudButton': {
              backgroundColor: 'primary',
              borderRadius: '5px',
              color: 'background',
              '&:hover': {
                backgroundColor: '#616161',
              },
            },
          }}
        >
          <CldUploadButton
            className='cloudButton'
            uploadPreset='epcsmymp'
            onSuccess={async (d) => {
              images?.push(d.info as CloudinaryImage);
              // console.log(d, images);
              if (images) {
                setImages([...images]);
                try {
                  const response = (await API.graphql({
                    authMode: 'AMAZON_COGNITO_USER_POOLS',
                    query: updatePost,
                    variables: {
                      input: {
                        images: JSON.stringify(images),
                        id: id,
                      },
                    },
                  })) as GraphQLResult<UpdatePostMutation>;
                  console.log('response', response);
                } catch (errors) {
                  console.error(errors);
                }
              }
            }}
          />
        </Box>
        <Grid
          gap={'20px'}
          columns={[2, 2, 2]}
          sx={{ marginTop: '20px', overflow: 'scroll', maxHeight: '450px' }}
        >
          {images &&
            images.map((image, i) => {
              console.log(image);
              return (
                <Flex
                  sx={{
                    backgroundColor: 'activityOverviewBackgroundColor',
                    height: '100%',
                    borderRadius: '5px',
                    border:
                      selectedImage &&
                      image.secure_url === selectedImage.secure_url
                        ? '2px solid blue'
                        : 'none',
                  }}
                  key={`image-media-${i}`}
                  onClick={() => {
                    console.log('fdsf');
                    setSelectedImage(image);
                  }}
                >
                  <Flex
                    sx={{
                      // width: 'auto',
                      marginX: 'auto',
                      // height: '250px',
                      // width: '250px',
                    }}
                    key={`image-${i}`}
                  >
                    <Box sx={{ margin: 'auto' }}>
                      <CldImage
                        width={(image.width / image.height) * 250}
                        height={250}
                        src={image.public_id}
                        underlay={image.public_id}
                        quality={90}
                        sizes='100vw'
                        alt='Description of my image'
                        style={{
                          height: 'auto',
                          maxWidth: '100%',
                        }}
                      />
                    </Box>
                  </Flex>
                </Flex>
              );
            })}
        </Grid>
        <Box
          sx={{
            marginTop: '20px',
            paddingTop: '20px',
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
            borderTopColor: 'divider',
          }}
        >
          <Button
            onClick={() => {
              setTimeout(() => {
                callback({ selectedImage });
                setIsImageModalOpen(false);
              }, 10);
            }}
            disabled={selectedImage ? false : true}
          >
            Choose
          </Button>
        </Box>
      </Box>
    </StandardModal>
  );
};

export default AddImage;
