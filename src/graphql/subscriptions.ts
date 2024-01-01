/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onCreateUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onUpdateUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onDeleteUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateBlog = /* GraphQL */ `subscription OnCreateBlog(
  $filter: ModelSubscriptionBlogFilterInput
  $owner: String
) {
  onCreateBlog(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateBlogSubscriptionVariables,
  APITypes.OnCreateBlogSubscription
>;
export const onUpdateBlog = /* GraphQL */ `subscription OnUpdateBlog(
  $filter: ModelSubscriptionBlogFilterInput
  $owner: String
) {
  onUpdateBlog(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateBlogSubscriptionVariables,
  APITypes.OnUpdateBlogSubscription
>;
export const onDeleteBlog = /* GraphQL */ `subscription OnDeleteBlog(
  $filter: ModelSubscriptionBlogFilterInput
  $owner: String
) {
  onDeleteBlog(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteBlogSubscriptionVariables,
  APITypes.OnDeleteBlogSubscription
>;
export const onCreatePublishedPost = /* GraphQL */ `subscription OnCreatePublishedPost(
  $filter: ModelSubscriptionPublishedPostFilterInput
  $owner: String
) {
  onCreatePublishedPost(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePublishedPostSubscriptionVariables,
  APITypes.OnCreatePublishedPostSubscription
>;
export const onUpdatePublishedPost = /* GraphQL */ `subscription OnUpdatePublishedPost(
  $filter: ModelSubscriptionPublishedPostFilterInput
  $owner: String
) {
  onUpdatePublishedPost(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePublishedPostSubscriptionVariables,
  APITypes.OnUpdatePublishedPostSubscription
>;
export const onDeletePublishedPost = /* GraphQL */ `subscription OnDeletePublishedPost(
  $filter: ModelSubscriptionPublishedPostFilterInput
  $owner: String
) {
  onDeletePublishedPost(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePublishedPostSubscriptionVariables,
  APITypes.OnDeletePublishedPostSubscription
>;
export const onCreatePost = /* GraphQL */ `subscription OnCreatePost(
  $filter: ModelSubscriptionPostFilterInput
  $owner: String
) {
  onCreatePost(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePostSubscriptionVariables,
  APITypes.OnCreatePostSubscription
>;
export const onUpdatePost = /* GraphQL */ `subscription OnUpdatePost(
  $filter: ModelSubscriptionPostFilterInput
  $owner: String
) {
  onUpdatePost(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePostSubscriptionVariables,
  APITypes.OnUpdatePostSubscription
>;
export const onDeletePost = /* GraphQL */ `subscription OnDeletePost(
  $filter: ModelSubscriptionPostFilterInput
  $owner: String
) {
  onDeletePost(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePostSubscriptionVariables,
  APITypes.OnDeletePostSubscription
>;
