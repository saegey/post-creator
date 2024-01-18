// src/components/Leaf.js
import React from "react";

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.pressSlash) {
    return (
      <span {...attributes} style={{ fontWeight: "bold" }}>
        {children}
      </span>
    );
  }
  return <span {...attributes}>{children}</span>;
};

export default Leaf;
