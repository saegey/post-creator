
import { API } from 'aws-amplify';
import { getPost } from '../../src/graphql/queries';

const getPostQuery = async (id) => {
  return API.graphql({
    authMode: 'AMAZON_COGNITO_USER_POOLS',
    query: getPost,
    variables: {
      id: id,
    },
  });
};

export { getPostQuery };
