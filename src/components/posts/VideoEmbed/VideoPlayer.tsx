import React from "react";
import { AspectRatio, Box, Flex, Heading, Text } from "theme-ui";
import MuxPlayer from "@mux/mux-player-react";
import { useThemeUI } from "theme-ui";

import { VideoEmbedType } from "../../../types/common";

const VideoPlayer = ({ element }: { element: VideoEmbedType }) => {
  const { theme } = useThemeUI();

  return (
    <Flex sx={{ width: "100%", justifyContent: "center" }}>
      <Box sx={{ width: "690px", height: "auto" }}>
        {!element.isReady && (
          <AspectRatio
            ratio={16 / 9}
            sx={{
              p: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text",
            }}
            className="skeleton"
          >
            <Heading>Processing video</Heading>
          </AspectRatio>
        )}
        {element.isReady && (
          <MuxPlayer
            playbackId={element.playbackId}
            metadata={{
              video_id: "video-id-123456",
              video_title: "Bick Buck Bunny",
              viewer_user_id: "user-id-bc-789",
            }}
            accentColor={theme?.colors?.videoAccent as string}
            streamType="on-demand"
          />
        )}
      </Box>
    </Flex>
  );
};
export default VideoPlayer;
