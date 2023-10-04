import { useRef, useState } from 'react';
import { insertLink } from '../utils/link';

import {
  Button,
  Box,
  Input,
  Checkbox,
  Flex,
  Label,
  IconButton,
} from 'theme-ui';
import { isBlockActive } from '../utils/SlateUtilityFunctions';
import usePopup from './usePopup';
import { Transforms } from 'slate';
import TooltipButton from './TooltipButton';

const LinkButton = (props) => {
  const { editor } = props;
  const linkInputRef = useRef(null);
  const { showPopup, setShowPopup } = usePopup(linkInputRef);
  const [url, setUrl] = useState('');
  const [showInNewTab, setShowInNewTab] = useState(false);
  const [selection, setSelection] = useState();

  const handleInsertLink = () => {
    if (!selection) {
      return;
    }
    Transforms.select(editor, selection);
    insertLink(editor, { url, showInNewTab });
    setUrl('');
    setShowPopup((prev) => !prev);
    setShowInNewTab(false);
  };
  const toggleLink = () => {
    setSelection(editor.selection);
    setShowPopup((prev) => !prev);
  };
  const handleInputChange = ({ target }) => {
    if (target.type === 'checkbox') {
      setShowInNewTab((prev) => !prev);
    } else {
      setUrl(target.value);
    }
  };
  return (
    <Box ref={linkInputRef} sx={{ position: 'relative', display: 'inline' }}>
      <TooltipButton
        onClick={toggleLink}
        title={'Toggle Bold Text'}
        tooltipText={'Toggle selected to bold ⌘B'}
        // format={'link'}
        // active={isBlockActive(editor, 'link')}
      >
        <svg
          width='100%'
          height='100%'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10 8H6C4.34315 8 3 9.34315 3 11V13C3 14.6569 4.34315 16 6 16H10M9 12H15M14 8H18C19.6569 8 21 9.34315 21 11V13C21 14.6569 19.6569 16 18 16H14'
            stroke='var(--theme-ui-colors-text)'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        {/* <Icon icon='link' /> */}
      </TooltipButton>
      {showPopup && (
        <Box
          sx={{
            position: 'absolute',
            left: '0',
            // top: '20px',
            width: '300px',
            backgroundColor: 'background',
            height: 'fit-content',
            // width: 'fit-content',
            border: '1px solid lightgray',
            padding: '5px',
            borderRadius: '5px',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', gap: '4px', margin: '5px 2px' }}>
            <Input
              id='url'
              name='url'
              value={url}
              placeholder='https://google.com'
              // defaultValue={title ? title : ''}
              variant={'defaultInput'}
              onChange={handleInputChange}
            />
            <div onClick={handleInsertLink}>
              {/* <Icon icon='add' /> */}
              <IconButton>
                <svg
                  width='100%'
                  height='100%'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title />

                  <g id='Complete'>
                    <g data-name='add' id='add-2'>
                      <g>
                        <line
                          fill='none'
                          stroke='var(--theme-ui-colors-text)'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          x1='12'
                          x2='12'
                          y1='19'
                          y2='5'
                        />

                        <line
                          fill='none'
                          stroke='var(--theme-ui-colors-text)'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          x1='5'
                          x2='19'
                          y1='12'
                          y2='12'
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </IconButton>
            </div>
          </div>
          <Flex>
            <Label>
              <Checkbox
                // type='checkbox'
                // checked={showInNewTab}
                onChange={handleInputChange}
              />
              <span style={{ fontSize: '14px' }}>Open in new tab</span>
            </Label>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default LinkButton;
