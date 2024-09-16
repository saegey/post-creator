import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";

import { updatePost } from "../../src/graphql/mutations";
import { UpdatePostMutation } from "../../src/API";
import { updatePostComponents } from "../graphql/customMutations";
import { CloudinaryImage } from "../types/common";

interface PostSaveProps {
  postId: string | undefined;
  components: Array<any>;
  // heroImage: string | null;
}

const PostSaveComponents = async ({
  components,
  postId,
}: // heroImage,
PostSaveProps) => {
  try {
    const response = (await API.graphql({
      authMode: "AMAZON_COGNITO_USER_POOLS",
      query: updatePostComponents,
      variables: {
        input: {
          id: postId,
          // heroImage: heroImage ? heroImage : null,
          components: JSON.stringify(components),
        },
      },
    })) as GraphQLResult<UpdatePostMutation>;
  } catch (errors) {
    console.error(errors);
  }
};

const PostSaveImages = async ({
  postId,
  images,
}: {
  postId: string;
  images: CloudinaryImage[];
}) => {
  try {
    const results = (await API.graphql({
      authMode: "AMAZON_COGNITO_USER_POOLS",
      query: updatePost,
      variables: {
        input: {
          id: postId,
          images: JSON.stringify(images),
        },
      },
    })) as GraphQLResult<UpdatePostMutation>;
    // console.log(results);
  } catch (error) {
    console.error(error);
  }
};

export { PostSaveComponents, PostSaveImages };
