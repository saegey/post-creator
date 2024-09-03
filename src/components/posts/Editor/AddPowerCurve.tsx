import { Path, Transforms } from "slate";
import React, { useContext } from "react";
import { Box } from "theme-ui";

import PowerGraphIcon from "../../icons/PowerGraphIcon";
import { PostContext } from "../../PostContext";
import { CustomEditor } from "../../../types/common";
import { EditorContext } from "./EditorContext";
import GenericMenuItem from "../../GenericMenuItem";
import { useSlateContext } from "../../SlateContext";

const AddPowerCurve = () => {
  const { gpxFile } = useContext(PostContext);
  const { menuPosition } = useContext(EditorContext);
  const { path } = menuPosition;
  const { editor } = useSlateContext();

  const insertPowerGraphNode = (
    editor: CustomEditor | undefined,
    path: Path
  ) => {
    if (gpxFile && editor) {
      Transforms.insertNodes(
        editor,
        {
          type: "powergraph",
          children: [{ text: "" }],
          void: true,
        },
        { at: path }
      );

      if (path.length > 2) {
        Transforms.liftNodes(editor);
      }
    }
  };
  if (!editor) {
    return <></>;
  }

  return (
    <Box
      onClick={() => {
        insertPowerGraphNode(editor, path);
      }}
      variant="boxes.sidebarMenuItem"
      sx={{
        cursor: "pointer",
      }}
    >
      <GenericMenuItem icon={<PowerGraphIcon />} label="Power Curve" />
    </Box>
  );
};

export default AddPowerCurve;
