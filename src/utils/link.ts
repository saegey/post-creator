import { Editor, Transforms, Path, Range, Element, BaseElement } from "slate";
import { CustomEditor, CustomElement, LinkType } from "../types/common";

export const createLinkNode = (
  href: string,
  showInNewTab: boolean,
  text: string
): LinkType => ({
  type: "link",
  href,
  target: showInNewTab ? "_blank" : "_self",
  children: [{ text }],
});

type InsertLinkParams = {
  url: string;
  showInNewTab: boolean;
};

export const insertLink = (
  editor: CustomEditor,
  { url, showInNewTab }: InsertLinkParams
) => {
  if (!url) return;

  const { selection } = editor;
  const link = createLinkNode(url, showInNewTab, "Link");

  if (!!selection) {
    const [parent, parentPath] = Editor.parent(
      editor,
      selection.focus.path
    ) as [CustomElement, any];
    if (parent.type === "link") {
      removeLink(editor);
    }

    //for image nodes, will be implemented later
    if (editor.isVoid(parent)) {
      Transforms.insertNodes(
        editor,
        { type: "paragraph", children: [link] },
        {
          at: Path.next(parentPath),
          select: true,
        }
      );
    } else if (Range.isCollapsed(selection)) {
      Transforms.insertNodes(editor, link, { select: true });
    } else {
      Transforms.wrapNodes(editor, link, { split: true });
    }
  } else {
    Transforms.insertNodes(editor, {
      type: "paragraph",
      children: [link],
    });
  }
};

export const removeLink = (editor: CustomEditor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
  });
};
