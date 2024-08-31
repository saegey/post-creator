// import { EditorContext } from "./EditorContext";
import { Flex, Text, Box } from "theme-ui";
import React from "react";
import { useSlateStatic } from "slate-react";

import { EditorContext } from "./EditorContext";

import VideoIcon from "../../icons/VideoIcon";
import StandardModal from "../../shared/StandardModal";
import VideoUploader from "../VideoEmbed/VideoUploader";

const AddVideoModal = () => {
  const { setIsVideoUploadOpen, isVideoUploadOpen } =
    React.useContext(EditorContext);

  console.log("AddVideoModal");

  const editor = useSlateStatic();
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
  const { setIsVideoUploadOpen, setIsNewComponentMenuOpen } =
    React.useContext(EditorContext);

  const embedVideo = () => {
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
      <Flex sx={{ alignItems: "center", gap: "20px" }}>
        <Box
          sx={{
            width: "16px",
            height: "auto",
            // marginRight: "10px",
          }}
        >
          <VideoIcon />
        </Box>
        <Text
          as="span"
          sx={{
            color: "text",
            fontSize: "14px",
          }}
        >
          Embed Video
        </Text>
      </Flex>
    </Box>
  );
};

export default AddVideo;

export { AddVideoModal };
