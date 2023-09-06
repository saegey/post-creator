export const getActivityQuery = /* GraphQL */ `
  query GetActivityQuery($id: ID!) {
    getPost(id: $id) {
      powerAnalysis
      coordinates
      powers
      elevation
      elevationGrades
      distances
      # owner
      __typename
    }
  }
`;

export type getActivityQueryProps = {
  getPost?: {
    powerAnalysis?: string | null;
    cadenceAnalysis?: string | null;
    tempAnalysis?: string | null;
    heartAnalysis?: string | null;
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
  query GetPostInitial($id: ID!) {
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
      elevationTotal
      normalizedPower
      distance
      elapsedTime
      stoppedTime
      timeInRed
      powerAnalysis
      heartAnalysis
      cadenceAnalysis
      tempAnalysis
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
      author {
        id
        fullName
        email
        image
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      blogPostsId
      postRelatedId
      # owner
      __typename
    }
  }
`;

export const listPostsCustom = /* GraphQL */ `
  query listPostsCustom(
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
        postAuthorId
        author {
          id
          fullName
          email
          image
          username
        }
        # userId
        related {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        blogPostsId
        postRelatedId
        # owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
