import { Box, Flex, Button } from 'theme-ui';
import React from 'react';
import { useSlateStatic, ReactEditor } from 'slate-react';
import { CldImage } from 'next-cloudinary';

import { PostContext } from './PostContext';
import OptionsButton from './OptionsButton';
import Dropdown from './shared/Dropdown';
import { EditorContext } from './EditorContext';
import PhotoCaptionModal from './PhotoCaptionModal';
import { useClickOutside } from '../utils/ux';
import PostHeaderTextBlock from './PostHeaderTextBlock';
import { cloudUrl } from '../utils/cloudinary';

const HeroBanner = ({ element }) => {
  const { heroImage, title, postLocation, date, subhead } =
    React.useContext(PostContext);

  const {
    setIsHeroImageModalOpen,
    // isHeroImageModalOpen,
    setIsPhotoCaptionOpen,
    isPhotoCaptionOpen,
  } = React.useContext(EditorContext);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const wrapperRef = React.useRef('menu');
  useClickOutside(wrapperRef, (e) => {
    setIsMenuOpen(false);
    e.stopPropagation();
  });

  const menu = (
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
          {/* <Box
            onClick={() => Transforms.removeNodes(editor, { at: path })}
            variant='boxes.dropdownMenuItem'
          >
            Remove
          </Box> */}
        </Dropdown>
      </Box>
    </Box>
  );

  const editor = useSlateStatic() as ReactEditor;

  // const path = ReactEditor.findPath(editor, element);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          marginBottom: '60px',
        }}
        contentEditable={false}
      >
        {isPhotoCaptionOpen && <PhotoCaptionModal element={element} />}
        <Flex
          sx={{
            height: 'fit-content',
            flexDirection: ['column', 'row', 'row'],
            width: '100%',
          }}
        >
          {!heroImage && (
            <Flex
              sx={{
                width: ['100%', '65%', '65%'],

                background: 'divider',
                justifyContent: 'center',
                alignContent: 'center',
                height: '600px',
                // height: ['400px', '600px', '600px'],
                // '@media (max-width: 400px)': {
                //   height: '300px',
                // },

                // '@media only screen and (max-width: 600px) and (min-width: 400px)':
                //   {
                //     height: '400px',
                //   },
                '@media (min-width: 900px)': {
                  height: '700px',
                },
              }}
            >
              <Flex>
                <Button
                  type='button'
                  variant='primaryButton'
                  sx={{
                    marginY: 'auto',
                  }}
                  onClick={() => setIsHeroImageModalOpen(true)}
                >
                  Add Image
                </Button>
              </Flex>
            </Flex>
          )}
          {heroImage && (
            <Box
              sx={{
                backgroundColor: heroImage.colors[0],
                width: ['100%', '65%', '65%'],
                display: ['inline-block', '', ''],
                height: '600px',
                // height: ['400px', '600px', '600px'],
                // '@media (max-width: 400px)': {
                //   height: '300px',
                // },

                // '@media only screen and (max-width: 600px) and (min-width: 400px)':
                //   {
                //     height: '400px',
                //   },
                '@media (min-width: 900px)': {
                  height: '700px',
                },
              }}
            >
              <CldImage
                // as={CldImage}
                priority={true}
                width={heroImage.width}
                height={heroImage.height}
                src={heroImage.public_id}
                // sizes='100vw'
                alt='race pic'
                style={{
                  objectFit: 'contain',
                  // height: '100%',
                  maxWidth: '100%',
                  maxHeight: '100%',

                  // '@media (max-width: 600px)': { maxWidth: '300px' },
                  // width: '100%',
                  // width: ['100%', null, null],
                }}
                config={{
                  cloud: {
                    cloudName: cloudUrl,
                  },
                }}
              />
            </Box>
          )}
          <Box sx={{ width: ['100%', '35%', '35%'] }}>
            <PostHeaderTextBlock
              type={'Race'}
              title={title ? title : 'Title'}
              teaser={subhead ? subhead : 'Subhead'}
              date={date ? date : 'Event date'}
              location={postLocation ? postLocation : 'Location'}
              headerImageCaption={
                element.photoCaption
                  ? element.photoCaption
                  : 'Enter caption here'
              }
              height='100%'
            />
          </Box>

          {menu}
        </Flex>
      </Box>
    </>
  );
};

export default HeroBanner;
