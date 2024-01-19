import { Editor, Node, Path, Range } from "slate";
import { useSlateStatic } from "slate-react";

const SlateDecorate = ([node, path]: [Node, Path]) => {
  const editor = useSlateStatic();

  if (editor.selection != null) {
    if (
      !Editor.isEditor(node) &&
      Editor.string(editor, [path[0]]) === "" &&
      Range.includes(editor.selection, path) &&
      Range.isCollapsed(editor.selection)
    ) {
      return [
        {
          ...editor.selection,
          placeholder: true,
        },
      ];
    }
  }

  return [];
};

export default SlateDecorate;
