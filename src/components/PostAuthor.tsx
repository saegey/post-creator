import { Flex, Box, Text } from 'theme-ui';
// import { StaticImage } from 'gatsby-plugin-image';
import moment from 'moment';
import React from 'react';
import { CldImage } from 'next-cloudinary';

import { useViewport } from './ViewportProvider';
import { PostContext } from './PostContext';
import AvatarButton from './AvatarButton';
import { cloudUrl } from '../utils/cloudinary';

interface PostAuthorProps {
  publishedDate: string;
  postAuthor?: {
    fullName: string;
    username: string;
    image: string;
  };
}
const PostAuthor = ({
  publishedDate,
  postAuthor = undefined,
}: PostAuthorProps) => {
  const post = React.useContext(PostContext);
  const author = postAuthor ? postAuthor : post.author;
  console.log(author);
  // console.log(author);
  const { width } = useViewport();
  return (
    <Box
      sx={{
        position: width < 960 ? 'relative' : 'absolute',
        marginTop: '20px',
        maxWidth: '690px',
        marginX: ['10px', '20px', '120px'],
        width: width < 960 ? null : '150px',
        height: '100%',
        marginBottom: ['20px', '60px', '60px'],
      }}
      contentEditable='false'
    >
      <Flex
        sx={{
          flexDirection: ['row', 'row', 'column'],
          alignItems: 'flex-start',
          gap: '20px',
        }}
      >
        {author && author.image && (
          <Box
            sx={{
              width: ['60px', '80px', '80px'],
              height: ['60px', '80px', '80px'],
            }}
          >
            <CldImage
              width='400'
              height='300'
              src={author.image}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                marginTop: 'auto',
                marginBottom: 'auto',
                borderRadius: '100%',
              }}
              config={{
                cloud: {
                  cloudName: cloudUrl,
                },
              }}
              // preserveTransformations
              // underlay={user.attributes.picture}
              quality={90}
              sizes='100vw'
              alt='Description of my image'
            />
          </Box>
        )}
        {author && !author.image && <AvatarButton />}
        <Flex sx={{ flexDirection: 'column' }}>
          <Text
            as='span'
            sx={{
              fontSize: '13px',
              fontWeight: '700',
              lineHeight: '18px',
              textTransform: 'uppercase',
            }}
          >
            by {author?.fullName}
          </Text>
          <Text
            as='span'
            sx={{ fontSize: '13px', fontWeight: '700', lineHeight: '18px' }}
          >
            {moment(publishedDate).format('MM.DD.YY')}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default PostAuthor;
