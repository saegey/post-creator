import React from "react";
import { Box } from "theme-ui";
import { useThemeUI } from "theme-ui";

import { VideoEmbedType } from "../../../types/common";
import VideoEmbedBase from "./VideoEmbedBase";

const VideoView = ({ element }: { element: VideoEmbedType }) => {
  const { theme } = useThemeUI();

  const videoPlayer = React.useMemo(() => {
    return (
      <Box
        sx={{
          position: "relative",
          width: ["100%", "690px", "690px"],
          marginX: "auto",
          marginY: "20px",
        }}
      >
        <VideoEmbedBase
          element={element}
          accentColor={theme?.colors?.accent as string}
        />
      </Box>
    );
  }, [element]);
  return videoPlayer;
};
export default VideoView;
