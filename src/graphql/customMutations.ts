export const updatePostMinimal = /* GraphQL */ `
  mutation UpdatePostMinimal(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      title
      gpxFile
      images
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
      createdAt
      updatedAt
      blogPostsId
      postRelatedId
      owner
      __typename
    }
  }
`;

export type UpdatePostSettingsMutation = {
  updatePost?: {
    __typename: "Post";
    type: string;
    id: string;
    title: string;
    gpxFile?: string | null;
    date?: string | null;
    postLocation?: string | null;
    subType?: string | null;
    teaser?: string | null;
    currentFtp?: string | null;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export const updatePostSettings = /* GraphQL */ `
  mutation UpdatePostMinimal(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      title
      gpxFile
      date
      postLocation
      subType
      teaser
      currentFtp
      updatedAt
    }
  }
`;
