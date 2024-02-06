import { Box, Flex, Text } from "theme-ui";
import React from "react";

import StravaIcon from "../../icons/StravaIcon";
import StandardModal from "../../shared/StandardModal";
import StravaEmbed from "../Embed/StravaEmbed";
import { useSlateStatic } from "slate-react";
import { EditorContext } from "./EditorContext";

const StravaModal = () => {
  const { isStravaModalOpen, setIsStravaModalOpen } =
    React.useContext(EditorContext);
  const editor = useSlateStatic();

  return isStravaModalOpen ? (
    <StandardModal
      title={"Strava Embed"}
      setIsOpen={setIsStravaModalOpen}
      isOpen={isStravaModalOpen}
    >
      <StravaEmbed editor={editor} isModalOpen={setIsStravaModalOpen} />
    </StandardModal>
  ) : (
    <></>
  );
};

const AddStravaLink = () => {
  const { setIsStravaModalOpen, setIsNewComponentMenuOpen } =
    React.useContext(EditorContext);

  const addStravaLink = () => {
    setIsStravaModalOpen(true);
    setIsNewComponentMenuOpen(false);
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
          <Box
            sx={{
              width: "16px",
              height: "auto",
            }}
          >
            <StravaIcon color={"var(--theme-ui-colors-text)"} />
          </Box>
          <Text as="span" sx={{ fontSize: "14px" }}>
            Embed Strava activity
          </Text>
        </Flex>
      </Box>
    </>
  );
};

export default AddStravaLink;
export { StravaModal };
