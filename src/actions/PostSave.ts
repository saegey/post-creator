import { GraphQLResult } from '@aws-amplify/api';
import { API } from 'aws-amplify';

import { updatePost } from '../../src/graphql/mutations';
import { UpdatePostMutation } from '../../src/API';
import { updatePostMinimal } from '../graphql/customMutations';
// import { CloudinaryImage } from '../components/AddImage';

interface PostSaveProps {
  postId: string | undefined;
  title: string | undefined;
  postLocation: string | undefined;
  components: Array<any>;
  stravaUrl?: string;
  resultsUrl?: string;
  currentFtp?: string;
  heroImage?: string;
}

const PostSaveComponents = async ({
  postId,
  title,
  components,
  postLocation,
  heroImage,
}: // stravaUrl,
// resultsUrl,
// currentFtp,
PostSaveProps) => {
  try {
    const response = (await API.graphql({
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      query: updatePostMinimal,
      variables: {
        input: {
          id: postId,
          title: title,
          postLocation: postLocation,
          heroImage: heroImage ? heroImage : null,
          // stravaUrl: stravaUrl,
          // resultsUrl: resultsUrl,
          components: JSON.stringify(components),
          // currentFtp: currentFtp,
        },
      },
    })) as GraphQLResult<UpdatePostMutation>;
  } catch (errors) {
    console.error(errors);
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
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export { PostSaveComponents, PostSaveImages };
