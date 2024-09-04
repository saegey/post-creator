import { Box, Flex, Button } from "theme-ui";
import React from "react";
import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";

import { CloudinaryImage } from "../../types/common";

import { UpdatePostMutation } from "../../API";
import { updateHeroImage } from "../../utils/SlateUtilityFunctions";
import { updatePostImages } from "../../graphql/customMutations";
import AddMediaComponent from "./Editor/AddMediaComponent";
import { EditorContext } from "./Editor/EditorContext";
import { useSlateContext } from "../SlateContext";
import { PostContext } from "../PostContext";
import { Editor } from "slate";
import { useImperativeHandle, useRef, forwardRef } from "react";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";

type AddMediaComponentProps = {
  uploadPreset: string;
  onSuccess: (result: CloudinaryUploadWidgetResults) => void;
};
const UploadImage = forwardRef(
  ({ uploadPreset, onSuccess }: AddMediaComponentProps, ref) => {
    const addMediaRef = React.useRef<any>(null);
    const { menuPosition } = React.useContext(EditorContext);
    const { editor } = useSlateContext();
    const { images, setPost, id } = React.useContext(PostContext);
    console.log("upload image");

    return (
      <AddMediaComponent
        uploadPreset="epcsmymp"
        ref={addMediaRef}
        onSuccess={async (result) => {
          if (!editor || !menuPosition.path) {
            throw new Error("Editor or path not found");
          }
          const [node] = Editor.node(editor, menuPosition.path);
          const heroBannerElement = node.children?.find(
            (child) => child.type === "heroBanner"
          );
          console.log(heroBannerElement, menuPosition.path);
          if (heroBannerElement === undefined) {
            throw new Error("Hero banner element not found");
          }

          updateHeroImage({
            editor,
            path: menuPosition.path,
            image: result.info as CloudinaryImage,
            element: heroBannerElement,
          });

          images?.push(result.info as CloudinaryImage);

          if (images) {
            setPost({ images: [...images] });
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
            } catch (errors) {
              console.error(errors);
            }
          }
        }}
      />
    );
  }
);

export default UploadImage;
