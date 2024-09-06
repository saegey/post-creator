// import { EditorContext } from "./EditorContext";
import { Flex, Text, Box } from "theme-ui";
import React from "react";
import { useSlateStatic } from "slate-react";

import { EditorContext } from "./EditorContext";

import VideoIcon from "../../icons/VideoIcon";
import StandardModal from "../../shared/StandardModal";
import VideoUploader from "../VideoEmbed/VideoUploader";
import { useSlateContext } from "../../SlateContext";
import GenericMenuItem from "../../GenericMenuItem";

const AddVideoModal = () => {
  const { setIsVideoUploadOpen, isVideoUploadOpen } =
    React.useContext(EditorContext);

  console.log("AddVideoModal");

  const { editor } = useSlateContext();

  if (!editor) {
    return <></>;
  }

  return isVideoUploadOpen ? (
    <StandardModal
      title={"Upload Video"}
      setIsOpen={setIsVideoUploadOpen}
      isOpen={isVideoUploadOpen}
    >
      <VideoUploader editor={editor} />
    </StandardModal>
  ) : (
    <></>
  );
};

const AddVideo = () => {
  const {
    setIsVideoUploadOpen,
    setIsNewComponentMenuOpen,
    menuPosition,
    setNewComponentPath,
  } = React.useContext(EditorContext);

  const { path } = menuPosition;

  const embedVideo = () => {
    setNewComponentPath(path);
    setIsVideoUploadOpen(true);
    setIsNewComponentMenuOpen(false);
  };

  return (
    <Box
      onClick={() => embedVideo()}
      variant="boxes.sidebarMenuItem"
      sx={{
        cursor: "pointer",
      }}
    >
      <GenericMenuItem icon={<VideoIcon />} label="Embed Video" />
    </Box>
  );
};

export default AddVideo;

export { AddVideoModal };
