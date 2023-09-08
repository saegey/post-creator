import { Box, Text, Flex, Button } from 'theme-ui';
import React from 'react';
import { useSlateStatic, ReactEditor } from 'slate-react';
import { CldImage } from 'next-cloudinary';

import { PostContext } from '../PostContext';
import AddImage from './AddImage';
import PostHeader from './PostHeader';

const HeroBanner = ({ element }) => {
  const { heroImage, setHeroImage, title, postLocation } =
    React.useContext(PostContext);
  const [addImageModal, setAddImageModal] = React.useState(false);
  const editor = useSlateStatic() as ReactEditor;

  const addImage = ({ selectedImage }) => {
    console.log(selectedImage);
    setHeroImage(selectedImage);
  };

  return (
    <Box
      sx={{
        width: '100%',
        // height: '400px',
        // backgroundColor: 'gray',
        borderRadius: '5px',
      }}
      onHover={() => {
        console.log('hover over this');
      }}
      contentEditable={false}
    >
      {addImageModal && (
        <AddImage
          isOpen={setAddImageModal}
          editor={editor}
          callback={addImage}
        />
      )}
      {heroImage ? (
        <Flex sx={{ position: 'relative' }}>
          <PostHeader
            headerImage={
              <CldImage
                width='800'
                height='800'
                src={heroImage.public_id}
                sizes='100vw'
                alt='race pic'
                quality={90}
                style={{
                  objectFit: 'cover',
                  // width: '100%',
                  height: '100%',
                  // borderRadius: '5px',
                }}
              />
            }
            type={'Race'}
            teaser={'This is an epic race that you need to attend.'}
            headerImageCaption={'Thee fieelld strung out on the first descent'}
            title={title ? title : ''}
            location={postLocation ? postLocation : ''}
            date={'2023-09-09'}
          />

          <Box>
            <Button
              type='button'
              onClick={() =>
                setTimeout(() => {
                  setAddImageModal(true);
                }, 10)
              }
              sx={{ position: 'absolute', left: '10px', top: '20px' }}
            >
              Change Image
            </Button>
          </Box>
        </Flex>
      ) : (
        <Flex
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            backgroundColor: 'gray',
          }}
        >
          {/* <Box sx={{ position: 'absolute' }}> */}
          <Button
            type='button'
            onClick={() =>
              setTimeout(() => {
                setAddImageModal(true);
              }, 10)
            }
          >
            Add Image
          </Button>
          {/* </Box> */}
        </Flex>
      )}
    </Box>
  );
};

export default HeroBanner;
