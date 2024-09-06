import { Box } from "theme-ui";
import { Transforms, Editor, Element as SlateElement } from "slate";

import { isBlockActive } from "../../../../../utils/SlateUtilityFunctions";
import { CustomEditor } from "../../../../../types/common";
import HeadingIcon from "../../../../icons/HeadingIcon";

const HeadingButton = ({ editor }: { editor: CustomEditor }) => {
  const { selection } = editor;
  return (
    <Box
      onMouseDown={(e) => {
        e.preventDefault();
        console.log(selection);
        if (!selection) return false;

        const [match] = Array.from(
          Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n["type"] === "heading-two",
          })
        );

        if (match) {
          let newProperties: Partial<SlateElement>;
          newProperties = { type: "paragraph" } as any;
          Transforms.setNodes<SlateElement>(editor, newProperties);
        } else {
          let newProperties: Partial<SlateElement>;
          newProperties = { type: "heading-two" } as any;
          Transforms.setNodes<SlateElement>(editor, newProperties);
        }
      }}
      sx={{
        marginX: ["5px", 0, 0],
        marginBottom: ["5px", 0, 0],
        verticalAlign: "top",
      }}
      key="headingtwo"
    >
      <HeadingIcon
        sx={{
          color: isBlockActive(editor, "heading-two") ? "accent" : "secondary",
        }}
      />
    </Box>
  );
};

export default HeadingButton;
