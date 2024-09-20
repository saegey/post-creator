import MuxPlayer from "@mux/mux-player-react";
import { AspectRatio, Box } from "theme-ui";

interface VideoEmbedBaseProps {
  element: {
    playbackId: string;
  };
  accentColor: string;
}

const VideoEmbedBase: React.FC<VideoEmbedBaseProps> = (props) => {
  const { element, accentColor } = props;

  return (
    <Box contentEditable={false}>
      <AspectRatio
        ratio={16 / 9}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "background",
          bg: "primary",
        }}
      >
        <MuxPlayer
          playbackId={element.playbackId}
          // TODO: Add metadata
          metadata={{
            video_id: "video-id-123456",
            video_title: "Bick Buck Bunny",
            viewer_user_id: "user-id-bc-789",
          }}
          accentColor={accentColor}
          streamType="on-demand"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AspectRatio>
    </Box>
  );
};

export default VideoEmbedBase;
