import { withAuthenticator } from '@aws-amplify/ui-react';
import { Grid, Box, Button, Flex, Text } from 'theme-ui';
import React, { useEffect } from 'react';

import PostCard from './PostCard';
import Header from '../../src/components/Header';
import { PostType } from '../../pages/posts';
import CreatePostModal from './CreatePostModal';

const PostsAll = ({
  signOut,
  user,
  posts,
}: {
  signOut?: any;
  user?: any;
  posts: PostType | undefined;
}) => {
  const [newPost, setNewPost] = React.useState(false);

  return (
    <Box as='main' sx={{ backgroundColor: 'background', height: '100vw' }}>
      {newPost && <CreatePostModal setMenuOpen={setNewPost} />}
      <Header user={user} signOut={signOut} title={'My Posts'} />
      <Box
        sx={{
          // marginTop: '60px',
          maxWidth: '900px',
          marginLeft: ['0px', 'auto', 'auto'],
          marginRight: ['0px', 'auto', 'auto'],
          padding: '20px',
          width: '100vw',
        }}
      >
        {!posts && (
          <Grid columns={[1, 2, 3]}>
            <Flex
              sx={{
                height: '240px',
                borderRadius: '5px',
              }}
              className='skeleton'
            ></Flex>
            <Flex
              sx={{
                height: '240px',
                borderRadius: '5px',
              }}
              className='skeleton'
            ></Flex>
            <Flex
              sx={{
                height: '240px',

                borderRadius: '5px',
              }}
              className='skeleton'
            ></Flex>
          </Grid>
        )}
        {posts && posts.length > 0 && (
          <Box sx={{ paddingBottom: '20px' }}>
            <Button onClick={() => setNewPost(true)} variant='primaryButton'>
              New Post
            </Button>
          </Box>
        )}

        {posts && posts.length === 0 && (
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              marginTop: '40px',
            }}
          >
            <Box sx={{ width: '75px', height: 'auto' }}>
              <svg
                fill='var(--theme-ui-colors-text)'
                width='100%'
                height='100%'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M21,1H3A1,1,0,0,0,2,2V22a1,1,0,0,0,1,1H17a1.011,1.011,0,0,0,.383-.077,1,1,0,0,0,.325-.217l4-4A1.131,1.131,0,0,0,22,18V2A1,1,0,0,0,21,1ZM16,18v3H4V3H20V17H17A1,1,0,0,0,16,18Zm1-8a1,1,0,0,1-1,1H8A1,1,0,0,1,8,9h8A1,1,0,0,1,17,10Zm-4,4a1,1,0,0,1-1,1H8a1,1,0,0,1,0-2h4A1,1,0,0,1,13,14Z' />
              </svg>
            </Box>
            <Text sx={{ fontSize: '32px', fontWeight: '700' }}>
              Share Posts
            </Text>
            When you share posts, they will appear on your profile.
            <Box>
              <Button variant='primaryButton' onClick={() => setNewPost(true)}>
                Share your first post
              </Button>
            </Box>
          </Flex>
        )}
        {posts && (
          <Grid columns={[1, 2, 3]}>
            {posts.map((post) => (
              <PostCard post={post} showAuthor={false} />
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default withAuthenticator(PostsAll);
