import { IconButton } from "theme-ui";
import { Transforms, Editor, Element as SlateElement } from "slate";
import { isBlockActive } from "../../utils/SlateUtilityFunctions";
import { CustomEditor } from "../../types/common";

const HeadingButton = ({ editor }: { editor: CustomEditor }) => {
  const { selection } = editor;
  return (
    <IconButton
      aria-label="Toggle header"
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
      variant="iconButton"
      key="headingtwo"
    >
      <svg
        className="menu-button"
        fill={
          isBlockActive(editor, "heading-two")
            ? "var(--theme-ui-colors-text)"
            : "var(--theme-ui-colors-iconButtonDisabled)"
        }
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18 20V4h-3v6H9V4H6v16h3v-7h6v7z" />
      </svg>
    </IconButton>
  );
};

export default HeadingButton;
