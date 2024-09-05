// MediaUploadHandler.tsx
import React, { useRef, useEffect, useContext } from "react";
import { EditorContext } from "./EditorContext";
import { PostContext } from "../../PostContext";
import AddMediaComponent from "../Editor/AddMediaComponent";
import { CloudinaryImage } from "../../../types/common";
import { updateImages } from "../../../utils/editorActions";

const MediaUploadHandler = () => {
  const addMediaRef = useRef<any>(null);
  const { id, setPost, images } = useContext(PostContext);
  const { isImageUploadOpen, setIsImageUploadOpen } = useContext(EditorContext);

  useEffect(() => {
    if (isImageUploadOpen && addMediaRef.current) {
      addMediaRef.current.openModal();
    }
  }, [isImageUploadOpen]);

  return (
    <AddMediaComponent
      ref={addMediaRef}
      uploadPreset="epcsmymp"
      onSuccess={async (result) => {
        images?.push(result.info as CloudinaryImage);
        if (images) {
          setPost({ images: [...images] });
          updateImages(id, images);
        }
      }}
      onClose={() => {
        setIsImageUploadOpen(false);
      }}
    />
  );
};

export default MediaUploadHandler;
