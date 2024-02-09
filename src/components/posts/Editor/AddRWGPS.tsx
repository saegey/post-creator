import { Flex, Text, Box } from "theme-ui";
import React from "react";
import { useSlateStatic } from "slate-react";

import { EditorContext } from "./EditorContext";
import EmbedIcon from "../../icons/EmbedIcon";
import StandardModal from "../../shared/StandardModal";
import EmbedSettings from "../Embed/EmbedSettings";
import { Path } from "slate";

const RWGPSModal = ({ path }: { path: Path }) => {
  const editor = useSlateStatic();

  const { setIsRWGPSModalOpen, isRWGPSModalOpen } =
    React.useContext(EditorContext);

  return isRWGPSModalOpen ? (
    <StandardModal
      title={"Embed"}
      setIsOpen={setIsRWGPSModalOpen}
      isOpen={isRWGPSModalOpen}
    >
      <EmbedSettings
        editor={editor}
        isModalOpen={setIsRWGPSModalOpen}
        path={path}
      />
    </StandardModal>
  ) : (
    <></>
  );
};

const AddRWGPS = ({ path }: { path: Path }) => {
  const {
    setIsRWGPSModalOpen,
    setIsNewComponentMenuOpen,
    setMobileMenu,
    mobileMenu,
  } = React.useContext(EditorContext);

  const addEmbed = () => {
    // setMobileMenu({ ...mobileMenu, isFullScreen: false, display: false });
    setIsRWGPSModalOpen(true);
    // setIsNewComponentMenuOpen(false);
  };

  return (
    <>
      <RWGPSModal path={path} />
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
          <Box
            sx={{
              width: "16px",
              height: "auto",
              // marginRight: "10px",
            }}
          >
            <EmbedIcon />
          </Box>
          <Text
            as="span"
            sx={{
              color: "text",
              fontSize: "14px",
            }}
          >
            Embed RWGPS Route
          </Text>
        </Flex>
      </Box>
    </>
  );
};

export default AddRWGPS;

export { RWGPSModal };
