// PostEditor.tsx
import React, { useMemo, useCallback } from "react";
import { createEditor } from "slate";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";
import { Flex, Box, Theme, ThemeUIStyleObject } from "theme-ui";
import withLayout from "../../plugins/withLayout";
import withLinks from "../../plugins/withLinks";
import EditorContent from "./EditorContent";
import ModalManager from "./ModalManager";
import MediaUploadHandler from "./MediaUploadHandler";

const PostEditor = ({ initialState }) => {
  const editor = useMemo(
    () => withLayout(withHistory(withLinks(withReact(createEditor())))),
    []
  );

  const updateMenuPosition = useCallback(() => {
    // Your logic for updating menu position
  }, [editor]);

  return (
    <Flex>
      <Box
        sx={
          {
            minWidth: "100%",
            margin: "0 auto 50px auto",
            width: "100%",
            backgroundColor: "background",
            borderRadius: "10px",
            padding: "0px",
            position: "relative",
          } as ThemeUIStyleObject<Theme>
        }
      >
        <EditorContent
          editor={editor}
          initialState={initialState}
          updateMenuPosition={updateMenuPosition}
        />

        <ModalManager />

        <MediaUploadHandler />
      </Box>
    </Flex>
  );
};

export default PostEditor;
