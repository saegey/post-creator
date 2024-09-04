// EditorContent.tsx
import React, { useCallback, useContext } from "react";
import { Slate, Editable, withReact, RenderLeafProps } from "slate-react";
import useSelectionChangeHandler from "../../../hooks/useSelectionChangeHandler";
import { PostContext } from "../../PostContext";
import slateApi from "../../../../lib/slateApi";
import Leaf from "./Leaf";
import renderElement from "./RenderElement";
import { CustomEditor, CustomElement } from "../../../types/common";
import { EditorContext } from "./EditorContext";

const EditorContent = ({
  editor,
  initialState,
}: // updateMenuPosition,
{
  editor: CustomEditor;
  initialState: CustomElement[];
  // updateMenuPosition: () => void;
}) => {
  const { id, title, postLocation, setPost } = useContext(PostContext);
  const { setSavingStatus, setIsSavingPost, setMenuPosition } =
    useContext(EditorContext);
  const [timeoutLink, setTimeoutLink] = React.useState<NodeJS.Timeout>();
  const { handleSelectionChange } = useSelectionChangeHandler(editor);

  const updateMenuPosition = useCallback(() => {
    console.log("updateMenuPosition2", editor.selection);
    const selection = editor.selection;
    if (selection) {
      const domSelection = window.getSelection();
      if (!domSelection) return;

      if (domSelection.anchorNode) {
        const parentElement = domSelection.anchorNode.parentElement;
        if (parentElement) {
          const rect = parentElement.getBoundingClientRect();
          setMenuPosition({ top: rect.bottom, left: rect.left, path: [] });
        }
      }
    }
  }, [editor]);

  return (
    <Slate
      editor={editor}
      initialValue={initialState}
      onChange={(newValue) => {
        updateMenuPosition();
        handleSelectionChange();
        setPost({ components: newValue as Array<CustomElement> });

        slateApi.saveEditor({
          editor,
          id,
          title,
          postLocation,
          setSavingStatus,
          setIsSavingPost,
          timeoutLink,
          setTimeoutLink,
          heroImage: JSON.stringify(""),
        });
      }}
    >
      <Editable
        spellCheck
        autoFocus
        renderElement={renderElement}
        renderLeaf={(props: RenderLeafProps) => (
          <Leaf props={props} updateMenuPosition={updateMenuPosition} />
        )}
        contentEditable="true"
      />
    </Slate>
  );
};

export default EditorContent;
