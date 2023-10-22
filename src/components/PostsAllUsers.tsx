import { withAuthenticator } from '@aws-amplify/ui-react';
import { Grid, Box, Button } from 'theme-ui';
import React from 'react';
// import { GraphQLResult } from '@aws-amplify/api';
// import { API, Auth } from 'aws-amplify';
// import { Box, Flex, Close, Label, Input, Button } from 'theme-ui';

// import { CreatePostMutation } from '../API';
import PostCard from './PostCard';
import Header from './Header';
// import CreatePostModal from './CreatePostModal';
import { CloudinaryImage } from './AddImage';
// import { createPost } from '../graphql/mutations';

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
  // const [newPost, setNewPost] = React.useState(false);

  return (
    <Box as='main' sx={{ height: '100vw' }}>
      <Header user={user} signOut={signOut} />
      <Box
        sx={{
          maxWidth: '900px',
          marginLeft: ['0px', 'auto', 'auto'],
          marginRight: ['0px', 'auto', 'auto'],
          padding: '20px',
        }}
      >
        <Grid columns={[1, 2, 3]} sx={{ gridGap: '20px' }}>
          {posts &&
            posts.map((post, i) => {
              return (
                <div key={`postcard-${i}`}>
                  <PostCard post={post} />
                </div>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
};

export default withAuthenticator(PostsAllUsers);
