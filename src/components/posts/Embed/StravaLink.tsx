import { Box, Flex, Embed } from "theme-ui";
import React from "react";

import { StravaEmbed } from "../../../types/common";

const StravaLink = ({ element }: { element: StravaEmbed }) => {
  if (!element.activityId) {
    return <></>;
  }

  return (
    <Flex contentEditable={false}>
      <Box
        sx={{
          marginX: "auto",
          width: ["100%", null, null],
          maxWidth: "450px",
          marginY: ["20px", "30px", "60px"],
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
    </Flex>
  );
};

export default StravaLink;
