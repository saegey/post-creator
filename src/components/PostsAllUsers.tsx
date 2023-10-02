import { withAuthenticator } from '@aws-amplify/ui-react';
import { Grid, Box, Button } from 'theme-ui';
import React from 'react';

import PostCard from './PostCard';
import Header from './Header';
import CreatePostModal from './CreatePostModal';
import { CloudinaryImage } from './AddImage';

export type PostType = Array<{
  id: string;
  title: string;
  images: string;
  imagesObj: Array<CloudinaryImage>;
  author: {
    fullName: string;
    username: string;
    image: string;
  };
}>;

const PostsAllUsers = ({
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
    <Box as='main' sx={{ height: '100vw' }}>
      {newPost && <CreatePostModal setMenuOpen={setNewPost} />}
      <Header user={user} signOut={signOut} title={'Posts'} />
      <Box
        sx={{
          maxWidth: '900px',
          marginLeft: ['0px', 'auto', 'auto'],
          marginRight: ['0px', 'auto', 'auto'],
          padding: '20px',
        }}
      >
        <Box sx={{ paddingBottom: '20px' }}>
          <Button onClick={() => setNewPost(true)} variant='primaryButton'>
            New Post
          </Button>
        </Box>

        <Grid columns={[1, 2, 3]} sx={{ gridGap: '20px' }}>
          {posts && posts.map((post) => <PostCard post={post} />)}
        </Grid>
      </Box>
    </Box>
  );
};

export default withAuthenticator(PostsAllUsers);
