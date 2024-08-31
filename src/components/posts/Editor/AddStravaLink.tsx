import { Box, Flex, Text } from "theme-ui";
import React from "react";

import StravaIcon from "../../icons/StravaIcon";
import StandardModal from "../../shared/StandardModal";
import StravaEmbed from "../Embed/StravaEmbed";
import { useSlateStatic } from "slate-react";
import { EditorContext } from "./EditorContext";
import { Path } from "slate";

const StravaModal = ({ path }: { path: Path }) => {
  const { isStravaModalOpen, setIsStravaModalOpen } =
    React.useContext(EditorContext);
  const editor = useSlateStatic();

  return isStravaModalOpen ? (
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
  ) : (
    <></>
  );
};

const AddStravaLink = ({ path }: { path: Path }) => {
  const { setIsStravaModalOpen, isStravaModalOpen } =
    React.useContext(EditorContext);

  const addStravaLink = () => {
    setIsStravaModalOpen(true);
    // setIsNewComponentMenuOpen(false);
    // setMobileMenu({ ...mobileMenu, isFullScreen: false, display: false });
  };
  console.log("AddStravaLink");
  return (
    <>
      {isStravaModalOpen && <StravaModal path={path} />}
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
