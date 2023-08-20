import { GraphQLResult } from '@aws-amplify/api';
import { API } from 'aws-amplify';

import { updatePost } from '../../src/graphql/mutations';
import { UpdatePostMutation } from '../../src/API';

const PostSaveComponents = async ({ postId, title, components }) => {
  try {
    const response = (await API.graphql({
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      query: updatePost,
      variables: {
        input: {
          id: postId,
          title: title,
          // content: form.get('content'),
          components: JSON.stringify(components),
        },
      },
    })) as GraphQLResult<UpdatePostMutation>;
    console.log(response, postId, title, components);
  } catch (errors) {
    console.error(errors);
    // throw new Error(errors[0].message);
  }
};

const PostSaveImages = async ({ postId, images }) => {
  try {
    const results = await API.graphql({
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      query: updatePost,
      variables: {
        input: {
          id: postId,
          images: JSON.stringify(images),
          // content: form.get('content'),
          // components: JSON.stringify(editor.children),
        },
      },
    });
    console.log(results);
  } catch (error) {
    console.error(error);
  }
};

export { PostSaveComponents, PostSaveImages };
