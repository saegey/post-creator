import { Transforms, Editor, Element as SlateElement } from "slate";
import { Box } from "theme-ui";

import { isBlockActive } from "../../../../../utils/SlateUtilityFunctions";
import { CustomEditor } from "../../../../../types/common";
import BulletListIcon from "../../../../icons/BulletListIcon";
import { lighten } from "@theme-ui/color";
import { useSlateContext } from "../../../../SlateContext";

const BulletListButton = () => {
  const { editor } = useSlateContext();
  if (!editor) {
    throw new Error("Editor is not defined");
  }

  return (
    <Box
      onMouseDown={(e) => {
        e.preventDefault();

        const isActive = isBlockActive(editor, "bulleted-list");
        Transforms.unwrapNodes(editor, {
          match: (n: any) =>
            !Editor.isEditor(n) &&
            n.type === "bulleted-list" &&
            SlateElement.isElement(n),

          split: true,
        });
        Transforms.setNodes<SlateElement>(editor, {
          type: isActive ? "paragraph" : "list-item",
        } as any);

        if (!isActive) {
          Transforms.wrapNodes(editor, { type: "bulleted-list", children: [] });
        }
      }}
      variant="boxes.floatingMenu"
      key="bulletedlist"
      title={"Toggle bullet list"}
    >
      <BulletListIcon
        sx={{
          color: isBlockActive(editor, "bulleted-list")
            ? "accent"
            : lighten("primary", 0.3),
          width: "24px",
          cursor: "pointer",
        }}
      />
    </Box>
  );
};

export default BulletListButton;
