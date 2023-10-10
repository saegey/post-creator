import {
  Box,
  Flex,
  Button,
  Image as ThemeImage,
  Text,
  ImageProps,
} from 'theme-ui';
import React from 'react';
import { useSlateStatic, ReactEditor } from 'slate-react';
import { Transforms } from 'slate';
import { CldImage, CldImageProps, CldOgImage } from 'next-cloudinary';

import { PostContext } from './PostContext';
import OptionsButton from './OptionsButton';
import Dropdown from './Dropdown';
import { EditorContext } from './EditorContext';
import PhotoCaptionModal from './PhotoCaptionModal';
import { useClickOutside } from '../utils/ux';
import PostHeaderTextBlock from './PostHeaderTextBlock';

const cloudUrl = process.env['NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME'];

// interface CustomImage extends HTMLImageElement {
//   priority: boolean;
// }

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
            justifyContent: 'center',
            alignItems: 'center',
            height: '500px',
            flexDirection: ['column', 'row', 'row'],
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: ['100%', '65%', '65%'],
              height: '100%',
              backgroundColor: 'gray',
              justifyContent: 'center',
              display: 'flex',

              // height: heroImage ? '500px' : null,
            }}
          >
            {!heroImage && (
              <Button
                type='button'
                variant='primaryButton'
                sx={{ marginY: 'auto' }}
                onClick={() => setIsHeroImageModalOpen(true)}
              >
                Add Image
              </Button>
            )}
            {heroImage && (
              <CldImage
                // as={CldImage}
                // priority={true}
                width='1200'
                height='500'
                src={heroImage.public_id}
                // sizes='100vw'
                alt='race pic'
                style={{
                  objectFit: 'contain',
                  height: '100%',
                  // width: ['100%', null, null],
                }}
                config={{
                  cloud: {
                    cloudName: cloudUrl,
                  },
                }}
              />
            )}
          </Box>
          <PostHeaderTextBlock
            type={'Race'}
            title={title ? title : 'Title'}
            teaser={subhead ? subhead : 'Subhead'}
            date={date ? date : 'Event date'}
            location={postLocation ? postLocation : 'Location'}
            headerImageCaption={
              element.photoCaption ? element.photoCaption : 'Enter caption here'
            }
            height='100%'
          />
          {menu}
        </Flex>
      </Box>
    </>
  );
};

export default HeroBanner;
