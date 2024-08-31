import React from "react";
import { Path, Transforms } from "slate";
import { useContext } from "react";

import PowerGraphIcon from "../../icons/PowerGraphIcon";
import { PostContext } from "../../PostContext";
import AddComponentButton from "./AddComponentButton";
import { CustomEditor } from "../../../types/common";

const AddPowerCurve = ({ path }: { path: Path }) => {
  const { gpxFile } = useContext(PostContext);

  const insertPowerGraphNode = (editor: CustomEditor, path: Path) => {
    if (gpxFile) {
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

  return (
    <AddComponentButton
      path={path}
      label="Power Curve"
      icon={<PowerGraphIcon />}
      insertNode={insertPowerGraphNode}
      isDisabled={!gpxFile}
    />
  );
};

export default AddPowerCurve;
