import { Box, Flex, Button } from "theme-ui";
import React from "react";
import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";

import AddMediaComponent from "../Editor/AddMediaComponent";
import { useSlateContext } from "../../SlateContext";
import { EditorContext } from "../Editor/EditorContext";
import { CloudinaryImage, HeroBannerType } from "../../../types/common";
import { PostContext } from "../../PostContext";
import { updatePost } from "../../../graphql/mutations";
import { UpdatePostMutation } from "../../../API";
import { updateHeroImage } from "../../../utils/SlateUtilityFunctions";
import { updatePostImages } from "../../../graphql/customMutations";

const DefaultImage = ({ element }: { element: HeroBannerType }) => {
  const { editor, currentPath } = useSlateContext();
  const { images, setPost, id } = React.useContext(PostContext);
  const { isImageUploadOpen, setIsImageUploadOpen } =
    React.useContext(EditorContext);
  const addMediaRef = React.useRef<any>(null);

  const handleButtonClick = () => {
    setIsImageUploadOpen(true);
    console.log("addMediaRef", addMediaRef);
    if (addMediaRef.current) {
      addMediaRef.current.openModal(); // Programmatically trigger the widget
    }
  };

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
          <Button onClick={handleButtonClick} variant="primaryButton">
            Add Image
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default DefaultImage;
