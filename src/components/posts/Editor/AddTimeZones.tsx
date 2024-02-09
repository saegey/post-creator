import { Flex, Text, Box } from "theme-ui";
import React from "react";
import { Path, Transforms } from "slate";
import { useSlateStatic } from "slate-react";

import TimePowerZonesIcon from "../../icons/TimePowerZonesIcon";
import { PostContext } from "../../PostContext";
import { EditorContext } from "./EditorContext";

const AddTimeZones = ({ path }: { path: Path }) => {
  const { gpxFile, currentFtp } = React.useContext(PostContext);
  const { setIsNewComponentMenuOpen, menuPosition } =
    React.useContext(EditorContext);
  const editor = useSlateStatic();

  const addTimePowerZones = () => {
    if (gpxFile && currentFtp) {
      Transforms.insertNodes(
        editor,
        {
          type: "timeInZones",
          children: [{ text: "" }],
          void: true,
        },
        { at: path }
      );
      setIsNewComponentMenuOpen(false);
    }
  };

  return (
    <Box
      onClick={addTimePowerZones}
      variant="boxes.sidebarMenuItem"
      sx={{
        cursor: currentFtp ? "pointer" : "not-allowed",
      }}
    >
      <Flex sx={{ alignItems: "center", gap: "20px" }}>
        <Box
          sx={{
            width: "16px",
            height: "auto",
          }}
        >
          <TimePowerZonesIcon
            color={
              currentFtp
                ? `var(--theme-ui-colors-text)`
                : `var(--theme-ui-colors-iconButtonDisabled)`
            }
          />
        </Box>

        <Text
          as="span"
          sx={{
            color: currentFtp ? "text" : "iconButtonDisabled",
            fontSize: "14px",
          }}
        >
          Time in Zones
        </Text>
      </Flex>
    </Box>
  );
};

export default AddTimeZones;
