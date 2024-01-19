import { MouseEventHandler } from "react";
import { Text } from "theme-ui";

const HoverIcon = ({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <Text
      sx={{

        position: "absolute",
        top: `0px`,
        left: `-35px`,
        cursor: "pointer",
        border: "1px solid #e1e1e1",
        paddingY: "3px",
        paddingX: "4px",
        borderRadius: "3px",
      }}
      onClick={onClick}
      contentEditable={false}
    >
      +
    </Text>
  );
};

export default HoverIcon;
