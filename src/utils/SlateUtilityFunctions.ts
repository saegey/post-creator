import {
  Transforms,
  Editor,
  Element as SlateElement,
  Node as SlateNode,
} from "slate";

import { CustomEditor } from "../types/common";

// interface CustomNode extends BaseElement {
//   type: boolean;
// }
// interface CustomElement extends BaseElement {
//   type: string | boolean;
// }
// interface CustomStringElement extends BaseElement {
//   type: string;
// }

// const alignment = ["alignLeft", "alignRight", "alignCenter"];
// const list_types = ["orderedList", "bulleted-list"];
// export const sizeMap = {
//   small: "0.75em",
//   normal: "1em",
//   medium: "1.75em",
//   huge: "2.5em",
// };
// export const fontFamilyMap = {
//   sans: 'Helvetica,Arial, sans serif',
//   serif: 'Georgia, Times New Roaman,serif',
//   monospace: 'Monaco, Courier New,monospace',
// };

// export const toggleBlock = (editor, format) => {
//   const isActive = isBlockActive(editor, format);
//   const isList = list_types.includes(format);
//   const isIndent = alignment.includes(format);
//   const isAligned = alignment.some((alignmentType) =>
//     isBlockActive(editor, alignmentType)
//   );

/*If the node is already aligned and change in indent is called we should unwrap it first and split the node to prevent
    messy, nested DOM structure and bugs due to that.*/
// if (isAligned && isIndent) {
//   Transforms.unwrapNodes(editor, {
//     match: (n: CustomStringElement) =>
//       alignment.includes(
//         !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
//       ),
//     split: true,
//   });
// }

/* Wraping the nodes for alignment, to allow it to co-exist with other block level operations*/
//   if (isIndent) {
//     Transforms.wrapNodes(editor, {
//       type: format,
//       children: [],
//     } as CustomNode);
//     return;
//   }

//   Transforms.unwrapNodes(editor, {
//     match: (n: CustomStringElement) =>
//       !Editor.isEditor(n) &&
//       SlateElement.isElement(n) &&
//       list_types.includes(n.type),
//     split: true,
//   });

//   Transforms.setNodes(editor, {
//     type: isActive ? 'paragraph' : isList ? 'list-item' : format,
//   } as CustomElement);

//   if (isList && !isActive) {
//     Transforms.wrapNodes(editor, {
//       type: format,
//       children: [],
//     } as CustomElement);
//   }
// };

// export const addMarkData = (editor: CustomEditor, data) => {
//   Editor.addMark(editor, data.format, data.value);
// };
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
  format: "heading-two" | "bulleted-list"
) => {
  const [match] = Array.from(
    Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  );

  return !!match;
};

export const moveNodeUp = (editor: CustomEditor, nodePath: number[]) => {
  const parentPath = nodePath.slice(0, -1);
  const index = nodePath[nodePath.length - 1];

  // Ensure the node is not already at the top
  if (index > 0) {
    const newPath = [...parentPath, index - 1];

    // Move the node up one spot
    Transforms.moveNodes(editor, { at: nodePath, to: newPath });

    // Set the selection to the new position
    Transforms.select(editor, newPath);
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
    Transforms.select(editor, newPath);
  }
};

// export const activeMark = (editor: CustomEditor, format: "bold") => {
//   const defaultMarkData = {
//     color: "black",
//     bgColor: "black",
//     fontSize: "normal",
//     fontFamily: "sans",
//   };
//   const marks = Editor.marks(editor);
//   const defaultValue = defaultMarkData[format];
//   return marks?.[format] ?? defaultValue;
// };
