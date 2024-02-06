import { Box, Flex, Text } from "theme-ui";
import React from "react";

import AddPowerCurve from "./PowerCurve";
import AddStravaLink from "./AddStravaLink";
import AddActivityOverview from "./AddActivityOverview";
import AddTimeZones from "./AddTimeZones";
import AddVideo from "./AddVideo";
import AddRaceResults from "./AddRaceResults";
import AddRWGPS from "./AddRWGPS";
import AddRouteOverview from "./AddRouteOverview";
import AddImage from "./AddImage";
import TimePowerZonesIcon from "../../icons/TimePowerZonesIcon";

import { Editor, Node, Transforms } from "slate";
import { useSlateStatic } from "slate-react";
import { EditorContext } from "./EditorContext";

const AddText = () => {
  const editor = useSlateStatic();
  const { setIsNewComponentMenuOpen, menuPosition } =
    React.useContext(EditorContext);

  const addItem = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    setIsNewComponentMenuOpen(false);

    Transforms.insertNodes(
      editor,
      { type: "paragraph", children: [{ text: "" }] },
      { at: menuPosition.path }
    );

    // Move the cursor (caret) to the end of the newly inserted paragraph
    const newOffset = editor.children[0].children[0].text.length;
    const newPath = menuPosition.path.concat(0);

    Transforms.select(editor, {
      anchor: { path: newPath, offset: newOffset },
      focus: { path: newPath, offset: newOffset },
    });

  };

  return (
    <Box
      onClick={(event) => addItem(event)}
      onMouseDown={(e) => e.preventDefault()}
      variant="boxes.sidebarMenuItem"
      // sx={{
      //   cursor: currentFtp ? "pointer" : "not-allowed",
      // }}
    >
      <Flex sx={{ alignItems: "center", gap: "20px" }}>
        <Box
          sx={{
            width: "16px",
            height: "auto",
            // marginRight: "10px",
          }}
        >
          <Text sx={{ fontFamily: "serif", fontSize: "20px" }}>T</Text>
        </Box>
        <Text
          as="span"
          sx={{
            color: "text",
            fontSize: "14px",
          }}
        >
          Text
        </Text>
      </Flex>
    </Box>
  );
};

const GraphSelectorMenu = ({ size }: { size?: "small" }) => {
  return (
    <>
      <Flex sx={{ flexDirection: "column", margin: "0px" }}>
        <AddText />
        <AddImage />
        <AddPowerCurve size={"small"} />
        <AddActivityOverview />
        <AddTimeZones />
        <AddStravaLink />
        <AddRWGPS />
        <AddRaceResults />
        <AddRouteOverview />
        <AddVideo />
      </Flex>
    </>
  );
};

export default GraphSelectorMenu;
