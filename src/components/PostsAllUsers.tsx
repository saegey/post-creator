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
    <Box as='main' sx={{ backgroundColor: 'background', height: '100vw' }}>
      {newPost && <CreatePostModal setMenuOpen={setNewPost} />}
      <Header user={user} signOut={signOut} title={'Posts'} />
      <Box
        sx={{
          // marginTop: '60px',
          maxWidth: '900px',
          marginLeft: ['10px', 'auto', 'auto'],
          marginRight: ['10px', 'auto', 'auto'],
          padding: '20px',
          width: '100vw',
        }}
      >
        <div>
          <Button onClick={() => setNewPost(true)}>New Post</Button>
        </div>
        <Grid columns={[1, 2, 3]}>
          {posts && posts.map((post) => <PostCard post={post} />)}
        </Grid>
      </Box>
    </Box>
  );
};

export default withAuthenticator(PostsAllUsers);
