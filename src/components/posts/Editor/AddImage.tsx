import { Box } from "theme-ui";
import React from "react";
import { Path, Transforms } from "slate";
import { useSlateStatic } from "slate-react";
import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";

import ImagesButton from "./PostMenu/buttons/ImagesButton";
import AddMediaComponent from "./AddMediaComponent";
import ComponentButton from "./ComponentButton";
import { PostContext } from "../../PostContext";
import { updatePost } from "../../../graphql/mutations";
import { UpdatePostMutation } from "../../../API";
import { CloudinaryImage } from "../../../types/common";
import { EditorContext } from "./EditorContext";
import { useSlateContext } from "../../SlateContext";

const AddImage = ({ path }: { path: Path }) => {
  const { setPost, images, id } = React.useContext(PostContext);
  const { setIsNewComponentMenuOpen, setMobileMenu } =
    React.useContext(EditorContext);
  // const editor = useSlateStatic();
  const { editor } = useSlateContext();

  if (!editor) {
    return;
  }

  const insertImage = (selectedImage: CloudinaryImage) => {
    Transforms.insertNodes(
      editor,
      {
        type: "image",
        asset_id: selectedImage?.asset_id,
        public_id: selectedImage?.public_id,
        children: [{ text: "" }],
        void: true,
        photoCaption: "",
        caption: "",
      },
      { at: path }
    );
    if (path.length > 2) {
      Transforms.liftNodes(editor);
    }

    setMobileMenu({
      top: 0,
      left: 0,
      display: false,
      path: path,
      isFullScreen: false,
    });
    setIsNewComponentMenuOpen(false);
    const selection = window.getSelection();
    selection && selection.removeAllRanges();
    // setIsOpen(false);
  };

  return (
    <AddMediaComponent
      uploadPreset="epcsmymp"
      onSuccess={async (result) => {
        const uploadImage = result.info as CloudinaryImage;
        images?.push(result.info as CloudinaryImage);

        if (images) {
          setPost({ images: [...images] });
          insertImage(uploadImage);

          try {
            const response = (await API.graphql({
              authMode: "AMAZON_COGNITO_USER_POOLS",
              query: updatePost,
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
      // insertNode={() => {}}
      renderButton={(openModal) => {
        return (
          <Box
            onClick={() => openModal()}
            variant="boxes.sidebarMenuItem"
            sx={{
              cursor: "pointer",
            }}
          >
            <ComponentButton
              label={"Image"}
              icon={
                <Box
                  sx={{
                    width: "16px",
                    height: "auto",
                  }}
                >
                  <ImagesButton />
                </Box>
              }
            />
          </Box>
        );
      }}
    />
  );
};

export default AddImage;
