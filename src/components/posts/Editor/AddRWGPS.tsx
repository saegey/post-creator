import { Flex, Text, Box } from "theme-ui";
import React from "react";

import { EditorContext } from "./EditorContext";
import EmbedIcon from "../../icons/EmbedIcon";
import StandardModal from "../../shared/StandardModal";
import EmbedSettings from "../Embed/EmbedSettings";
import { Path } from "slate";
import { useSlateContext } from "../../SlateContext";
import GenericMenuItem from "../../GenericMenuItem";

const RWGPSModal = () => {
  const { editor } = useSlateContext();

  const { setIsRWGPSModalOpen, isRWGPSModalOpen, newComponentPath } =
    React.useContext(EditorContext);

  if (newComponentPath === undefined) {
    return <></>;
  }
  // console.log("RWGPSModal");

  return isRWGPSModalOpen && editor ? (
    <StandardModal
      title={"Embed Route"}
      setIsOpen={setIsRWGPSModalOpen}
      isOpen={isRWGPSModalOpen}
    >
      <EmbedSettings
        editor={editor}
        isModalOpen={setIsRWGPSModalOpen}
        path={newComponentPath}
      />
    </StandardModal>
  ) : (
    <></>
  );
};

const AddRWGPS = () => {
  const {
    setIsRWGPSModalOpen,
    setIsNewComponentMenuOpen,
    setNewComponentPath,
    menuPosition,
  } = React.useContext(EditorContext);
  const { path } = menuPosition;

  const addEmbed = () => {
    setNewComponentPath(path);
    setIsRWGPSModalOpen(true);
    setIsNewComponentMenuOpen(false);
  };

  return (
    <>
      <Box
        onClick={() => {
          addEmbed();
        }}
        variant="boxes.sidebarMenuItem"
        sx={{
          cursor: "pointer",
        }}
      >
        <Flex sx={{ alignItems: "center", gap: "20px" }}>
          <GenericMenuItem label="Route" icon={<EmbedIcon />} />
        </Flex>
      </Box>
    </>
  );
};

export default AddRWGPS;

export { RWGPSModal };
