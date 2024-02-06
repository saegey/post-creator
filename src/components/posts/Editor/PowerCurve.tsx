import { Flex, Text, Box } from "theme-ui";
import React from "react";
import { Transforms } from "slate";

import PowerGraphIcon from "../../icons/PowerGraphIcon";
import { PostContext } from "../../PostContext";
import { useSlateStatic } from "slate-react";
import { EditorContext } from "./EditorContext";

const AddPowerCurve = ({ size }: { size?: "small" }) => {
  const { gpxFile } = React.useContext(PostContext);
  const { setIsNewComponentMenuOpen, menuPosition } =
    React.useContext(EditorContext);

  const editor = useSlateStatic();

  const addPowerCurve = () => {
    if (gpxFile) {
      Transforms.insertNodes(
        editor,
        {
          type: "powergraph",
          children: [{ text: "" }],
          void: true,
        },
        { at: menuPosition.path }
      );

      setIsNewComponentMenuOpen(false);
    }
  };
  return (
    <Box
      onClick={() => {
        if (gpxFile) {
          addPowerCurve();
        }
      }}
      variant="boxes.sidebarMenuItem"
      sx={{
        cursor: gpxFile ? "pointer" : "not-allowed",
      }}
    >
      <Flex sx={{ alignItems: "center", gap: "20px" }}>
        <Box
          sx={{
            width: size === "small" ? "16px" : "25px",
            height: "auto",
          }}
        >
          <PowerGraphIcon />
        </Box>
        <Text
          as="span"
          sx={{
            fontSize: size === "small" ? "14px" : "inherit",
          }}
        >
          Power Curve
        </Text>
      </Flex>
    </Box>
  );
};

export default AddPowerCurve;
