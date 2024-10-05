import { Box, Flex } from "theme-ui";
import React from "react";
import { BaseSelection } from "slate";
import { lighten } from "@theme-ui/color";

import BoldButton from "./PostMenu/buttons/BoldButton";
import HeadingButton from "./PostMenu/buttons/HeadingButton";
import BulletListButton from "./PostMenu/buttons/BulletListButton";
import LinkButton from "./PostMenu/buttons/LinkButton";
import { useSlateContext } from "../../SlateContext";
import LinkIcon from "../../icons/LinkIcon";
import { SelectionMenu } from "../../../hooks/useSelectionChangeHandler";

const FloatingMenu = ({
  selectionMenu,
  setSelectionMenu,
}: {
  selectionMenu: SelectionMenu;
  setSelectionMenu: React.Dispatch<React.SetStateAction<SelectionMenu | null>>;
}) => {
  const { editor } = useSlateContext();
  const linkInputRef = React.useRef<HTMLDivElement>(null);
  const [showPopup, setShowPopup] = React.useState<boolean>(false);
  const [_, setSelection] = React.useState<BaseSelection>();

  if (!editor) {
    throw new Error("Editor is not defined");
  }

  const toggleLink = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setSelection(editor.selection);
    setShowPopup((prev) => !prev);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: `${selectionMenu.top - 50}px`,
        left: `${selectionMenu.left - 5}px`,
        width: "fit-content",
        justifyItems: "center",
        background: lighten("surface", 0.05),
        padding: "3px",
        zIndex: "300",
        borderRadius: "5px",
        borderColor: "border",
        boxShadow: "0 3px 8px rgba(0, 0, 0, 0.3)",
        animation: "fadeIn .2s;",
      }}
    >
      <Flex sx={{ gap: "5px", padding: "2px" }}>
        {!showPopup && (
          <>
            <BoldButton />
            <HeadingButton />
            <BulletListButton />
            <Box
              ref={linkInputRef}
              variant="boxes.floatingMenu"
              onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                toggleLink(e)
              }
            >
              <LinkIcon
                sx={{ color: lighten("primary", 0.3), cursor: "pointer" }}
              />
            </Box>
          </>
        )}
        {showPopup && <LinkButton setSelectionMenu={setSelectionMenu} />}
      </Flex>
    </Box>
  );
};

export default FloatingMenu;
