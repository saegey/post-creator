import React from "react";
import { Path, Transforms } from "slate";
import AddComponentButton from "./AddComponentButton";
import { Text } from "theme-ui";
import { CustomEditor } from "../../../types/common";
import { EditorContext } from "./EditorContext";

const AddText = () => {
  const { menuPosition } = React.useContext(EditorContext);

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

  return (
    <AddComponentButton
      path={menuPosition.path}
      label="Text"
      icon={<Text sx={{ fontFamily: "serif", fontSize: "20px" }}>T</Text>}
      insertNode={insertTextNode}
    />
  );
};

export default AddText;
