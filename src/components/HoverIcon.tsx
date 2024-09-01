import { MouseEventHandler } from "react";
import { Text, ThemeUIStyleObject, Theme, Box } from "theme-ui";
import PlusIcon from "./icons/PlusIcon";

const HoverIcon = ({
  onClick,
}: {
  onClick: () => MouseEventHandler<HTMLDivElement>;
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
          // border: "1px solid #e1e1e1",
          // paddingY: "3px",
          // paddingX: "4px",
          // borderRadius: "3px",
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
