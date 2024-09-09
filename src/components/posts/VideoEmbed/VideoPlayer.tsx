import React from "react";
import { AspectRatio, Box, Flex, Heading } from "theme-ui";
import MuxPlayer from "@mux/mux-player-react";
import { useThemeUI } from "theme-ui";

import { VideoEmbedType } from "../../../types/common";
import HoverAction from "../Editor/HoverAction";
import useOptionsMenu from "../../../hooks/useSlateOptionsMenu";
import { ReactEditor, useSlateStatic } from "slate-react";

const VideoPlayer = ({ element }: { element: VideoEmbedType }) => {
  const { theme } = useThemeUI();
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const { optionsMenu } = useOptionsMenu(editor, path);

  const videoPlayer = React.useMemo(() => {
    console.log("element", element);
    return (
      <HoverAction element={element}>
        <Box contentEditable={false}>
          <Box>
            {!element.isReady && (
              <AspectRatio
                ratio={16 / 9}
                sx={{
                  p: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "background",
                  bg: "primary",
                }}
              >
                <h1>Processing Video</h1>
              </AspectRatio>
            )}
            {element.isReady && (
              <AspectRatio
                ratio={16 / 9}
                sx={{
                  // p: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "background",
                  bg: "primary",
                }}
              >
                <MuxPlayer
                  // style={}
                  playbackId={element.playbackId}
                  metadata={{
                    video_id: "video-id-123456",
                    video_title: "Bick Buck Bunny",
                    viewer_user_id: "user-id-bc-789",
                  }}
                  accentColor={theme?.colors?.accent as string}
                  streamType="on-demand"
                  style={{
                    width: "100%", // Make sure the player fills the available width
                    height: "100%", // Make sure the player fills the available height
                    objectFit: "cover", // Ensure the video scales without distortion
                  }}
                />
              </AspectRatio>
            )}
            {optionsMenu}
          </Box>
        </Box>
      </HoverAction>
    );
  }, [element]);
  return videoPlayer;
};
export default VideoPlayer;
