import { Transforms, Node, Element as SlateElement, Editor } from "slate";

import {
  CustomEditor,
  CustomElement,
  HeroBannerType,
  ParagraphElement,
  PostAuthor,
} from "../../types/common";

const withLayout = (editor: CustomEditor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
		// console.log(node, path, editor.children.length);
    if (path.length === 0) {
      if (editor.children.length <= 1 && Editor.string(editor, [0, 0]) === "") {
        const title: HeroBannerType = {
          type: "heroBanner",
          children: [{ text: "" }],
          void: true,
        };
        Transforms.insertNodes(editor, title, {
          at: path.concat(0),
          select: true,
        });
      }

      if (editor.children.length < 2) {
        const postAuthor = {
          type: "postAuthor",
          children: [{ text: "" }],
        } as PostAuthor;

        Transforms.insertNodes(editor, postAuthor, { at: path.concat(1) });
      }

      if (editor.children.length < 3) {
        const paragraph: ParagraphElement = {
          type: "paragraph",
          children: [{ text: "" }],
        };
        Transforms.insertNodes(editor, paragraph, { at: path.concat(2) });
      }
      for (const [child, childPath] of Array.from(
        Node.children(editor, path) as unknown as any[]
      )) {
        let type: string;
        const slateIndex = childPath[0];
        const childType = child.type as string;
        const enforceType = (type: string) => {
          if (
            SlateElement.isElement(child) &&
            childType !== type &&
            type === "postAuthor"
          ) {
            const newProperties: Partial<CustomElement> = { type };
            Transforms.setNodes<CustomElement>(editor, newProperties, {
              at: childPath,
            });
          }
        };

        switch (slateIndex) {
          case 0:
            type = "heroBanner";
            enforceType(type);
            break;
          case 1:
            type = "paragraph";
            enforceType(type);
          case 2:
            type = "postAuthor";
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
