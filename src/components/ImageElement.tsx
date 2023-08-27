import { useSlateStatic, ReactEditor } from 'slate-react';
import { Transforms, Descendant } from 'slate';
import Image from 'next/image';

import { Box, Button, Text, Label, Textarea, Close, Flex } from 'theme-ui';
import React from 'react';
import { PostSaveComponents } from '../actions/PostSave';
import { PostContext } from '../PostContext';

const ImageElement = ({ attributes, children, element }) => {
  const editor = useSlateStatic() as ReactEditor;
  const path = ReactEditor.findPath(editor, element);
  // console.log('path', path);
  const [isHover, setIsHover] = React.useState(false);
  const [addCaption, setAddCaption] = React.useState(false);
  const { id, title, gpxFile, postLocation } = React.useContext(PostContext);
  // console.log('elemeent', element);

  const saveCaption = async (event) => {
    console.log('save caption here');
    event.preventDefault();
    const form = new FormData(event.target);
    setAddCaption(false);
    Transforms.setNodes(
      editor,
      {
        caption: form.get('caption'),
      },
      { at: [path] }
    );

    await PostSaveComponents({
      postId: id,
      title: title,
      postLocation: postLocation,
      components: editor.children,
    });

    console.log(form.get('caption'));
  };

  return (
    <Box
      contentEditable={false}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Box
        sx={{
          position: 'relative',
          // backgroundColor: 'red',
          width: '100%',
          height: 'auto',
          marginBottom: '20px',
        }}
      >
        <Image
          src={element.src}
          alt='race pic'
          width={500}
          height={500}
          style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
        />
        {element.caption && <p>{element.caption}</p>}

        {addCaption && (
          <Box
            sx={{
              position: 'absolute',
              right: '0px',
              top: '0px',
              height: 'calc(100% - 6px)',
              background: '#000000c2',
              width: '100%',
              borderRadius: '5px',
            }}
          >
            <Flex>
              <Box
                sx={{
                  marginLeft: 'auto',
                  marginRight: '10px',
                  marginTop: '10px',
                }}
              >
                <Close
                  sx={{ color: 'white' }}
                  onClick={() => setAddCaption(false)}
                />
              </Box>
            </Flex>
            <Box
              sx={{
                width: '80%',
                marginY: 'auto',
                marginX: 'auto',
                height: '80%',
              }}
            >
              <form onSubmit={saveCaption}>
                <Label sx={{ color: 'white' }} htmlFor='caption'>
                  Caption
                </Label>
                <Textarea
                  sx={{ background: 'white' }}
                  name='caption'
                  id='caption'
                  rows={6}
                  mb={3}
                >
                  {element.caption}
                </Textarea>

                <Button sx={{ backgroundColor: 'gray' }}>Save</Button>
              </form>
            </Box>
          </Box>
        )}
        {isHover && !addCaption && (
          <Box
            sx={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              width: '400px',
              marginX: 'auto',
            }}
          >
            <Flex sx={{ gap: '10px' }}>
              <Button onClick={() => setAddCaption(true)}>
                {element.caption ? 'Edit' : 'Add'} Caption
              </Button>
              <Button
                onClick={(e) => Transforms.removeNodes(editor, { at: path })}
              >
                Delete
              </Button>
            </Flex>
          </Box>
        )}
      </Box>
      {children}
    </Box>
  );
};

export default ImageElement;
