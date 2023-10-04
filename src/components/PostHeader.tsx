import { Flex, Box, Text } from 'theme-ui';

interface PostHeaderProps {
  headerImage: JSX.Element;
  type: String;
  title: String;
  date: String;
  location: String;
  teaser?: String | undefined;
  headerImageCaption?: String | undefined;
}

const PostHeader = ({
  headerImage,
  type,
  title,
  date,
  location,
  teaser,
  headerImageCaption,
}: PostHeaderProps) => {
  return (
    <Flex
      sx={{
        // marginTop: '10px',
        flexDirection: ['column', 'row', 'row'],
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: ['100%', '65%', '65%'],
        }}
      >
        {headerImage}
      </Box>
      <Flex
        sx={{
          width: ['calc(100% - 40px)', '35%', '35%'],
          marginX: ['20px', '0', '0'],
          bg: ['', 'muted', 'muted'],
          paddingY: ['10px', '20px', '20px'],
          paddingX: [0, '20px', '20px'],
          gap: '10px',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          borderBottomColor: 'muted',
          borderBottomWidth: ['1px', 0, 0],
          borderBottomStyle: 'solid',
        }}
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
        <Text as='h1' variant='postTitle' sx={{ color: 'text' }}>
          {title}
        </Text>

        <Text
          as='p'
          sx={{
            color: 'text',
            fontWeight: '500',
            fontSize: '16px',
            lineHeight: '22px',
          }}
        >
          {teaser}
        </Text>
        <Text sx={{ fontSize: '15px', fontWeight: '400' }}>
          {date} — {location}
        </Text>
        <Text
          sx={{
            color: 'text',
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
    </Flex>
  );
};

export default PostHeader;
