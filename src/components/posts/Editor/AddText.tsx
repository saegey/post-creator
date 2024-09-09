import React from "react";
import { Editor, Path, Transforms } from "slate";
import AddComponentButton from "./AddComponentButton";
import { Box, IconButton, Text } from "theme-ui";
import { CustomEditor } from "../../../types/common";
import { EditorContext } from "./EditorContext";
import GenericMenuItem from "../../GenericMenuItem";
import { useSlateContext } from "../../SlateContext";
import { ReactEditor } from "slate-react";

const AddText = () => {
  const { menuPosition, setIsNewComponentMenuOpen } =
    React.useContext(EditorContext);
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

    // Get the point (cursor position) at the end of the inserted node
    // console.log(menuPosition.path);
    const newPoint = Editor.end(editor, Editor.path(editor, menuPosition.path));

    console.log(newPoint);
    ReactEditor.focus(editor);

    // Move the selection (cursor) to the new point
    if (newPoint) {
      console.log("selecting new point");
      Transforms.select(editor, newPoint);
    }

    setTimeout(() => {
      ReactEditor.focus(editor);
    }, 0);
  };

  if (!editor) {
    return <></>;
  }

  return (
    <Box
      onClick={() => {
        insertTextNode(editor, menuPosition.path);
        setIsNewComponentMenuOpen(false);
      }}
      sx={{
        cursor: "pointer",
      }}
      variant="boxes.sidebarMenuItem"
    >
      <GenericMenuItem
        label="Text"
        icon={
          <IconButton sx={{ width: "32px" }}>
            <Text sx={{ fontFamily: "serif", fontSize: "20px", color: "text" }}>
              T
            </Text>
          </IconButton>
        }
      />
    </Box>
  );
};

export default AddText;
