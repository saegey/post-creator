/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
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
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
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
`;
export const getBlog = /* GraphQL */ `
  query GetBlog($id: ID!) {
    getBlog(id: $id) {
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
          elevationTotal
          normalizedPower
          distance
          heartAnalysis
          cadenceAnalysis
          tempAnalysis
          elapsedTime
          stoppedTime
          timeInRed
          createdAt
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
export const listBlogs = /* GraphQL */ `
  query ListBlogs(
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
`;
export const getPost = /* GraphQL */ `
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
          elevationTotal
          normalizedPower
          distance
          heartAnalysis
          cadenceAnalysis
          tempAnalysis
          elapsedTime
          stoppedTime
          timeInRed
          createdAt
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
      createdAt
      updatedAt
      blogPostsId
      postRelatedId
      postAuthorId
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
        createdAt
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
`;
