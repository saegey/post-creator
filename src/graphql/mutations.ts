/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createBlog = /* GraphQL */ `
  mutation CreateBlog(
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
          subhead
          shortUrl
          raceResults
          raceResultsProvider
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
export const updateBlog = /* GraphQL */ `
  mutation UpdateBlog(
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
          subhead
          shortUrl
          raceResults
          raceResultsProvider
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
export const deleteBlog = /* GraphQL */ `
  mutation DeleteBlog(
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
          subhead
          shortUrl
          raceResults
          raceResultsProvider
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
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
          subhead
          shortUrl
          raceResults
          raceResultsProvider
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
      raceResultsProvider
      updatedAt
      blogPostsId
      postRelatedId
      postAuthorId
      owner
      __typename
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
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
          subhead
          shortUrl
          raceResults
          raceResultsProvider
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
      raceResultsProvider
      updatedAt
      blogPostsId
      postRelatedId
      postAuthorId
      owner
      __typename
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
          subhead
          shortUrl
          raceResults
          raceResultsProvider
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
      raceResultsProvider
      updatedAt
      blogPostsId
      postRelatedId
      postAuthorId
      owner
      __typename
    }
  }
`;
