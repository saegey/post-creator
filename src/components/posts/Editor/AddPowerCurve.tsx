import { Path, Transforms } from "slate";
import React, { useContext } from "react";
import { Box } from "theme-ui";

import PowerGraphIcon from "../../icons/PowerGraphIcon";
import { CustomEditor } from "../../../types/common";
import { EditorContext } from "./EditorContext";
import GenericMenuItem from "../../GenericMenuItem";
import { useSlateContext } from "../../SlateContext";

const AddPowerCurve = () => {
  const { menuPosition, setIsNewComponentMenuOpen, setMobileMenu } =
    useContext(EditorContext);
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

      if (path.length > 1) {
        Transforms.liftNodes(editor);
      }

      setMobileMenu({
        top: 0,
        left: 0,
        display: false,
        path: path,
        isFullScreen: false,
      });
    }
  };
  if (!editor) {
    throw new Error("Editor is not defined");
  }

  return (
    <Box
      onClick={(e) => {
        e.stopPropagation;
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
