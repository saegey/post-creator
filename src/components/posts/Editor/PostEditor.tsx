import React, { useMemo, useCallback, useContext, useRef } from "react";
import { Slate, Editable, withReact, RenderLeafProps } from "slate-react";
import { createEditor, Editor, setSelection, Transforms } from "slate";
import { Flex, Box, Theme, ThemeUIStyleObject } from "theme-ui";
import { withHistory } from "slate-history";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";

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
import {
  CloudinaryImage,
  CustomElement,
  HeroBannerType,
  VideoAssetEvent,
  VideoEmbedType,
} from "../../../types/common";
import RaceResultsImport from "../RaceResults/RaceResultsImport";
import OptionsDropdown from "../../OptionsDropdown";
import AddMediaComponent from "../Editor/AddMediaComponent"; // Import your AddMediaComponent
import { updateImages } from "../../../utils/editorActions";

import ImageManager from "../Image/ImageManager";
import PostSettings from "./PostSettings";
import PhotoCaptionModal from "../Image/PhotoCaptionModal";
import usePubSubSubscription from "../../../hooks/usePubSubSubscription";

const PostEditor = ({ initialState }: { initialState: CustomElement[] }) => {
  const editor = useMemo(
    () => withLayout(withHistory(withLinks(withReact(createEditor())))),
    []
  );

  // const [isFocused, setIsFocused] = React.useState(false);

  const slateRef = useRef<HTMLDivElement>(null); // Ref for Slate element
  const heroMediaRef = useRef<any>(null); // Ref for AddMediaComponent
  const newMediaRef = useRef<any>(null); // Ref for AddMediaComponent

  // Store the path in a ref
  const realPathRef = useRef<number[] | null>(null); // Use ref to hold realPath

  const {
    handleSelectionChange,
    selectionMenu,
    setSelectionMenu,
    isChangingQuickly,
  } = useSelectionChangeHandler(editor);
  const { id, title, postLocation, setPost, images } = useContext(PostContext);
  const [timeoutLink, setTimeoutLink] = React.useState<NodeJS.Timeout>();

  usePubSubSubscription(id, (payload: VideoAssetEvent) => {
    if (payload.type === "video.asset.ready") {
      Transforms.setNodes<CustomElement>(
        editor,
        {
          isReady: true,
        } as VideoEmbedType,
        {
          at: [],
          match: (node) => {
            const custom = node as CustomElement;
            return (
              custom.type === "videoEmbed" &&
              custom.isReady === false &&
              custom.assetId === payload.object.id
            );
          },
        }
      );
    }
  });

  const {
    isNewComponentMenuOpen,
    menuPosition,
    setMenuPosition,
    setSavingStatus,
    setIsSavingPost,
    isRaceResultsModalOpen,
    isOptionsOpen,
    isHeroImageModalOpen,
    setIsHeroImageModalOpen,
    isNewPostImageUploadOpen,
    setIsNewPostImageUploadOpen,
    isChangeImageModalOpen,
    isStravaModalOpen,
    isSettingsModalOpen,
    isPhotoCaptionOpen,
  } = useContext(EditorContext);

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

  // Open modal on button click
  const openImageUploadModal = () => {
    capturePath();
    if (newMediaRef.current) {
      newMediaRef.current.openModal(); // Open Cloudinary widget
    }
  };

  const openHeroImageModal = () => {
    if (heroMediaRef.current) {
      heroMediaRef.current.openModal();
    }
  };

  React.useEffect(() => {
    if (isNewPostImageUploadOpen) {
      openImageUploadModal();
    }
  }, [isNewPostImageUploadOpen]);

  React.useEffect(() => {
    if (isHeroImageModalOpen) {
      openHeroImageModal();
    }
  }, [isHeroImageModalOpen]);

  // Function to capture and store the current Slate editor path
  const capturePath = useCallback(() => {
    realPathRef.current = [...menuPosition.path]; // Update the ref instead of state
  }, [isNewPostImageUploadOpen]);

  // Handle success when an image is uploaded
  const handleImageUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    const newImage = result.info; // The uploaded image result from Cloudinary

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
            width: "100%",
            backgroundColor: "background",
            position: "relative",
            minHeight: "100vh",
          } as ThemeUIStyleObject<Theme>
        }
      >
        <SlateProvider editor={editor} ref={slateRef}>
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
            <Box
              sx={{
                borderWidth: "0px",
                borderStyle: "solid",
                outline: "none",
                transition: "border-color 0.3s ease",
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
                style={{
                  outline: "none", // Removes default blue outline
                  boxShadow: "none", // Removes any shadow applied on focus
                  WebkitTapHighlightColor: "transparent", // Removes mobile tap highlight
                }}
              />
            </Box>
          </Slate>
          {isRaceResultsModalOpen && <RaceResultsImport />}
          <RWGPSModal />
          <MobileMenu />
          <AddVideoModal />
          {isOptionsOpen && <OptionsDropdown />}
          {selectionMenu && !isChangingQuickly && (
            <FloatingMenu
              selectionMenu={selectionMenu}
              setSelectionMenu={setSelectionMenu}
            />
          )}
          {isNewComponentMenuOpen && <Menu menuPosition={menuPosition} />}

          {isChangeImageModalOpen && <ImageManager />}
          {isSettingsModalOpen && <PostSettings />}
          {isPhotoCaptionOpen && <PhotoCaptionModal />}
          <AddMediaComponent
            ref={newMediaRef}
            uploadPreset="epcsmymp"
            onSuccess={handleImageUploadSuccess}
            onClose={() => setIsNewPostImageUploadOpen(false)}
          />
          <AddMediaComponent
            onClose={() => {
              setIsHeroImageModalOpen(false);
            }}
            ref={heroMediaRef}
            uploadPreset="epcsmymp"
            onSuccess={async (d) => {
              images?.push(d.info as CloudinaryImage);

              if (images) {
                setPost({ images: [...images] });
                updateImages(id, images);
              }
            }}
          />
        </SlateProvider>
      </Box>
    </Flex>
  );
};

export default PostEditor;
