import { API } from 'aws-amplify';
import { getPost } from '../../src/graphql/queries';

export interface GraphQLResult {
  data?: {
    getPost: {
      elevation: any;
      coordinates: any;
    };
  };
  errors?: [object];
  extensions?: {
    [key: string]: any;
  };
}

const getPostQuery = async (id: string) => {
  return API.graphql({
    authMode: 'AMAZON_COGNITO_USER_POOLS',
    query: getPost,
    variables: {
      id: id,
    },
  }) as {
    data?: {
      getPost: {
        elevation: any;
        coordinates: any;
      };
    };
  };
};

export { getPostQuery };
