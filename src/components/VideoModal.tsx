import React from "react";

import { Box, ThemeUIStyleObject, Theme, useThemeUI } from "theme-ui";
import BlackBox from "./layout/BlackBox";
import MuxPlayer from "@mux/mux-player-react";

const VideoModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { theme } = useThemeUI();

  if (!isOpen) {
    return <></>;
  }

  return (
    <BlackBox
      opacity={0.7}
      onClick={() => {
        setIsOpen(false);
        // if (onClose) {
        //   onClose();
        // }
      }}
      zIndex={50}
      fullScreen={true}
    >
      <Box
        sx={
          {
            maxWidth: ["100vw", "70vw", "70vw"],
            display: ["flex", "inherit", "inherit"],
            position: ["fixed", "inherit", "inherit"],
            flexDirection: "column",
            maxHeight: ["100dvh", "800px", "800px"],
            height: ["100dvh", "auto", "auto"],
            width: ["100%", null, null],
            margin: "auto",
            // background: "background",
            // borderRadius: [null, "5px", "5px"],
            padding: "0px",
            borderColor: "border",
            borderStyle: "solid",
            borderWidth: "1px",
            zIndex: 51,
          } as ThemeUIStyleObject<Theme>
        }
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <MuxPlayer
          // style={}
          playbackId={"TCSrBsZ01mH1suSeT1foujC6EmIGiVwwcfDLnt2Ql5aU"}
          metadata={{
            video_id: "demo-video-id-123456",
            video_title: "Public Website Demo",
            // viewer_user_id: "user-id-bc-789",
          }}
          accentColor={theme?.colors?.accent as string}
          streamType="on-demand"
          style={{
            width: "100%", // Make sure the player fills the available width
            height: "100%", // Make sure the player fills the available height
            objectFit: "cover", // Ensure the video scales without distortion
          }}
        />
      </Box>
    </BlackBox>
  );
};

export default VideoModal;
