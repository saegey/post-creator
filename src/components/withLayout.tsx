import {
  Transforms,
  Node,
  Element as SlateElement,
  Descendant,
  Editor,
  BaseElement,
} from 'slate';

export type ParagraphElement = {
  type: 'paragraph';
  align?: string;
  children: Descendant[];
};

export type CustomElement = {
  type: string;
  children: Descendant[];
};

export type TitleElement = { type: 'heroBanner'; children: Descendant[] };

const withLayout = (editor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
    if (path.length === 0) {
      if (editor.children.length <= 1 && Editor.string(editor, [0, 0]) === '') {
        const title: TitleElement = {
          type: 'heroBanner',
          children: [{ text: '' }],
        };
        Transforms.insertNodes(editor, title, {
          at: path.concat(0),
          select: true,
        });
      }

      if (editor.children.length < 2) {
        const postAuthor = {
          type: 'postAuthor',
          children: [{ text: '' }],
        };

        Transforms.insertNodes(editor, postAuthor, { at: path.concat(1) });
      }

      if (editor.children.length < 3) {
        const paragraph: ParagraphElement = {
          type: 'paragraph',
          children: [{ text: '' }],
        };
        Transforms.insertNodes(editor, paragraph, { at: path.concat(2) });
      }
      for (const [child, childPath] of Array.from(
        Node.children(editor, path) as unknown as any[]
      )) {
        let type: string;
        const slateIndex = childPath[0];
        const childType = child.type as string;
        const enforceType = (type) => {
          if (
            SlateElement.isElement(child) &&
            childType !== type &&
            type === 'postAuthor'
          ) {
            const newProperties: Partial<CustomElement> = { type };
            Transforms.setNodes<BaseElement>(editor, newProperties, {
              at: childPath,
            });
          }
        };

        switch (slateIndex) {
          case 0:
            type = 'heroBanner';
            enforceType(type);
            break;
          case 1:
            type = 'paragraph';
            enforceType(type);
          case 2:
            type = 'postAuthor';
          // enforceType(type);
          default:
            break;
        }
      }
    }

    return normalizeNode([node, path]);
  };

  return editor;
};

export default withLayout;
