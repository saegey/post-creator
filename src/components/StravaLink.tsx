import { useSlateStatic, ReactEditor } from 'slate-react';
import { Box, Close, Flex, Text, Link, Embed } from 'theme-ui';
import React from 'react';

import { PostContext } from './PostContext';

const StravaLink = ({ element }) => {
  const [isHover, setIsHover] = React.useState(false);

  // const editor = useSlateStatic() as ReactEditor;
  // const path = ReactEditor.findPath(editor, element);
  if (!element.activityId) {
    return <></>;
  }
  // const { stravaUrl } = React.useContext(PostContext);

  return (
    <Flex
      contentEditable={false}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Box
        sx={{
          marginX: 'auto',
          width: ['100%', null, null],
          maxWidth: '450px',
          // height: '550px',
        }}
      >
        <Embed
          src={`https://strava-embeds.com/activity/${element.activityId}`}
          sx={{
            height: '620px',
            width: '100%',
            border: 'none',
          }}
        />
      </Box>

      {/* </Flex>
        </Link> */}
      {/* </Box> */}
    </Flex>
  );
};

export default StravaLink;
