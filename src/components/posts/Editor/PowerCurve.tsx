import { Flex, Text, Box } from "theme-ui";
import React from "react";
import { Path, Transforms } from "slate";

import PowerGraphIcon from "../../icons/PowerGraphIcon";
import { PostContext } from "../../PostContext";
import { useSlateStatic } from "slate-react";
import { EditorContext } from "./EditorContext";

const AddPowerCurve = ({ path }: { path: Path }) => {
  const { gpxFile } = React.useContext(PostContext);
  const { setIsNewComponentMenuOpen, setMobileMenu, mobileMenu } =
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
        { at: path }
      );

      setIsNewComponentMenuOpen(false);
      setMobileMenu({ ...mobileMenu, isFullScreen: false, display: false });
    }
  };
  return (
    <Box
      onClick={(event) => {
        // event.preventDefault();
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
            width: "16px",
            height: "auto",
          }}
        >
          <PowerGraphIcon />
        </Box>
        <Text
          as="span"
          sx={{
            fontSize: "14px",
          }}
        >
          Power Curve
        </Text>
      </Flex>
    </Box>
  );
};

export default AddPowerCurve;
