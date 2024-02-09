import { Box, Flex, Text } from "theme-ui";
import React from "react";
import { Path, Transforms } from "slate";
import { useSlateStatic } from "slate-react";

import { EditorContext } from "./EditorContext";

const AddText = ({ path }: { path: Path }) => {
  const editor = useSlateStatic();
  const { setIsNewComponentMenuOpen, menuPosition } =
    React.useContext(EditorContext);

  const addItem = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    setIsNewComponentMenuOpen(false);
		console.log

    Transforms.insertNodes(
      editor,
      { type: "paragraph", children: [{ text: "" }] },
      { at: path }
    );

    // Move the cursor (caret) to the end of the newly inserted paragraph

    const newPath = menuPosition.path.concat(0);

    Transforms.select(editor, {
      anchor: { path: newPath, offset: 0 },
      focus: { path: newPath, offset: 0 },
    });
  };

  return (
    <Box
      onClick={(event) => addItem(event)}
      onMouseDown={(e) => e.preventDefault()}
      variant="boxes.sidebarMenuItem"
    >
      <Flex sx={{ alignItems: "center", gap: "20px" }}>
        <Box
          sx={{
            width: "16px",
            height: "16px",
          }}
        >
          <Text sx={{ fontFamily: "serif", fontSize: "20px" }}>T</Text>
        </Box>
        <Text
          as="span"
          sx={{
            color: "text",
            fontSize: "14px",
          }}
        >
          Text
        </Text>
      </Flex>
    </Box>
  );
};

export default AddText;
