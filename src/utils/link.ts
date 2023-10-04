import { Editor, Transforms, Path, Range, Element, BaseElement } from 'slate';

export interface CustomNode extends BaseElement {
  type: string;
}

export const createLinkNode = (href, showInNewTab, text) => ({
  type: 'link',
  href,
  target: showInNewTab ? '_blank' : '_self',
  children: [{ text }],
});

export const insertLink = (editor, { url, showInNewTab }) => {
  if (!url) return;

  const { selection } = editor;
  const link = createLinkNode(url, showInNewTab, 'Link');
  if (!!selection) {
    const [parent, parentPath] = Editor.parent(
      editor,
      selection.focus.path
    ) as [CustomNode, any];
    if (parent.type === 'link') {
      removeLink(editor);
    }

    //for image nodes, will be implemented later
    if (editor.isVoid(parent)) {
      Transforms.insertNodes(
        editor,
        { type: 'paragraph', children: [link] } as CustomNode,
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
      type: 'paragraph',
      children: [link],
    } as CustomNode);
  }
};

export const removeLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n: CustomNode) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
  });
};
