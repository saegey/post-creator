import { API } from 'aws-amplify';

import { getPost } from '../../src/graphql/queries';
import { uncompress } from '../../src/utils/compress';

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

const getActivity = async (post: any) => {
  // const raw = await uncompress(post.coordinates);
  const coordinates = post.coordinates
    ? (post.coordinates as string)
    : ('{}' as any);

  const elevation = post.elevation ? (post.elevation as string) : '{}';

  const distances = post.distances ? (post.distances as string) : '{}';

  const grades = post.elevationGrades ? (post.elevationGrades as string) : '{}';

  return coordinates && coordinates.length > 0
    ? coordinates
        .map((_, i) => {
          if (i % 5 === 0) {
            return {
              t: i,
              e: elevation[i] ? Number(elevation[i]) : null,
              g: grades[i] ? Number(grades[i]) : 0,
              d: distances[i] ? distances[i] : 0,
              c: [coordinates[i][0], coordinates[i][1]],
            };
          }
        })
        .filter((notUndefined) => notUndefined !== undefined)
    : [];
};

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

export { getPostQuery, getActivity };
