import { RenderLeafProps } from "slate-react";
import React from "react";

const Leaf = ({
  attributes,
  children,
  updateMenuPosition,
}: {
  attributes: RenderLeafProps;
  children?: JSX.Element;
  updateMenuPosition: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  return (
    <span
      {...attributes}
      onMouseUp={updateMenuPosition}
      // style={{ fontWeight: attributes.leaf.bold ? "bold" : "" }}
    >
      {children}
    </span>
  );
};

export default Leaf;
