import React from "react";
import { Path, Transforms } from "slate";
import AddComponentButton from "./AddComponentButton";
import { Box, IconButton, Text } from "theme-ui";
import { CustomEditor } from "../../../types/common";
import { EditorContext } from "./EditorContext";
import GenericMenuItem from "../../GenericMenuItem";
import { useSlateContext } from "../../SlateContext";

const AddText = () => {
  const { menuPosition } = React.useContext(EditorContext);
  const { editor } = useSlateContext();

  const insertTextNode = (editor: CustomEditor, path: Path) => {
    Transforms.insertNodes(
      editor,
      { type: "paragraph", children: [{ text: "" }] },
      { at: path }
    );

    if (path.length > 2) {
      Transforms.liftNodes(editor);
    }
  };

  if (!editor) {
    return <></>;
  }

  return (
    <Box
      onClick={() => insertTextNode(editor, menuPosition.path)}
      sx={{
        cursor: "pointer",
      }}
      variant="boxes.sidebarMenuItem"
    >
      <GenericMenuItem
        label="Text"
        icon={
          <IconButton sx={{ width: "32px", background: "yellow" }}>
            <Text
              sx={{ fontFamily: "serif", fontSize: "20px", color: "iconColor" }}
            >
              T
            </Text>
          </IconButton>
        }
      />
    </Box>
  );
};

export default AddText;
