import { Box } from "theme-ui";
import React from "react";

interface BlackBoxProps {
  children: JSX.Element;
  opacity?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  zIndex?: number;
  fullScreen?: boolean;
  noModal?: boolean;
  noBackground?: boolean;
}

const BlackBox: React.FC<BlackBoxProps> = ({
  children,
  opacity = ".7",
  onClick,
  zIndex = 30,
  fullScreen = false,
  noModal = false,
  noBackground = false,
}) => {
  const justifyContent = !noModal || fullScreen ? "center" : "unset";
  const alignItems = !noModal || fullScreen ? "center" : "unset";
  const backgroundColor = noBackground
    ? "unset"
    : fullScreen
    ? "background"
    : `rgba(var(--theme-ui-colors-blackBoxColor), ${opacity})`;

  return (
    <Box
      role="presentation"
      className="blackbox"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100dvh",
        width: "100%",
        backgroundColor,
        zIndex,
        display: "flex",
        justifyContent,
        alignItems,
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

export default BlackBox;
