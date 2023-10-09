import { withAuthenticator } from '@aws-amplify/ui-react';
import { Grid, Box, Button } from 'theme-ui';
import React from 'react';
import { GraphQLResult } from '@aws-amplify/api';
import { API, Auth } from 'aws-amplify';
// import { Box, Flex, Close, Label, Input, Button } from 'theme-ui';

import { CreatePostMutation } from '../API';
import PostCard from './PostCard';
import Header from './Header';
// import CreatePostModal from './CreatePostModal';
import { CloudinaryImage } from './AddImage';
import { createPost } from '../graphql/mutations';

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
      {/* {newPost && <CreatePostModal setMenuOpen={setNewPost} />} */}
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
          <Button
            onClick={async () => {
              const response = (await API.graphql({
                authMode: 'AMAZON_COGNITO_USER_POOLS',
                query: createPost,
                variables: {
                  input: {
                    title: '',
                    type: 'Post',
                    components: JSON.stringify([
                      { type: 'text', children: [{ text: '' }] },
                    ]),
                    postAuthorId: user.attributes.sub,
                  },
                },
              })) as GraphQLResult<CreatePostMutation>;
              if (!response || !response.data || !response.data.createPost) {
                console.error('failed to create post');
              }
              window.location.href = `/posts/${response?.data?.createPost?.id}/edit`;
              // setNewPost(true);
            }}
            variant='primaryButton'
          >
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
