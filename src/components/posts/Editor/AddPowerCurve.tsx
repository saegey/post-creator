import { Path, Transforms } from "slate";
import React, { useContext } from "react";
import { Box } from "theme-ui";

import PowerGraphIcon from "../../icons/PowerGraphIcon";
import { PostContext } from "../../PostContext";
import { CustomEditor } from "../../../types/common";
import { EditorContext } from "./EditorContext";
import GenericMenuItem from "../../GenericMenuItem";
import { useSlateContext } from "../../SlateContext";
import Tooltip from "../../shared/Tooltip";

const AddPowerCurve = () => {
  const { gpxFile } = useContext(PostContext);
  const { menuPosition, setIsNewComponentMenuOpen } = useContext(EditorContext);
  const { path } = menuPosition;
  const { editor } = useSlateContext();

  const insertPowerGraphNode = (
    editor: CustomEditor | undefined,
    path: Path
  ) => {
    if (editor) {
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
        setIsNewComponentMenuOpen(false);
      }}
      variant="boxes.sidebarMenuItem"
      sx={{
        cursor: "pointer",
      }}
    >
      <GenericMenuItem
        icon={<PowerGraphIcon sx={{ padding: "3px" }} />}
        label="Graph"
      />
    </Box>
  );
};

export default AddPowerCurve;
