/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
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
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
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
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
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
`;
export const onCreateBlog = /* GraphQL */ `
  subscription OnCreateBlog(
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
`;
export const onUpdateBlog = /* GraphQL */ `
  subscription OnUpdateBlog(
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
`;
export const onDeleteBlog = /* GraphQL */ `
  subscription OnDeleteBlog(
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
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost(
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
      updatedAt
      blogPostsId
      postRelatedId
      postAuthorId
      owner
      __typename
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost(
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
      updatedAt
      blogPostsId
      postRelatedId
      postAuthorId
      owner
      __typename
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost(
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
      updatedAt
      blogPostsId
      postRelatedId
      postAuthorId
      owner
      __typename
    }
  }
`;
