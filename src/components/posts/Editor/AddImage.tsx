import { Box } from "theme-ui";
import React from "react";

import { EditorContext } from "./EditorContext";
import { useSlateContext } from "../../SlateContext";
import GenericMenuItem from "../../GenericMenuItem";
import ImagesIcon from "../../icons/ImagesIcon";

const AddImage = () => {
  const {
    setIsNewComponentMenuOpen,
    menuPosition,
    setIsChangeImageModalOpen,
    setMobileMenu,
  } = React.useContext(EditorContext);

  const { path } = menuPosition;

  const { editor } = useSlateContext();

  if (!editor) {
    return;
  }

  return (
    <Box
      onClick={() => {
        setIsNewComponentMenuOpen(false);
        setMobileMenu({
          top: 0,
          left: 0,
          display: false,
          path: path,
          isFullScreen: false,
        });
        setIsChangeImageModalOpen(true);
      }}
      variant="boxes.sidebarMenuItem"
      sx={{
        cursor: "pointer",
      }}
    >
      <GenericMenuItem
        label="Image"
        icon={<ImagesIcon sx={{ padding: "6px" }} />}
      />
    </Box>
  );
};

export default AddImage;
