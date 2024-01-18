import React from "react";

import { Box } from "theme-ui";
import { useClickOutside } from "../../../utils/ux";
import GraphSelectorMenu from "./NewComponentSelectorMenu";
import { useSlate } from "slate-react";
import { Editor, Transforms } from "slate";

const ComponentMenu = () => {
  const wrapperRef = React.useRef();
  const editor = useSlate();

  useClickOutside(
    wrapperRef,
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      const { selection } = editor;

      if (!selection) {
        return;
      }

      const [currentNode, path] = Editor.node(editor, selection);

      console.log(currentNode, path);

      if (currentNode) {
        Transforms.unsetNodes(editor, "pressSlash", { at: path });
      }
    }
  );

  return (
    <Box
      ref={wrapperRef}
      contentEditable={false}
      sx={{
        display: "flex",
        position: "absolute",
        marginX: "auto",
        // marginRight: "auto",
        width: ["100%", "690px", "690px"],
        top: "0px",
        left: "0px",
        background: "transparent",
        fontSize: "19px",
        lineHeight: "30px",
        marginBottom: "10px",
        paddingX: ["10px", "0px", "0px"],
        minWidth: "180px",
        maxWidth: "calc(100vw - 24px)",
        height: "100%",
        maxHeight: "40vh",
      }}
    >
      <Box
        sx={{
          borderRadius: "5px",
          boxShadow:
            "rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px",
          paddingY: "5px",
          zIndex: "200",
          height: "fit-content",
          backgroundColor: "white",
        }}
      >
        <GraphSelectorMenu
          editor={editor}
          // callback={() => {
          //   setIsOpen(false);
          // }}
          size={"small"}
        />
      </Box>
    </Box>
  );
};

export default ComponentMenu;
