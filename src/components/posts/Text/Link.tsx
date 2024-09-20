import React from "react";
import { useSlateStatic } from "slate-react";

import { Box, IconButton, Link as ThemeLink } from "theme-ui";
import { removeLink } from "../../../utils/link";
import { LinkType } from "../../../types/common";
import useClickOutside from "../../../hooks/useClickOutside";
import DeleteIcon from "../../icons/DeleteIcon";
import LinkBase from "./LinkBase";

const Link = ({ element, children }: { element: LinkType; children?: any }) => {
  const editor = useSlateStatic();
  const wrapperRef = React.useRef();
  const [isHover, setIsHover] = React.useState(false);

  useClickOutside(
    wrapperRef,
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setIsHover(false);
      e.stopPropagation();
    }
  );

  return (
    <Box ref={wrapperRef} sx={{ display: "inline", position: "relative" }}>
      <LinkBase element={element} onMouseDown={() => setIsHover(true)}>
        {children}
      </LinkBase>
      {isHover && (
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
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "border",
            width: "fit-content",
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.2)",
            zIndex: "1",
            animation: "fadeIn .5s;",
          }}
          contentEditable={false}
        >
          <a href={element.href} target="_blank">
            {element.href}
          </a>
          <IconButton
            onClick={() => removeLink(editor)}
            sx={{ width: "24px", height: "24px", cursor: "pointer" }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default Link;
