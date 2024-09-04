import { Box } from "theme-ui";
import React from "react";

import { EditorContext } from "./EditorContext";
import { useSlateContext } from "../../SlateContext";
import GenericMenuItem from "../../GenericMenuItem";
import ImagesIcon from "../../icons/ImagesIcon";

const AddImage = () => {
  const { setIsImageUploadOpen } = React.useContext(EditorContext);
  const { editor } = useSlateContext();

  if (!editor) {
    return;
  }

  return (
    <Box
      onClick={() => setIsImageUploadOpen(true)}
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
