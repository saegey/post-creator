import { MouseEventHandler } from "react";
import { Text, ThemeUIStyleObject, Theme } from "theme-ui";

const HoverIcon = ({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <Text
      className="hoverIcon"
      sx={
        {
          position: "absolute",
          top: `0px`,
          left: `-35px`,
          cursor: "pointer",
          border: "1px solid #e1e1e1",
          paddingY: "3px",
          paddingX: "4px",
          borderRadius: "3px",
        } as ThemeUIStyleObject<Theme>
      }
      onClick={onClick}
      contentEditable={false}
    >
      +
    </Text>
  );
};

export default HoverIcon;
