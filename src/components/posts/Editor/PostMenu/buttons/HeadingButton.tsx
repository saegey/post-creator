import { Box } from "theme-ui";
import { Transforms, Editor, Element as SlateElement } from "slate";

import { isBlockActive } from "../../../../../utils/SlateUtilityFunctions";
import HeadingIcon from "../../../../icons/HeadingIcon";
import { lighten } from "@theme-ui/color";
import { useSlateContext } from "../../../../SlateContext";

const HeadingButton = () => {
  const { editor } = useSlateContext();

  if (!editor) {
    throw new Error("Editor is not defined");
  }

  const { selection } = editor;
  return (
    <Box
      onMouseDown={(e) => {
        e.preventDefault();
        if (!selection) return false;

        const [match] = Array.from(
          Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n["type"] === "heading",
          })
        );

        if (match) {
          let newProperties: Partial<SlateElement>;
          newProperties = { type: "paragraph" } as any;
          Transforms.setNodes<SlateElement>(editor, newProperties);
        } else {
          let newProperties: Partial<SlateElement>;
          newProperties = { type: "heading" } as any;
          Transforms.setNodes<SlateElement>(editor, newProperties);
        }
      }}
      variant="boxes.floatingMenu"
      key="heading"
    >
      <HeadingIcon
        sx={{
          color: isBlockActive(editor, "heading")
            ? "accent"
            : lighten("primary", 0.3),
        }}
      />
    </Box>
  );
};

export default HeadingButton;
