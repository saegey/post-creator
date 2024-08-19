export const updatePostMinimal = /* GraphQL */ `
  mutation UpdatePostMinimal(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      components
      heroImage
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
