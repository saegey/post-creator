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

  try {
    const response = (await API.graphql({
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      query: createPost,
      variables: {
        input: {
          title: form.get('title'),
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
          maxWidth: '690px',
          height: 'fit-content',
          margin: 'auto',
          background: 'background',
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
              <h2>Create new post</h2>
            </Box>
            <Box sx={{ marginLeft: 'auto' }}>
              <Close onClick={() => setMenuOpen(false)} />
            </Box>
          </Flex>
          <form onSubmit={handleCreatePost}>
            <Label htmlFor='title' variant='defaultLabel'>
              Title
            </Label>
            <Input name='title' id='title' mb={3} variant={'defaultInput'} />

            <Button variant='primaryButton'>Create</Button>
          </form>
        </Box>
      </Box>
    </BlackBox>
  );
};

export default CreatePostModal;
