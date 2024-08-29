import React from "react";
import { Box, IconButton, ThemeUIStyleObject, Theme } from "theme-ui";
import SettingsIcon from "../../posts/Editor/PostMenu/buttons/SettingsIcon";
import { EditorContext } from "../../posts/Editor/EditorContext";
import PostSettings from "../../posts/Editor/PostSettings";

const SettingsSection = () => {
  const {
    setIsSettingsModalOpen,
    isSavingPost,
    savingStatus,
    isSettingsModalOpen,
  } = React.useContext(EditorContext);

  return (
    <>
      {isSavingPost && (
        <Box>
          <p>{savingStatus}</p>
        </Box>
      )}
      <Box
        sx={
          {
            marginY: "auto",
            justifyContent: "center",
          } as ThemeUIStyleObject<Theme>
        }
        onClick={() => {
          setIsSettingsModalOpen(true);
        }}
      >
        <IconButton
          aria-label="Open settings"
          variant="iconButton"
          type="button"
          id="settings-button"
        >
          <SettingsIcon />
        </IconButton>
      </Box>
      {isSettingsModalOpen && <PostSettings />}
    </>
  );
};

export default SettingsSection;
