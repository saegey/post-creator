import { Box, Flex, Button } from "theme-ui";
import React from "react";
import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";

import AddMediaComponent from "../Editor/AddMediaComponent";
import { useSlateContext } from "../../SlateContext";
import useEditorState from "../../../hooks/useEditorState";
import { EditorContext } from "../Editor/EditorContext";
import { Transforms } from "slate";
import { CloudinaryImage, HeroBannerType } from "../../../types/common";
import { PostContext } from "../../PostContext";
import { updatePost } from "../../../graphql/mutations";
import { UpdatePostMutation } from "../../../API";

const DefaultImage = ({ element }: { element: HeroBannerType }) => {
  const { editor, currentPath } = useSlateContext();
  const { images, setPost, id } = React.useContext(PostContext);

  const { menuPosition } = React.useContext(EditorContext);
  return (
    <Flex
      sx={{
        width: ["100%", "65%", "65%"],
        height: "400px",
        background: "surfaceAccent",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Flex sx={{ alignItems: "center" }}>
        <Box>
          <AddMediaComponent
            uploadPreset="epcsmymp"
            onSuccess={async (result) => {
              console.log(result, menuPosition, currentPath);
              if (!editor || !menuPosition.path) {
                throw new Error("Editor or path not found");
              }
              // setSelectedImage();

              Transforms.setNodes(
                editor,
                {
                  ...element,
                  image: result.info,
                } as HeroBannerType,
                {
                  at: menuPosition.path,
                }
              );

              images?.push(result.info as CloudinaryImage);

              if (images) {
                setPost({ images: [...images] });
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
            renderButton={(open) => {
              return (
                <Button onClick={open} variant="primaryButton">
                  Add Image
                </Button>
              );
            }}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default DefaultImage;
