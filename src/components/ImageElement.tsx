import {
  useSlateStatic,
  ReactEditor,
  useSelected,
  useFocused,
} from 'slate-react';
import { Transforms } from 'slate';

import { Box, Button, Label, Textarea, Close, Flex } from 'theme-ui';
import React from 'react';
import { PostSaveComponents } from '../actions/PostSave';
import { PostContext } from '../PostContext';

type SlateImageType = {
  type: 'image';
  src: string;
  asset_id: string;
  public_id: string;
  children: Array<{ text: string }>;
  void: true;
  caption?: string;
};

import { CldImage } from 'next-cloudinary';

const ImageElement = ({ children, element }) => {
  const editor = useSlateStatic() as ReactEditor;
  const path = ReactEditor.findPath(editor, element);
  const [isHover, setIsHover] = React.useState(false);
  const [addCaption, setAddCaption] = React.useState(false);
  const { id, title, postLocation } = React.useContext(PostContext);
  const selected = useSelected();
  const focused = useFocused();

  const saveCaption = async (event: any) => {
    event.preventDefault();
    const form = new FormData(event.target);

    setAddCaption(false);
    Transforms.setNodes(
      editor,
      {
        caption: form.get('caption'),
      } as SlateImageType,
      { at: [path as any] }
    );

    await PostSaveComponents({
      postId: id,
      title: title,
      postLocation: postLocation,
      components: editor.children,
    });
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
          width: '100%',
          height: 'auto',
          marginBottom: '20px',
        }}
      >
        <CldImage
          width='800'
          height='800'
          src={element.public_id}
          sizes='100vw'
          alt='race pic'
          quality={90}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '5px',
            boxShadow: `${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}`,
          }}
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
