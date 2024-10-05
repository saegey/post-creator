import React from "react";
import { AspectRatio, Box } from "theme-ui";
import MuxPlayer from "@mux/mux-player-react";
import { useThemeUI } from "theme-ui";

import { VideoEmbedType } from "../../../types/common";
import HoverAction from "../Editor/HoverAction";
import useOptionsMenu from "../../../hooks/useSlateOptionsMenu";
import { ReactEditor, useSlateStatic } from "slate-react";
import VideoEmbedBase from "./VideoEmbedBase";

const VideoPlayer = ({ element }: { element: VideoEmbedType }) => {
  const { theme } = useThemeUI();
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  const { optionsMenu } = useOptionsMenu(editor, path);

  const videoPlayer = React.useMemo(() => {
    return (
      <HoverAction element={element}>
        <>
          {element.isReady ? (
            <VideoEmbedBase
              element={element}
              accentColor={theme?.colors?.accent as string}
            />
          ) : (
            <AspectRatio
              contentEditable={false}
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
          {optionsMenu}
        </>
      </HoverAction>
    );
  }, [element]);
  return videoPlayer;
};
export default VideoPlayer;
