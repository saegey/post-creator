import React from "react";
import { Flex, IconButton, Text } from "theme-ui";

import { EditorContext } from "../../posts/Editor/EditorContext";
import CloudCheck from "../../icons/CloudCheck";
import RefreshIcon from "../../icons/RefreshIcon";
import RocketIcon from "../../icons/RocketIcon";
import Button from "../Button";

const SettingsSection = () => {
  const { isSavingPost, savingStatus, setIsPublishedConfirmationOpen } =
    React.useContext(EditorContext);

  return (
    <>
      <pre>{isSavingPost}</pre>
      {isSavingPost ? (
        <Flex sx={{ alignItems: "center", gap: "5px" }}>
          <IconButton
            sx={{
              width: "24px",
              animation: "pulse 1.5s ease-in-out infinite",
              "@keyframes pulse": {
                "0%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.2)" },
                "100%": { transform: "scale(1)" },
              },
            }}
          >
            <RefreshIcon />
          </IconButton>
          <Text>{savingStatus}</Text>
        </Flex>
      ) : (
        <IconButton sx={{ color: "success" }}>
          <CloudCheck />
        </IconButton>
      )}
      <Button
        onClick={async () => {
          setIsPublishedConfirmationOpen(true);
        }}
        icon={RocketIcon}
        sx={{
          cursor: "pointer",
          paddingX: ["10px", "3px", "12px"],
          paddingY: ["3px", "3px", "6px"],
        }}
      >
        Share
      </Button>
    </>
  );
};

export default SettingsSection;
