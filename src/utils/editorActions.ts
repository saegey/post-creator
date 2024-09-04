import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";

import { UpdatePostMutation } from "../API";
import { updatePostImages } from "../graphql/customMutations";
import { CloudinaryImage } from "../types/common";

const updateImages = async (id: string, images: CloudinaryImage[]) => {
  try {
    const response = (await API.graphql({
      authMode: "AMAZON_COGNITO_USER_POOLS",
      query: updatePostImages,
      variables: {
        input: {
          images: JSON.stringify(images),
          id: id,
        },
      },
    })) as GraphQLResult<UpdatePostMutation>;
    console.log(response);
  } catch (errors) {
    console.error(errors);
  }
};

export { updateImages };
