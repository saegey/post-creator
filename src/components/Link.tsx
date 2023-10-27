import React from "react";
import { useFocused, useSelected, useSlateStatic } from "slate-react";

import { Box, Close, Link as ThemeLink } from "theme-ui";
import { removeLink } from "../utils/link";
import { LinkType } from "../types/common";

const Link = ({
  // attributes,
  element,
  children,
}: {
  // attributes: any;
  element: LinkType;
  children?: any;
}) => {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();

  return (
    <Box sx={{ display: "inline", position: "relative" }}>
      <ThemeLink
        sx={{ textDecorationColor: "text", color: "text", cursor: "pointer" }}
        href={element.href}
        // {...attributes}
        // {...element.attr}
        target={element.target}
      >
        {children}
      </ThemeLink>
      {selected && focused && (
        <Box
          sx={{
            position: "absolute",
            left: 0,
            display: "flex",
            alignItems: "center",
            backgroundColor: "background",
            padding: "6px 10px",
            gap: "10px",
            borderRadius: "5px",
            border: "1px solid lightgray",
            width: "fit-content",
            zIndex: "1",
          }}
          contentEditable={false}
        >
          <a href={element.href} target={element.target}>
            {element.href}
          </a>
          <Close onClick={() => removeLink(editor)} />
        </Box>
      )}
    </Box>
  );
};

export default Link;
