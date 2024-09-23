// export const updatePostMinimal = /* GraphQL */ `
//   mutation UpdatePostMinimal(
//     $input: UpdatePostInput!
//     $condition: ModelPostConditionInput
//   ) {
//     updatePost(input: $input, condition: $condition) {
//       components
//       heroImage
//     }
//   }
// `;

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

export const updateRaceResults = /* GraphQL */ `
  mutation UpdatePostRaceResults(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      raceResults
      raceResultsProvider
      resultsUrl
    }
  }
`;

export const updatePostImages = /* GraphQL */ `
  mutation UpdatePostImages(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      images
    }
  }
`;

export const updateCrossResults = /* GraphQL */ `
  mutation UpdateCrossResults(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      crossResults
      raceResultsProvider
      resultsUrl
    }
  }
`;

export const createPostNew = /* GraphQL */ `
  mutation CreatePostNew(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      type
      id
      title
      postAuthorId
      privacyStatus
    }
  }
`;

export const updatePostComponents = /* GraphQL */ `
  mutation UpdatePostComponents(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      components
    }
  }
`;

// export const deletePost = /* GraphQL */ `
//   mutation DeletePost(
//     $input: DeletePostInput!
//     $condition: ModelPostConditionInput
//   ) {
//     deletePost(input: $input, condition: $condition) {
//       id
//       __typename
//     }
//   }
// `;
