import { Flex, Text } from 'theme-ui';
import { EditorContext } from './EditorContext';
import React from 'react';

const PostHeaderTextBlock = ({
  type = 'Race',
  title = 'Title',
  teaser = 'Subhead',
  date,
  headerImageCaption,
  location,
  height = null,
}: {
  type: string;
  title: string;
  teaser: string;
  date: string;
  headerImageCaption: string;
  location: string;
  height?: string | null;
}) => {
  const { isSettingsModalOpen, setIsSettingsModalOpen } =
    React.useContext(EditorContext);
  return (
    <Flex
      sx={{
        width: '100%',
        marginX: ['10px', '0', '0'],
        bg: ['', 'muted', 'muted'],
        paddingY: ['10px', '20px', '20px'],
        paddingX: [0, '20px', '20px'],
        gap: '10px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        position: 'relative',
        // display: 'inline',
        borderBottomColor: 'muted',
        borderBottomWidth: ['1px', 0, 0],
        borderBottomStyle: 'solid',
        height: height,
        cursor: 'text',
      }}
      onClick={() => setIsSettingsModalOpen(true)}
      contentEditable={false}
    >
      <Text
        variant='postType'
        sx={{
          marginTop: 'auto',
          backgroundColor: 'text',
          color: 'background',
          fontSize: '14px',
          fontWeight: '600',
          padding: '2px 10px 2px 10px',
          width: 'fit-content',
        }}
      >
        {type}
      </Text>
      <Text
        as='h1'
        variant='postTitle'
        sx={{ color: title === 'Title' ? 'gray' : 'text', lineHeight: '38px' }}
      >
        {title}
      </Text>

      <Text
        as='p'
        sx={{
          color: teaser === 'Subhead' ? 'gray' : 'text',
          fontWeight: '500',
          fontSize: '16px',
          lineHeight: '22px',
        }}
      >
        {teaser}
      </Text>
      <Text sx={{ fontSize: '15px', fontWeight: '400' }}>
        <Text sx={{ color: date === 'Event date' ? 'gray' : 'text' }}>
          {date}
        </Text>{' '}
        —{' '}
        <Text sx={{ color: location === 'Location' ? 'gray' : 'text' }}>
          {location}
        </Text>
      </Text>
      <Text
        sx={{
          color: headerImageCaption === 'Enter caption here' ? 'gray' : 'text',
          marginTop: 'auto',
          fontSize: '12px',
          lineHeight: '15px',
          fontWeight: '500',
          order: [-1, 0, 0],
          marginBottom: ['10px', '0', '0'],
        }}
      >
        {headerImageCaption}
      </Text>
    </Flex>
  );
};

export default PostHeaderTextBlock;
