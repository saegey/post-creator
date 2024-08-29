import React, { useMemo, useCallback, useContext } from "react";
import { Slate, Editable, withReact, RenderLeafProps } from "slate-react";
import { createEditor } from "slate";
import { Flex, Box, Theme, ThemeUIStyleObject } from "theme-ui";
import { withHistory } from "slate-history";

import renderElement from "./RenderElement";
import { PostContext } from "../../PostContext";
import { EditorContext } from "./EditorContext";

import withLinks from "../../plugins/withLinks";
import withLayout from "../../plugins/withLayout";
import Menu from "../../Menu";
import { AddVideoModal } from "./AddVideo";
import Leaf from "./Leaf";
import slateApi from "../../../../lib/slateApi";
import FloatingMenu from "./FloatingMenu";
import MobileMenu from "./MobileMenu";
import { RWGPSModal } from "./AddRWGPS";

import useSelectionChangeHandler from "../../../hooks/useSelectionChangeHandler";
import usePostSubscription from "../../../hooks/usePostSubscription";
import useFetchData from "../../../hooks/useFetchData";
import { CustomElement } from "../../../types/common";

// import PublishModalConfirmation from "./PublishModalConfirmation";
// import ShareModal from "./ShareModal";
// import AddImage from "../Image/AddImage";

const PostEditor = ({ initialState }: { initialState: CustomElement[] }) => {
  const editor = useMemo(
    () => withLayout(withHistory(withLinks(withReact(createEditor())))),
    []
  );

  const { handleSelectionChange, selectionMenu } =
    useSelectionChangeHandler(editor);
  const { id, title, postLocation, setPost } = useContext(PostContext);
  const [timeoutLink, setTimeoutLink] = React.useState<NodeJS.Timeout>();
  const {
    isNewComponentMenuOpen,
    menuPosition,
    setMenuPosition,
    setSavingStatus,
    setIsSavingPost,
  } = useContext(EditorContext);

  usePostSubscription();
  useFetchData();

  const updateMenuPosition = useCallback(() => {
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
    <Flex>
      <Box
        sx={
          {
            minWidth: "100%",
            margin: "0 auto 50px auto",
            width: "100%",
            backgroundColor: "background",
            borderRadius: "10px",
            padding: "0px",
            position: "relative",
          } as ThemeUIStyleObject<Theme>
        }
      >
        <Slate
          editor={editor}
          initialValue={initialState}
          onChange={(newValue) => {
            console.log(newValue);
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
          {isNewComponentMenuOpen && <Menu menuPosition={menuPosition} />}
          <RWGPSModal />
          <AddVideoModal />
          {selectionMenu && (
            <FloatingMenu top={selectionMenu.top} left={selectionMenu.left} />
          )}
          <MobileMenu />
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
      </Box>
    </Flex>
  );
};

export default PostEditor;
