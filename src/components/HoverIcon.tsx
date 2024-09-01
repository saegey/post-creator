import React from "react";
import { ThemeUIStyleObject, Theme, Box } from "theme-ui";
import PlusIcon from "./icons/PlusIcon";

const HoverIcon = ({
  onClick,
}: {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <Box
      className="hoverIcon"
      sx={
        {
          position: "absolute",
          top: `-2px`,
          left: `-40px`,
          cursor: "pointer",
        } as ThemeUIStyleObject<Theme>
      }
      // onClick={onClick}
      contentEditable={false}
    >
      <PlusIcon onClick={onClick} />
    </Box>
  );
};

export default HoverIcon;
