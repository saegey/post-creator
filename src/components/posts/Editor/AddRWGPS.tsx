import { Flex, Text, Box } from "theme-ui";
import React from "react";
import { useSlateStatic } from "slate-react";

import { EditorContext } from "./EditorContext";
import EmbedIcon from "../../icons/EmbedIcon";
import StandardModal from "../../shared/StandardModal";
import EmbedSettings from "../Embed/EmbedSettings";

const RWGPSModal = () => {
  const editor = useSlateStatic();

  const { setIsRWGPSModalOpen, isRWGPSModalOpen } =
    React.useContext(EditorContext);

  return isRWGPSModalOpen ? (
    <StandardModal
      title={"Embed"}
      setIsOpen={setIsRWGPSModalOpen}
      isOpen={isRWGPSModalOpen}
    >
      <EmbedSettings editor={editor} isModalOpen={setIsRWGPSModalOpen} />
    </StandardModal>
  ) : (
    <></>
  );
};

const AddRWGPS = () => {
  const { setIsRWGPSModalOpen, setIsNewComponentMenuOpen } =
    React.useContext(EditorContext);

  const addEmbed = () => {
    setIsRWGPSModalOpen(true);
    setIsNewComponentMenuOpen(false);
  };

  return (
    <Box
      onClick={() => addEmbed()}
      variant="boxes.sidebarMenuItem"
      sx={{
        cursor: "pointer",
      }}
    >
      <Flex sx={{ alignItems: "center", gap: "20px" }}>
        <Box
          sx={{
            width: "25px",
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
          }}
        >
          Embed RWGPS Route
        </Text>
      </Flex>
    </Box>
  );
};

export default AddRWGPS;

export { RWGPSModal };
