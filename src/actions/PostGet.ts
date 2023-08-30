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
  const coordinates = JSON.parse(
    post.coordinates ? ((await uncompress(post.coordinates)) as string) : '{}'
  ) as Array<Array<number>>;

  const elevation = JSON.parse(
    post.elevation ? ((await uncompress(post.elevation)) as string) : '{}'
  ) as Array<number>;

  const distances = JSON.parse(
    post.distances ? ((await uncompress(post.distances)) as string) : '{}'
  ) as Array<number>;

  const grades = JSON.parse(
    post.elevationGrades
      ? ((await uncompress(post.elevationGrades)) as string)
      : '{}'
  );

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
