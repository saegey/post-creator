import { Box, Flex, Button, Image as ThemeImage } from 'theme-ui';
import React from 'react';
import { useSlateStatic, ReactEditor } from 'slate-react';
import { Transforms } from 'slate';
import { CldImage } from 'next-cloudinary';

import { PostContext } from './PostContext';
import AddImage from './AddImage';
import PostHeader from './PostHeader';
import OptionsButton from './OptionsButton';
import Dropdown from './Dropdown';
import { EditorContext } from './EditorContext';
import PhotoCaptionModal from './PhotoCaptionModal';
import { useClickOutside } from '../utils/ux';

const HeroBanner = ({ element }) => {
  const { heroImage, setHeroImage, title, postLocation, date, subhead } =
    React.useContext(PostContext);

  const {
    setIsHeroImageModalOpen,
    isHeroImageModalOpen,
    setIsPhotoCaptionOpen,
    isPhotoCaptionOpen,
  } = React.useContext(EditorContext);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const wrapperRef = React.useRef('menu');
  useClickOutside(wrapperRef, (e) => {
    setIsMenuOpen(false);
    e.stopPropagation();
  });

  const editor = useSlateStatic() as ReactEditor;
  const path = ReactEditor.findPath(editor, element);

  const addImage = ({ selectedImage }) => {
    setHeroImage(selectedImage);
    setIsHeroImageModalOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
        }}
        contentEditable={false}
      >
        {isPhotoCaptionOpen && <PhotoCaptionModal element={element} />}
        {isHeroImageModalOpen && (
          <AddImage
            setIsOpen={setIsHeroImageModalOpen}
            isOpen={isHeroImageModalOpen}
            callback={addImage}
          />
        )}
        {heroImage ? (
          <Flex
            sx={{
              position: 'relative',
              backgroundColor: 'muted',
              width: '100%',
              marginBottom: ['30px', '60px', '60px'],
            }}
          >
            <PostHeader
              headerImage={
                <ThemeImage
                  as={CldImage}
                  width='800'
                  height='800'
                  src={heroImage.public_id}
                  sizes='100vw'
                  alt='race pic'
                  // quality={90}
                  sx={{
                    objectFit: 'cover',
                    height: [null, null, '100%'],
                    width: ['100%', null, null],
                  }}
                />
              }
              type={'Race'}
              teaser={subhead ? subhead : ''}
              headerImageCaption={element.photoCaption}
              title={title ? title : ''}
              location={postLocation ? postLocation : ''}
              date={date ? date : ''}
            />

            <Box sx={{ position: 'absolute', right: '10px', top: '20px' }}>
              <Box sx={{ position: 'relative' }} ref={wrapperRef}>
                <OptionsButton
                  onClick={() => {
                    if (isMenuOpen) {
                      setIsMenuOpen(false);
                    } else {
                      setIsMenuOpen(true);
                    }
                  }}
                />
                <Dropdown isOpen={isMenuOpen}>
                  <Box
                    onClick={() => {
                      setIsPhotoCaptionOpen(true);
                      setIsMenuOpen(false);
                    }}
                    variant='boxes.dropdownMenuItem'
                  >
                    Photo Caption
                  </Box>
                  <Box
                    onClick={() => {
                      setIsHeroImageModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    variant='boxes.dropdownMenuItem'
                  >
                    Change Image
                  </Box>
                  <Box
                    onClick={() => Transforms.removeNodes(editor, { at: path })}
                    variant='boxes.dropdownMenuItem'
                  >
                    Remove
                  </Box>
                </Dropdown>
              </Box>
            </Box>
          </Flex>
        ) : (
          <Flex
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '500px',
              backgroundColor: 'gray',
            }}
          >
            {/* <Box sx={{ position: 'absolute' }}> */}
            <Button type='button' onClick={() => setIsHeroImageModalOpen(true)}>
              Add Image
            </Button>
            {/* </Box> */}
          </Flex>
        )}
      </Box>
    </>
  );
};

export default HeroBanner;
