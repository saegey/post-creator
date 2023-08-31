import { Authenticator } from '@aws-amplify/ui-react';
import { GraphQLResult } from '@aws-amplify/api';
import { API, Auth } from 'aws-amplify';
import { Box, Flex, Close, Label, Input, Button } from 'theme-ui';

import { CreatePostMutation } from '../API';
import { createPost } from '../graphql/mutations';
import BlackBox from './BlackBox';

async function handleCreatePost(event) {
  event.preventDefault();

  const form = new FormData(event.target);
  const user = await Auth.currentAuthenticatedUser();
  console.log(user);

  try {
    const response = (await API.graphql({
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      query: createPost,
      variables: {
        input: {
          title: form.get('title'),
          components: JSON.stringify([
            { type: 'text', children: [{ text: '' }] },
          ]),
          // author: {
          //   id: user.attributes.sub,
          // },
          postAuthorId: user.attributes.sub,
          // user: {
          //   id: user.attributes.id,
          //   // fullName: user.attributes.name,
          // },
        },
      },
    })) as GraphQLResult<CreatePostMutation>;
    if (!response || !response.data || !response.data.createPost) {
      console.error('failed to create post');
    }
    window.location.href = `/posts/${response?.data?.createPost?.id}`;
  } catch ({ errors }) {
    console.error(...errors);
    throw new Error(errors[0].message);
  }
}

const CreatePostModal = ({ setMenuOpen }) => {
  return (
    <BlackBox>
      <Box
        sx={{
          width: '70%',
          height: '400px',
          margin: 'auto',
          background: 'white',
          borderRadius: '5px',
        }}
      >
        <Box
          sx={{
            padding: '20px',
          }}
        >
          <Flex sx={{ marginBottom: '40px' }}>
            <Box>
              <h2>New Post</h2>
            </Box>
            <Box sx={{ marginLeft: 'auto' }}>
              <Close onClick={() => setMenuOpen(false)} />
            </Box>
          </Flex>
          <Authenticator>
            <form onSubmit={handleCreatePost}>
              <Label htmlFor='title'>Title</Label>
              <Input name='title' id='title' mb={3} />

              <Button>Create</Button>
            </form>
          </Authenticator>
        </Box>
      </Box>
    </BlackBox>
  );
};

export default CreatePostModal;
