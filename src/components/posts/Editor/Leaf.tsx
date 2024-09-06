import { RenderLeafProps } from "slate-react";
import React from "react";
import { Box } from "theme-ui";

const Leaf = ({
  props,
  updateMenuPosition,
}: {
  props: RenderLeafProps;
  // children?: JSX.Element;
  updateMenuPosition: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  // console.log("Leaf");
  return (
    <Box
      as="span"
      {...props.attributes}
      onMouseUp={updateMenuPosition}
      sx={{ fontWeight: props.leaf.bold ? "bold" : "" }}
    >
      {props.children}
    </Box>
  );
};

export default Leaf;
