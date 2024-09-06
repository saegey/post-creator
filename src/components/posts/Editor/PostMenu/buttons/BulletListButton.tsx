import { Transforms, Editor, Element as SlateElement } from "slate";
import { Box } from "theme-ui";

import { IconButton } from "theme-ui";
import { isBlockActive } from "../../../../../utils/SlateUtilityFunctions";
import { CustomEditor } from "../../../../../types/common";
import BulletListIcon from "../../../../icons/BulletListIcon";

const BulletListButton = ({ editor }: { editor: CustomEditor }) => {
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
      {/* <Box sx={{ padding: "2px", marginY: "auto" }}> */}
      <BulletListIcon
        sx={{
          color: isBlockActive(editor, "bulleted-list")
            ? "accent"
            : "secondary",
          width: "24px",
        }}
      />
      {/* </Box> */}
    </Box>
  );
};

export default BulletListButton;
