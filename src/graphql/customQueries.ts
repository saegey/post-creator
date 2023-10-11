import * as APITypes from '../API';
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

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
      subhead
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
      powerZones
      powerZoneBuckets
      coordinates
      powers
      elevation
      elevationGrades
      distances
      heroImage
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
      shortUrl
      raceResults
      # owner
      __typename
    }
  }
`;

export const listPostsCustom = /* GraphQL */ `
  query listPostsByCreatedAt {
    listPostsByCreatedAt(type: "Post", sortDirection: DESC) {
      items {
        id
        title
        createdAt
        images
        author {
          id
          username
          fullName
          image
        }
        postAuthorId
      }
    }
  }
`;

export const getPublishedPost =
  /* GraphQL */ `query GetPublishedPost($id: ID!) {
  getPublishedPost(id: $id) {
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
    subType
    teaser
    currentFtp
    components
    powerAnalysis
    coordinates
    powers
    elevation
    elevationGrades
    distances
    author
    elevationTotal
    normalizedPower
    distance
    heartAnalysis
    cadenceAnalysis
    tempAnalysis
    elapsedTime
    stoppedTime
    timeInRed
    powerZones
    powerZoneBuckets
    createdAt
    heroImage
    subhead
    shortUrl
    raceResults
    raceResultsProvider
    updatedAt
    # publishedPostOriginalPostId
    owner
    __typename
  }
}
` as GeneratedQuery<
    APITypes.GetPublishedPostQueryVariables,
    APITypes.GetPublishedPostQuery
  >;
