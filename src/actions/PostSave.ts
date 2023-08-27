import { GraphQLResult } from '@aws-amplify/api';
import { API } from 'aws-amplify';

import { updatePost } from '../../src/graphql/mutations';
import { UpdatePostMutation } from '../../src/API';

interface PostSaveProps {
  postId: string;
  title: string;
  postLocation: string;
  components: Array<any>;
  stravaUrl: string;
  resultsUrl: string;
}

const PostSaveComponents = async ({
  postId,
  title,
  components,
  postLocation,
  stravaUrl,
  resultsUrl,
}: PostSaveProps) => {
  try {
    const response = (await API.graphql({
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      query: updatePost,
      variables: {
        input: {
          id: postId,
          title: title,
          postLocation: postLocation,
          stravaUrl: stravaUrl,
          resultsUrl: resultsUrl,
          components: JSON.stringify(components),
        },
      },
    })) as GraphQLResult<UpdatePostMutation>;
    console.log(response, postId, title, postLocation, components);
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
    // console.log(results);
  } catch (error) {
    console.error(error);
  }
};

export { PostSaveComponents, PostSaveImages };
