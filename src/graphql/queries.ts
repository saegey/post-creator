/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
          stravaUrl
          type
          subType
          teaser
          components
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
      stravaUrl
      type
      subType
      teaser
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
          id
          title
          gpxFile
          images
          headerImage
          date
          publishedDate
          location
          stravaUrl
          type
          subType
          teaser
          components
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
        stravaUrl
        type
        subType
        teaser
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
