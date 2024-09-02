import { Box, Flex, Text } from "theme-ui";
import React from "react";
import { Path } from "slate";

import { EditorContext } from "./EditorContext";
import { CustomEditor } from "../../../types/common";
import ComponentButton from "./ComponentButton";
import { useSlateContext } from "../../SlateContext";
import GenericMenuItem from "../../GenericMenuItem";

type AddComponentButtonProps = {
  path: Path;
  label: string;
  icon?: React.ReactNode;
  insertNode?: (editor: CustomEditor, path: Path) => void;
  onClick?: () => void; // Custom click handler
  isDisabled?: boolean;
};

const AddComponentButton = ({
  path,
  label,
  icon,
  insertNode,
  onClick,
  isDisabled = false,
}: AddComponentButtonProps) => {
  const { editor } = useSlateContext();
  if (!editor) {
    return;
  }
  const { setIsNewComponentMenuOpen, setMobileMenu } =
    React.useContext(EditorContext);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    if (isDisabled) return;

    if (onClick) {
      onClick(); // Execute the custom click handler if provided
    } else if (insertNode) {
      insertNode(editor, path); // Execute the insertNode function if provided
    }

    // Close the mobile menu after an action is performed
    setMobileMenu({
      top: 0,
      left: 0,
      display: false,
      path: path,
      isFullScreen: false,
    });

    setIsNewComponentMenuOpen(false);

    // Deselect any selected text
    const selection = window.getSelection();
    selection && selection.removeAllRanges();
  };

  return (
    <Box
      onClick={handleClick}
      onMouseDown={(e) => e.preventDefault()} // Prevents the editor from losing focus
      variant="boxes.sidebarMenuItem"
      sx={{
        cursor: isDisabled ? "not-allowed" : "pointer",
      }}
    >
      <GenericMenuItem
        label={label}
        icon={icon}
        isDisabled={isDisabled}
        // onClick={handleClick}
      />
      {/* <ComponentButton label={label} icon={icon} /> */}
    </Box>
  );
};

export default AddComponentButton;
