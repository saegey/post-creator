export const getActivityQuery = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      powerAnalysis
      coordinates
      powers
      elevation
      elevationGrades
      distances
      owner
      __typename
    }
  }
`;

export type getActivityQueryProps = {
  getPost?: {
    powerAnalysis?: string | null;
    coordinates?: string | null;
    powers?: string | null;
    elevation?: string | null;
    elevationGrades?: string | null;
    distances?: string | null;
    owner?: string | null;
    __typename: 'Post';
  } | null;
};

export const getPostInitial = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      gpxFile
      images
      headerImage
      date
      publishedDate
      location
      postLocation
      stravaUrl
      resultsUrl
      type
      subType
      teaser
      currentFtp
      components
      # powerAnalysis
      # coordinates
      # powers
      # elevation
      # elevationGrades
      # distances
      blog {
        id
        name
        posts {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      blogPostsId
      postRelatedId
      owner
      __typename
    }
  }
`;

export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        gpxFile
        images
        headerImage
        date
        publishedDate
        location
        postLocation
        stravaUrl
        resultsUrl
        type
        subType
        teaser
        currentFtp
        # components
        # powerAnalysis
        # coordinates
        # powers
        # elevation
        # elevationGrades
        # distances
        blog {
          id
          name
          createdAt
          updatedAt
          owner
          __typename
        }
        related {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        blogPostsId
        postRelatedId
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
