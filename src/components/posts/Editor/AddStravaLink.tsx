import { Box, Flex, Text } from "theme-ui";
import React from "react";

import StravaIcon from "../../icons/StravaIcon";
import StandardModal from "../../shared/StandardModal";
import StravaEmbed from "../Embed/StravaEmbed";
import { EditorContext } from "./EditorContext";
import { useSlateContext } from "../../SlateContext";
import GenericMenuItem from "../../GenericMenuItem";

const StravaModal = () => {
  const { isStravaModalOpen, setIsStravaModalOpen } =
    React.useContext(EditorContext);
  const { menuPosition } = React.useContext(EditorContext);
  const { path } = menuPosition;

  const { editor } = useSlateContext();
  if (!editor || isStravaModalOpen === undefined) {
    return;
  }

  return (
    <StandardModal
      title={"Strava Embed"}
      setIsOpen={setIsStravaModalOpen}
      isOpen={isStravaModalOpen}
    >
      <StravaEmbed
        editor={editor}
        isModalOpen={setIsStravaModalOpen}
        path={path}
      />
    </StandardModal>
  );
};

const AddStravaLink = () => {
  const {
    setIsStravaModalOpen,
    isStravaModalOpen,
    setIsNewComponentMenuOpen,
    setNewComponentPath,
    menuPosition,
  } = React.useContext(EditorContext);

  const { path } = menuPosition;

  const addStravaLink = () => {
    setNewComponentPath(path);
    setIsStravaModalOpen(true);
    setIsNewComponentMenuOpen(false);
    // setMobileMenu({ ...mobileMenu, isFullScreen: false, display: false });
  };

  return (
    <>
      <Box
        onClick={() => addStravaLink()}
        variant="boxes.sidebarMenuItem"
        sx={{
          cursor: "pointer",
        }}
      >
        <Flex sx={{ alignItems: "center", gap: "20px" }}>
          <GenericMenuItem label="Add Strava Link" icon={<StravaIcon />} />
        </Flex>
      </Box>
    </>
  );
};

export default AddStravaLink;
export { StravaModal };
