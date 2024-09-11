import { Box, Flex } from "theme-ui";
import React from "react";
import { Transforms, Editor } from "slate";

import BoldButton from "./PostMenu/buttons/BoldButton";
import HeadingButton from "./PostMenu/buttons/HeadingButton";
import BulletListButton from "./PostMenu/buttons/BulletListButton";
import LinkButton from "./PostMenu/buttons/LinkButton";
import { useSlateContext } from "../../SlateContext";
import usePopup from "../../usePopup";
import LinkIcon from "../../icons/LinkIcon";
import { BaseSelection } from "slate";

const FloatingMenu = ({ top, left }: { top: number; left: number }) => {
  const { editor } = useSlateContext();

  const linkInputRef = React.useRef<HTMLDivElement>(null);

  // const { showPopup, setShowPopup } = usePopup(linkInputRef);
  const [showPopup, setShowPopup] = React.useState<boolean>(false);
  const [selection, setSelection] = React.useState<BaseSelection | null>(null);

  if (!editor) {
    return <></>;
  }

  const toggleLink = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    // Save the current editor selection
    if (editor.selection) {
      setSelection(editor.selection);
    }

    setShowPopup((prev) => !prev);
  };

  const handleLinkInsert = () => {
    // Restore the selection before applying any operations in the editor
    if (selection) {
      Transforms.select(editor, selection);
    }

    // Insert the link or do something else...
    // You can reset the selection after this if needed

    setShowPopup(false);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: `${top - 50}px`,
        left: `${left - 5}px`,
        width: "fit-content",
        justifyItems: "center",
        background: "primary",
        padding: "8px",
        zIndex: "300",
        borderRadius: "5px",
        boxShadow: "0 3px 8px rgba(0, 0, 0, 0.3)",
        animation: "fadeIn .2s;",
      }}
    >
      <Flex sx={{ gap: "5px" }}>
        {!showPopup && (
          <>
            <BoldButton editor={editor} />
            <HeadingButton editor={editor} />
            <BulletListButton editor={editor} />
            <Box
              ref={linkInputRef}
              variant="boxes.floatingMenu"
              onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                toggleLink(e)
              }
            >
              <LinkIcon sx={{ color: "secondary" }} />
            </Box>
          </>
        )}

        {showPopup && (
          <LinkButton
            onSubmit={handleLinkInsert} // Call this when the link is submitted
          />
        )}
      </Flex>
    </Box>
  );
};

export default FloatingMenu;
