// MediaUploadHandler.tsx
import React, { useRef, useEffect, useContext } from "react";
import { Editor } from "slate";
import { Transforms } from "slate";

import { EditorContext } from "./EditorContext";
import { PostContext } from "../../PostContext";
import AddMediaComponent from "../Editor/AddMediaComponent";
import { CloudinaryImage } from "../../../types/common";
import { updateImages } from "../../../utils/editorActions";
import { useSlateContext } from "../../SlateContext";

const MediaUploadHandler = () => {
  const addMediaRef = useRef<any>(null);
  const { id, setPost, images } = useContext(PostContext);
  const { isImageUploadOpen, setIsImageUploadOpen } = useContext(EditorContext);
  const { menuPosition } = React.useContext(EditorContext);
  const { editor } = useSlateContext();

  if (!editor) {
    throw new Error("Editor is not defined");
  }

  useEffect(() => {
    if (isImageUploadOpen && addMediaRef.current) {
      addMediaRef.current.openModal();
    }
  }, [isImageUploadOpen]);

  const insertImage = (selectedImage: CloudinaryImage) => {
    console.log("path", menuPosition.path);
    Transforms.insertNodes(
      editor,
      {
        type: "image",
        asset_id: selectedImage?.asset_id,
        public_id: selectedImage?.public_id,
        children: [{ text: "" }],
        void: true,
        photoCaption: "",
        caption: "",
      },
      { at: menuPosition.path }
    );
    // if (menuPosition.path.length > 2) {
    //   Transforms.liftNodes(editor);
    // }
  };

  console.log(menuPosition.path);

  return (
    <AddMediaComponent
      ref={addMediaRef}
      uploadPreset="epcsmymp"
      onSuccess={(result) => {
        // console.log("AddMediaComponent oon sucess", result);
        // images?.push(result.info as CloudinaryImage);
        insertImage(result.info as CloudinaryImage);

        if (images) {
          setPost({ images: [...images] });
          updateImages(id, images);
        }
      }}
      onClose={() => {
        setTimeout(() => {
          setIsImageUploadOpen(false);
        }, 100);
      }}
    />
  );
};

export default MediaUploadHandler;
