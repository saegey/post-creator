import React from "react";
import { Box, Flex, IconButton, Spinner, Text } from "theme-ui";
import { EditorContext } from "../../posts/Editor/EditorContext";
import CloudCheck from "../../icons/CloudCheck";
import RefreshIcon from "../../icons/RefreshIcon";

const SettingsSection = () => {
  const { isSavingPost, savingStatus } = React.useContext(EditorContext);

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
          {/* <Spinner /> */}
        </Flex>
      ) : (
        <IconButton sx={{ color: "success" }}>
          <CloudCheck />
        </IconButton>
      )}
    </>
  );
};

export default SettingsSection;
