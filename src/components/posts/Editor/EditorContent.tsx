// EditorContent.tsx
import React, { useCallback, useContext } from "react";
import { Slate, Editable, withReact, RenderLeafProps } from "slate-react";
import useSelectionChangeHandler from "../../../hooks/useSelectionChangeHandler";
import { PostContext } from "../../PostContext";
import slateApi from "../../../../lib/slateApi";
import Leaf from "./Leaf";
import renderElement from "./RenderElement";
import { CustomEditor, CustomElement } from "../../../types/common";

const EditorContent = ({
  editor,
  initialState,
  updateMenuPosition,
}: {
  editor: CustomEditor;
  initialState: CustomElement[];
  updateMenuPosition: () => void;
}) => {
  const { id, title, postLocation, setPost } = useContext(PostContext);
  const { handleSelectionChange } = useSelectionChangeHandler(editor);

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
      />
    </Slate>
  );
};

export default EditorContent;
