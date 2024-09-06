import React from "react";
import { Box } from "theme-ui";
import { EditorContext } from "../../posts/Editor/EditorContext";

const SettingsSection = () => {
  const { isSavingPost, savingStatus } = React.useContext(EditorContext);

  return (
    <>
      <pre>{isSavingPost}</pre>
      {isSavingPost && (
        <Box>
          <p>{savingStatus}</p>
        </Box>
      )}
    </>
  );
};

export default SettingsSection;
