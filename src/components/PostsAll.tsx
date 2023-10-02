import { withAuthenticator } from '@aws-amplify/ui-react';
import { Grid, Box, Button } from 'theme-ui';
import React from 'react';

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
        <Box sx={{ paddingBottom: '20px' }}>
          <Button onClick={() => setNewPost(true)} variant='primaryButton'>
            New Post
          </Button>
        </Box>
        <Grid columns={[1, 2, 3]} width={'250px'} repeat={'fit'}>
          {posts &&
            posts.map((post) => <PostCard post={post} showAuthor={false} />)}
        </Grid>
      </Box>
    </Box>
  );
};

export default withAuthenticator(PostsAll);
