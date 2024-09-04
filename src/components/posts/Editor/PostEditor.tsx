import React, {
  useMemo,
  useCallback,
  useContext,
  useRef,
  useEffect,
} from "react";
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
import { SlateProvider } from "../../SlateContext";
import FloatingMenu from "./FloatingMenu";
import MobileMenu from "./MobileMenu";
import { RWGPSModal } from "./AddRWGPS";

import useSelectionChangeHandler from "../../../hooks/useSelectionChangeHandler";
import useFetchData from "../../../hooks/useFetchData";
import { CloudinaryImage, CustomElement } from "../../../types/common";
import RaceResultsImport from "../RaceResults/RaceResultsImport";
import OptionsDropdown from "../../OptionsDropdown";
import AddImage from "../Image/AddImage";
import AddMediaComponent from "../Editor/AddMediaComponent"; // Import your AddMediaComponent
import { updateImages } from "../../../utils/editorActions";

const PostEditor = ({ initialState }: { initialState: CustomElement[] }) => {
  const editor = useMemo(
    () => withLayout(withHistory(withLinks(withReact(createEditor())))),
    []
  );

  const slateRef = useRef<HTMLDivElement>(null); // Ref for Slate element
  const addMediaRef = useRef<any>(null); // Ref for AddMediaComponent

  const { handleSelectionChange, selectionMenu, isChangingQuickly } =
    useSelectionChangeHandler(editor);
  const { id, title, postLocation, setPost, images } = useContext(PostContext);
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
    isImageUploadOpen, // Trigger for Image Upload
    setIsImageUploadOpen,
  } = useContext(EditorContext);

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

  // Trigger AddMediaComponent when isImageUploadOpen is true
  useEffect(() => {
    if (isImageUploadOpen && addMediaRef.current) {
      addMediaRef.current.openModal(); // Programmatically open the widget
    }
  }, [isImageUploadOpen]);

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
        <SlateProvider editor={editor} ref={slateRef}>
          {isRaceResultsModalOpen && <RaceResultsImport />}
          <RWGPSModal />
          <MobileMenu />
          <AddVideoModal />
          {isOptionsOpen && <OptionsDropdown />}
          {selectionMenu && !isChangingQuickly && (
            <FloatingMenu top={selectionMenu.top} left={selectionMenu.left} />
          )}
          {isHeroImageModalOpen && <AddImage />}
          {/* {isImageUploadOpen && <h1>Triggering Media Upload</h1>} */}
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

          {/* AddMediaComponent */}
          <AddMediaComponent
            ref={addMediaRef} // Attach the ref to AddMediaComponent
            uploadPreset="epcsmymp"
            onSuccess={async (result) => {
              console.log("Media uploaded successfully", result);

              images?.push(result.info as CloudinaryImage);
              if (images) {
                setPost({ images: [...images] });
                updateImages(id, images);
              }
            }}
            onClose={() => {
              setIsImageUploadOpen(false);
            }} // Close the modal
          />
        </SlateProvider>
      </Box>
    </Flex>
  );
};

export default PostEditor;
