/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    fullName
    email
    image
    username
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      fullName
      email
      image
      username
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getBlog = /* GraphQL */ `query GetBlog($id: ID!) {
  getBlog(id: $id) {
    id
    name
    posts {
      items {
        type
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
        timeSeriesFile
        subType
        teaser
        currentFtp
        components
        powerAnalysis
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
        webscorerResults
        crossResults
        omniResults
        runSignupResults
        raceResultsProvider
        privacyStatus
        updatedAt
        blogPostsId
        postRelatedId
        postAuthorId
        owner
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetBlogQueryVariables, APITypes.GetBlogQuery>;
export const listBlogs = /* GraphQL */ `query ListBlogs(
  $filter: ModelBlogFilterInput
  $limit: Int
  $nextToken: String
) {
  listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListBlogsQueryVariables, APITypes.ListBlogsQuery>;
export const getPublishedPost = /* GraphQL */ `query GetPublishedPost($id: ID!) {
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
    type
    subType
    teaser
    currentFtp
    components
    powerAnalysis
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
    timeSeriesFile
    powerZoneBuckets
    createdAt
    heroImage
    subhead
    shortUrl
    raceResults
    webscorerResults
    crossResults
    omniResults
    runSignupResults
    raceResultsProvider
    originalPostId
    originalPost {
      type
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
      timeSeriesFile
      subType
      teaser
      currentFtp
      components
      powerAnalysis
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
      author {
        id
        fullName
        email
        image
        username
        createdAt
        updatedAt
        owner
        __typename
      }
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
      webscorerResults
      crossResults
      omniResults
      runSignupResults
      raceResultsProvider
      privacyStatus
      updatedAt
      blogPostsId
      postRelatedId
      postAuthorId
      owner
      __typename
    }
    updatedAt
    publishedPostOriginalPostId
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPublishedPostQueryVariables,
  APITypes.GetPublishedPostQuery
>;
export const listPublishedPosts = /* GraphQL */ `query ListPublishedPosts(
  $filter: ModelPublishedPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPublishedPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      components
      powerAnalysis
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
      timeSeriesFile
      powerZoneBuckets
      createdAt
      heroImage
      subhead
      shortUrl
      raceResults
      webscorerResults
      crossResults
      omniResults
      runSignupResults
      raceResultsProvider
      originalPostId
      originalPost {
        type
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
        timeSeriesFile
        subType
        teaser
        currentFtp
        components
        powerAnalysis
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
        webscorerResults
        crossResults
        omniResults
        runSignupResults
        raceResultsProvider
        privacyStatus
        updatedAt
        blogPostsId
        postRelatedId
        postAuthorId
        owner
        __typename
      }
      updatedAt
      publishedPostOriginalPostId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPublishedPostsQueryVariables,
  APITypes.ListPublishedPostsQuery
>;
export const listPublishedPostsByCreatedAt = /* GraphQL */ `query ListPublishedPostsByCreatedAt(
  $type: String!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelPublishedPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPublishedPostsByCreatedAt(
    type: $type
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
      components
      powerAnalysis
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
      timeSeriesFile
      powerZoneBuckets
      createdAt
      heroImage
      subhead
      shortUrl
      raceResults
      webscorerResults
      crossResults
      omniResults
      runSignupResults
      raceResultsProvider
      originalPostId
      originalPost {
        type
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
        timeSeriesFile
        subType
        teaser
        currentFtp
        components
        powerAnalysis
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
        webscorerResults
        crossResults
        omniResults
        runSignupResults
        raceResultsProvider
        privacyStatus
        updatedAt
        blogPostsId
        postRelatedId
        postAuthorId
        owner
        __typename
      }
      updatedAt
      publishedPostOriginalPostId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPublishedPostsByCreatedAtQueryVariables,
  APITypes.ListPublishedPostsByCreatedAtQuery
>;
export const PublishedPostByOriginalPostId = /* GraphQL */ `query PublishedPostByOriginalPostId(
  $originalPostId: String!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelPublishedPostFilterInput
  $limit: Int
  $nextToken: String
) {
  PublishedPostByOriginalPostId(
    originalPostId: $originalPostId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
      components
      powerAnalysis
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
      timeSeriesFile
      powerZoneBuckets
      createdAt
      heroImage
      subhead
      shortUrl
      raceResults
      webscorerResults
      crossResults
      omniResults
      runSignupResults
      raceResultsProvider
      originalPostId
      originalPost {
        type
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
        timeSeriesFile
        subType
        teaser
        currentFtp
        components
        powerAnalysis
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
        webscorerResults
        crossResults
        omniResults
        runSignupResults
        raceResultsProvider
        privacyStatus
        updatedAt
        blogPostsId
        postRelatedId
        postAuthorId
        owner
        __typename
      }
      updatedAt
      publishedPostOriginalPostId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PublishedPostByOriginalPostIdQueryVariables,
  APITypes.PublishedPostByOriginalPostIdQuery
>;
export const getPost = /* GraphQL */ `query GetPost($id: ID!) {
  getPost(id: $id) {
    type
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
    timeSeriesFile
    subType
    teaser
    currentFtp
    components
    powerAnalysis
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
    related {
      items {
        type
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
        timeSeriesFile
        subType
        teaser
        currentFtp
        components
        powerAnalysis
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
        webscorerResults
        crossResults
        omniResults
        runSignupResults
        raceResultsProvider
        privacyStatus
        updatedAt
        blogPostsId
        postRelatedId
        postAuthorId
        owner
        __typename
      }
      nextToken
      __typename
    }
    author {
      id
      fullName
      email
      image
      username
      createdAt
      updatedAt
      owner
      __typename
    }
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
    webscorerResults
    crossResults
    omniResults
    runSignupResults
    raceResultsProvider
    privacyStatus
    updatedAt
    blogPostsId
    postRelatedId
    postAuthorId
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetPostQueryVariables, APITypes.GetPostQuery>;
export const listPosts = /* GraphQL */ `query ListPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      type
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
      timeSeriesFile
      subType
      teaser
      currentFtp
      components
      powerAnalysis
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
      author {
        id
        fullName
        email
        image
        username
        createdAt
        updatedAt
        owner
        __typename
      }
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
      webscorerResults
      crossResults
      omniResults
      runSignupResults
      raceResultsProvider
      privacyStatus
      updatedAt
      blogPostsId
      postRelatedId
      postAuthorId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListPostsQueryVariables, APITypes.ListPostsQuery>;
export const listPostsByCreatedAt = /* GraphQL */ `query ListPostsByCreatedAt(
  $type: String!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPostsByCreatedAt(
    type: $type
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      type
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
      timeSeriesFile
      subType
      teaser
      currentFtp
      components
      powerAnalysis
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
      author {
        id
        fullName
        email
        image
        username
        createdAt
        updatedAt
        owner
        __typename
      }
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
      webscorerResults
      crossResults
      omniResults
      runSignupResults
      raceResultsProvider
      privacyStatus
      updatedAt
      blogPostsId
      postRelatedId
      postAuthorId
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPostsByCreatedAtQueryVariables,
  APITypes.ListPostsByCreatedAtQuery
>;
