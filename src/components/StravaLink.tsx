import {
  useSlateStatic,
  ReactEditor,
  useSelected,
  useFocused,
} from 'slate-react';
import { Transforms } from 'slate';
import { Box, Close, Flex, Text, Link } from 'theme-ui';
import React from 'react';
import { PostContext } from '../PostContext';

const StravaLink = ({ element }) => {
  const [isHover, setIsHover] = React.useState(false);

  const editor = useSlateStatic() as ReactEditor;
  const path = ReactEditor.findPath(editor, element);
  const { stravaUrl } = React.useContext(PostContext);

  return (
    <Flex
      contentEditable={false}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Box sx={{ marginX: 'auto' }}>
        <Link href={stravaUrl} sx={{ textDecoration: 'none' }}>
          <Flex sx={{ gap: '10px' }}>
            <Box sx={{ width: '20px', height: '20px' }}>
              <svg viewBox='0 0 24 24'>
                <g className='icon-solid'>
                  <path d='M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169'></path>
                </g>
              </svg>
            </Box>

            <Text
              as='span'
              sx={{
                marginY: 'auto',
                color: 'text',
                fontWeight: 600,
              }}
            >
              View Activity on Strava
            </Text>
          </Flex>
        </Link>
      </Box>
    </Flex>
  );
};

export default StravaLink;
