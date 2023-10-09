import { Flex, Box, Text } from 'theme-ui';
import PostHeaderTextBlock from './PostHeaderTextBlock';

interface PostHeaderProps {
  headerImage: JSX.Element;
  type: string;
  title: string;
  date: string;
  location: string;
  teaser?: string | undefined;
  headerImageCaption?: string | undefined;
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
      <PostHeaderTextBlock
        type={type ? type : 'Race'}
        title={title ? title : 'Title'}
        teaser={teaser ? teaser : 'Subhead'}
        date={date ? date : 'Event date'}
        location={location ? location : 'Location'}
        headerImageCaption={
          headerImageCaption ? headerImageCaption : 'Default caption'
        }
      />
    </Flex>
  );
};

export default PostHeader;
