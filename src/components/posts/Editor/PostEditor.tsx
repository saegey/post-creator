import React, { useMemo, useCallback, useContext } from "react";
import { Slate, Editable, withReact, RenderLeafProps } from "slate-react";
import { createEditor } from "slate";
import { Flex, Box, Theme, ThemeUIStyleObject, Button } from "theme-ui";
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
import { SlateProvider } from "../../SlateContext";
import FloatingMenu from "./FloatingMenu";
import MobileMenu from "./MobileMenu";
import { RWGPSModal } from "./AddRWGPS";

import useSelectionChangeHandler from "../../../hooks/useSelectionChangeHandler";
// import usePostSubscription from "../../../hooks/usePostSubscription";
import useFetchData from "../../../hooks/useFetchData";
import { CustomElement } from "../../../types/common";
import RaceResultsImport from "../RaceResults/RaceResultsImport";
import OptionsDropdown from "../../OptionsDropdown";

// import ShareModal from "./ShareModal";
// import AddImage from "../Image/AddImage";

const PostEditor = ({ initialState }: { initialState: CustomElement[] }) => {
  const editor = useMemo(
    () => withLayout(withHistory(withLinks(withReact(createEditor())))),
    []
  );

  const { handleSelectionChange, selectionMenu, isChangingQuickly } =
    useSelectionChangeHandler(editor);
  const { id, title, postLocation, setPost } = useContext(PostContext);
  const [timeoutLink, setTimeoutLink] = React.useState<NodeJS.Timeout>();
  const {
    isNewComponentMenuOpen,
    menuPosition,
    setMenuPosition,
    setSavingStatus,
    setIsSavingPost,
    isRaceResultsModalOpen,
    isOptionsOpen,
    isHeroImageModalOpen,
  } = useContext(EditorContext);

  // usePostSubscription();
  useFetchData();
  console.log("initialState", initialState);

  const updateMenuPosition = useCallback(() => {
    console.log("updateMenuPosition");
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
        <SlateProvider editor={editor}>
          {isRaceResultsModalOpen && <RaceResultsImport />}
          <RWGPSModal />
          <MobileMenu />
          <AddVideoModal />
          {isOptionsOpen && <OptionsDropdown />}

          {selectionMenu && !isChangingQuickly && (
            <FloatingMenu top={selectionMenu.top} left={selectionMenu.left} />
          )}
          {isNewComponentMenuOpen && <Menu menuPosition={menuPosition} />}

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
        </SlateProvider>
      </Box>
    </Flex>
  );
};

export default PostEditor;
