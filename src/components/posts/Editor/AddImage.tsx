import { Box } from "theme-ui";
import React from "react";
import { Transforms } from "slate";
import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";

import AddMediaComponent from "./AddMediaComponent";
import { PostContext } from "../../PostContext";
import { updatePost } from "../../../graphql/mutations";
import { UpdatePostMutation } from "../../../API";
import { CloudinaryImage } from "../../../types/common";
import { EditorContext } from "./EditorContext";
import { useSlateContext } from "../../SlateContext";
import GenericMenuItem from "../../GenericMenuItem";
import ImagesIcon from "../../icons/ImagesIcon";

const AddImage = () => {
  const { setPost, images, id } = React.useContext(PostContext);
  const {
    setIsNewComponentMenuOpen,
    setMobileMenu,
    menuPosition,
    setIsNewPostImageUploadOpen,
    setNewComponentPath,
  } = React.useContext(EditorContext);
  const { path } = menuPosition;
  const { editor } = useSlateContext();

  if (!editor) {
    return;
  }

  return (
    <Box
      onClick={() => {
        setIsNewPostImageUploadOpen(true);
      }}
      variant="boxes.sidebarMenuItem"
      sx={{
        cursor: "pointer",
      }}
    >
      <GenericMenuItem label="Image" icon={<ImagesIcon />} />
    </Box>
  );
};

export default AddImage;
