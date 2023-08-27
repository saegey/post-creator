/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
          coordinates
          powers
          elevation
          elevationGrades
          distances
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
          coordinates
          powers
          elevation
          elevationGrades
          distances
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
          coordinates
          powers
          elevation
          elevationGrades
          distances
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
          coordinates
          powers
          elevation
          elevationGrades
          distances
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
      createdAt
      updatedAt
      blogPostsId
      postRelatedId
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
          coordinates
          powers
          elevation
          elevationGrades
          distances
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
      createdAt
      updatedAt
      blogPostsId
      postRelatedId
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
          coordinates
          powers
          elevation
          elevationGrades
          distances
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
      createdAt
      updatedAt
      blogPostsId
      postRelatedId
      owner
      __typename
    }
  }
`;
