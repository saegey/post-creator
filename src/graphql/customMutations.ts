export const updatePostMinimal = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
      # powerAnalysis
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
      # related {
      #   items {
      #     id
      #     title
      #     gpxFile
      #     images
      #     headerImage
      #     date
      #     publishedDate
      #     location
      #     postLocation
      #     stravaUrl
      #     resultsUrl
      #     type
      #     subType
      #     teaser
      #     currentFtp
      #     components
      #     powerAnalysis
      #     coordinates
      #     powers
      #     elevation
      #     elevationGrades
      #     distances
      #     createdAt
      #     updatedAt
      #     blogPostsId
      #     postRelatedId
      #     owner
      #     __typename
      #   }
      #   nextToken
      #   __typename
      # }
      createdAt
      updatedAt
      blogPostsId
      postRelatedId
      owner
      __typename
    }
  }
`;
