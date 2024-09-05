import React, {
  useMemo,
  useCallback,
  useContext,
  useRef,
  useEffect,
} from "react";
import { Slate, Editable, withReact, RenderLeafProps } from "slate-react";
import { createEditor, Transforms } from "slate";
import { Flex, Box, Theme, ThemeUIStyleObject } from "theme-ui";
import { withHistory } from "slate-history";
import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import { UpdatePostMutation } from "../../../API";

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
import { updatePostImages } from "../../../graphql/customMutations";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";

const PostEditor = ({ initialState }: { initialState: CustomElement[] }) => {
  const editor = useMemo(
    () => withLayout(withHistory(withLinks(withReact(createEditor())))),
    []
  );

  const slateRef = useRef<HTMLDivElement>(null); // Ref for Slate element
  const addMediaRef = useRef<any>(null); // Ref for AddMediaComponent
  const newMediaRef = useRef<any>(null); // Ref for AddMediaComponent

  // Store the path in a ref
  const realPathRef = useRef<number[] | null>(null); // Use ref to hold realPath

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
    isNewPostImageUploadOpen,
    setIsNewPostImageUploadOpen,
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

  // Open modal on button click
  const openImageUploadModal = () => {
    capturePath();
    if (newMediaRef.current) {
      newMediaRef.current.openModal(); // Open Cloudinary widget
    }
  };

  React.useEffect(() => {
    if (isNewPostImageUploadOpen) {
      openImageUploadModal();
    }
  }, [isNewPostImageUploadOpen]);

  // Function to capture and store the current Slate editor path
  const capturePath = useCallback(() => {
    if (isNewComponentMenuOpen) {
      console.log("Captured realPath:", menuPosition.path);
      realPathRef.current = [...menuPosition.path]; // Update the ref instead of state
    }
  }, [isNewPostImageUploadOpen]);

  // Handle success when an image is uploaded
  const handleImageUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    const newImage = result.info; // The uploaded image result from Cloudinary
    console.log("Uploaded image:", newImage, "At path:", realPathRef.current); // Now realPathRef.current has the latest path
    if (images === undefined || images === null) {
      throw new Error("Images is undefined");
    }
    if (
      newImage === undefined ||
      newImage === null ||
      typeof newImage === "string"
    ) {
      throw new Error("New image is invalid");
    }

    // Insert image into the editor at the captured path
    if (realPathRef.current) {
      images?.push(newImage as CloudinaryImage);
      setPost({ images: [...images] });
      updateImages(id, images);

      Transforms.insertNodes(
        editor,
        {
          type: "image",
          asset_id: newImage?.asset_id,
          public_id: newImage?.public_id,
          children: [{ text: "" }],
          void: true,
          photoCaption: "",
          caption: "",
        },
        { at: realPathRef.current }
      );
    }

    // Reset the state
    setIsNewPostImageUploadOpen(false);
  };

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
          <AddMediaComponent
            ref={newMediaRef}
            uploadPreset="epcsmymp"
            onSuccess={handleImageUploadSuccess}
            onClose={() => setIsNewPostImageUploadOpen(false)}
          />
        </SlateProvider>
      </Box>
    </Flex>
  );
};

export default PostEditor;
