import React from "react";
import { ThemeUIStyleObject, Theme, Box } from "theme-ui";
import PlusIcon from "./icons/PlusIcon";
import { lighten } from "@theme-ui/color";

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
      contentEditable={false}
    >
      <PlusIcon
        onClick={onClick}
        sx={{ color: lighten("accent", 0.2), "&:hover": { color: "accent" } }}
      />
    </Box>
  );
};

export default HoverIcon;
