import { Box, Flex, Embed } from "theme-ui";
import React from "react";
import { Transforms } from "slate";
import { useSlateStatic, ReactEditor } from "slate-react";

import { StravaEmbed } from "../../../types/common";
import HoverAction from "../Editor/HoverAction";
import OptionsMenu from "../Editor/OptionsMenu";

const StravaLink = ({ element }: { element: StravaEmbed }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  if (!element.activityId) {
    return <></>;
  }

  return (
    <HoverAction>
      <Flex
        contentEditable={false}
        variant="boxes.componentCard"
        key="strava-link"
      >
        <Box
          sx={{
            marginX: "auto",
            width: ["100%", "100%", "100%"],
            maxWidth: "450px",
            marginY: ["20px", "30px", "20px"],
          }}
        >
          <Embed
            src={`https://strava-embeds.com/activity/${element.activityId}`}
            sx={{
              height: "620px",
              width: "100%",
              border: "none",
            }}
          />
        </Box>
        <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
          <OptionsMenu>
            <Box
              onClick={() => {
                Transforms.removeNodes(editor, { at: path });
              }}
              variant="boxes.dropdownMenuItem"
            >
              Remove
            </Box>
          </OptionsMenu>
        </Box>
      </Flex>
    </HoverAction>
  );
};

export default StravaLink;
