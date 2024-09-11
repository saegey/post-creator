import React from "react";
import { Box, Input, IconButton, Flex } from "theme-ui";
import { BaseSelection, Transforms } from "slate";
import { darken } from "@theme-ui/color";

import { insertLink } from "../../../../../utils/link";
import { useSlateContext } from "../../../../SlateContext";
import AddIcon from "../../../../icons/AddIcon";
import { SelectionMenu } from "../../../../../hooks/useSelectionChangeHandler";

const LinkButton = ({
  setSelectionMenu,
}: {
  setSelectionMenu: React.Dispatch<React.SetStateAction<SelectionMenu | null>>;
}) => {
  const [url, setUrl] = React.useState("");
  const { editor } = useSlateContext();
  const [showInNewTab, setShowInNewTab] = React.useState(false);
  const [selection, setSelection] = React.useState<BaseSelection | null>(null);

  if (!editor) {
    throw new Error("Editor is not defined");
  }

  // Store the selection when the component is first rendered
  React.useEffect(() => {
    if (editor.selection) {
      setSelection(editor.selection);
    }
  }, [editor.selection]);

  const handleInsertLink = () => {
    if (!selection) {
      return;
    }
    // Restore the selection before inserting the link
    Transforms.select(editor, selection);
    insertLink(editor, { url, showInNewTab });
    setUrl("");
    setShowInNewTab(false);

    setSelectionMenu(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "checkbox") {
      setShowInNewTab((prev) => !prev);
    } else {
      setUrl(e.target.value);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "4px",
        margin: "5px 2px",
        justifyItems: "center",
      }}
    >
      <Input
        id="url"
        name="url"
        value={url}
        placeholder="Enter link url"
        variant={"defaultInput"}
        sx={{ padding: "6px" }}
        onChange={(e) => handleInputChange(e)}
        // Store the selection again when the input is focused, to ensure it's not lost
        onFocus={() => {
          if (editor.selection) {
            setSelection(editor.selection);
          }
        }}
      />
      <Flex onClick={() => handleInsertLink()} sx={{ alignItems: "center" }}>
        <IconButton
          sx={{
            color: "primary",
            cursor: "pointer",
            "&:hover": { backgroundColor: darken("surface", 0.1) },
          }}
        >
          <AddIcon />
        </IconButton>
      </Flex>
    </Box>
  );
};

export default LinkButton;
