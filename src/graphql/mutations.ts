/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
    id
    fullName
    email
    image
    username
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
    id
    fullName
    email
    image
    username
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
    id
    fullName
    email
    image
    username
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createBlog = /* GraphQL */ `mutation CreateBlog(
  $input: CreateBlogInput!
  $condition: ModelBlogConditionInput
) {
  createBlog(input: $input, condition: $condition) {
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
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateBlogMutationVariables,
  APITypes.CreateBlogMutation
>;
export const updateBlog = /* GraphQL */ `mutation UpdateBlog(
  $input: UpdateBlogInput!
  $condition: ModelBlogConditionInput
) {
  updateBlog(input: $input, condition: $condition) {
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
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateBlogMutationVariables,
  APITypes.UpdateBlogMutation
>;
export const deleteBlog = /* GraphQL */ `mutation DeleteBlog(
  $input: DeleteBlogInput!
  $condition: ModelBlogConditionInput
) {
  deleteBlog(input: $input, condition: $condition) {
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
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteBlogMutationVariables,
  APITypes.DeleteBlogMutation
>;
export const createPublishedPost = /* GraphQL */ `mutation CreatePublishedPost(
  $input: CreatePublishedPostInput!
  $condition: ModelPublishedPostConditionInput
) {
  createPublishedPost(input: $input, condition: $condition) {
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
        owner
        createdAt
        updatedAt
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
        owner
        createdAt
        updatedAt
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
    owner
    _version
    _lastChangedAt
    updatedAt
    publishedPostOriginalPostId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePublishedPostMutationVariables,
  APITypes.CreatePublishedPostMutation
>;
export const updatePublishedPost = /* GraphQL */ `mutation UpdatePublishedPost(
  $input: UpdatePublishedPostInput!
  $condition: ModelPublishedPostConditionInput
) {
  updatePublishedPost(input: $input, condition: $condition) {
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
        owner
        createdAt
        updatedAt
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
        owner
        createdAt
        updatedAt
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
    owner
    _version
    _lastChangedAt
    updatedAt
    publishedPostOriginalPostId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePublishedPostMutationVariables,
  APITypes.UpdatePublishedPostMutation
>;
export const deletePublishedPost = /* GraphQL */ `mutation DeletePublishedPost(
  $input: DeletePublishedPostInput!
  $condition: ModelPublishedPostConditionInput
) {
  deletePublishedPost(input: $input, condition: $condition) {
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
        owner
        createdAt
        updatedAt
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
        owner
        createdAt
        updatedAt
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
    owner
    _version
    _lastChangedAt
    updatedAt
    publishedPostOriginalPostId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePublishedPostMutationVariables,
  APITypes.DeletePublishedPostMutation
>;
export const createPost = /* GraphQL */ `mutation CreatePost(
  $input: CreatePostInput!
  $condition: ModelPostConditionInput
) {
  createPost(input: $input, condition: $condition) {
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
      owner
      createdAt
      updatedAt
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
      owner
      createdAt
      updatedAt
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
` as GeneratedMutation<
  APITypes.CreatePostMutationVariables,
  APITypes.CreatePostMutation
>;
export const updatePost = /* GraphQL */ `mutation UpdatePost(
  $input: UpdatePostInput!
  $condition: ModelPostConditionInput
) {
  updatePost(input: $input, condition: $condition) {
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
      owner
      createdAt
      updatedAt
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
      owner
      createdAt
      updatedAt
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
` as GeneratedMutation<
  APITypes.UpdatePostMutationVariables,
  APITypes.UpdatePostMutation
>;
export const deletePost = /* GraphQL */ `mutation DeletePost(
  $input: DeletePostInput!
  $condition: ModelPostConditionInput
) {
  deletePost(input: $input, condition: $condition) {
    type
    id
  }
}
` as GeneratedMutation<
  APITypes.DeletePostMutationVariables,
  APITypes.DeletePostMutation
>;
