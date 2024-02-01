import React from "react";
import { AspectRatio, Box, Flex, Heading } from "theme-ui";
import MuxPlayer from "@mux/mux-player-react";
import { useThemeUI } from "theme-ui";

import { VideoEmbedType } from "../../../types/common";
import HoverAction from "../Editor/HoverAction";

const VideoPlayer = ({ element }: { element: VideoEmbedType }) => {
  const { theme } = useThemeUI();

  const videoPlayer = React.useMemo(() => {
    return (
      <HoverAction>
        <Flex sx={{ width: "100%", justifyContent: "center" }}>
          <Box>
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
                // style={}
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
      </HoverAction>
    );
  }, [element]);
  return videoPlayer;
};
export default VideoPlayer;
