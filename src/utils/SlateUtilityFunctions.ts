import {
  Transforms,
  Editor,
  Element as SlateElement,
  Node as SlateNode,
  Path,
} from "slate";

import {
  CloudinaryImage,
  CustomEditor,
  CustomElement,
  HeroBannerType,
} from "../types/common";

export const toggleMark = (editor: CustomEditor, format: "bold") => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isMarkActive = (editor: CustomEditor, format: "bold") => {
  const marks = Editor.marks(editor);

  return marks ? marks[format] === true : false;
};

export const isBlockActive = (
  editor: CustomEditor,
  format: "heading" | "bulleted-list"
) => {
  const [match] = Array.from(
    Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  );

  return !!match;
};

export const moveNodeUp = (editor: CustomEditor, nodePath: Path) => {
  const parentPath = nodePath.slice(0, -1);
  const index = nodePath[nodePath.length - 1];

  // Ensure the node is not already at the top
  if (index > 0) {
    const newPath = [...parentPath, index - 1];

    // Move the node up one spot
    Transforms.moveNodes(editor, { at: nodePath, to: newPath });

    // Set the selection to the new position
    // Transforms.select(editor, newPath);
  }
};

export const moveNodeDown = (editor: CustomEditor, nodePath: number[]) => {
  const parentPath = nodePath.slice(0, -1);
  const index = nodePath[nodePath.length - 1];

  // Get the parent node
  const parentNode = SlateNode.parent(editor, nodePath);

  // Ensure the node is not already at the bottom
  if (parentNode.children && index < parentNode.children.length - 1) {
    const newPath = [...parentPath, index + 1];

    // Move the node down one spot
    Transforms.moveNodes(editor, { at: nodePath, to: newPath });

    // Set the selection to the new position
    // Transforms.select(editor, newPath);
  }
};

export const updateHeroImage = ({
  editor,
  element,
  path,
  image,
}: {
  editor: CustomEditor;
  element: CustomElement;
  path: Path;
  image: CloudinaryImage;
}) => {
  Transforms.setNodes(
    editor,
    {
      ...element,
      image: image,
    } as HeroBannerType,
    {
      at: path,
    }
  );
};
