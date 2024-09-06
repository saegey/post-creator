import React, { useRef, useEffect, useCallback, useContext } from "react";
import AddMediaComponent from "./AddMediaComponent";
import { Transforms, Editor } from "slate";
import { EditorContext } from "./EditorContext";
import { PostContext } from "../../PostContext";

interface MediaHandlerProps {
  isModalOpen: boolean;
  setIsModalOpen: (state: boolean) => void;
  capturePath?: boolean;
  menuPositionPath?: number[] | null;
  onImageUploadSuccess: (result: any, path: number[] | null) => void; // Custom post-upload callback
  uploadPreset: string;
}

const MediaHandler = ({
  isModalOpen,
  setIsModalOpen,
  capturePath = false,
  menuPositionPath = null,
  onImageUploadSuccess,
  uploadPreset,
}: MediaHandlerProps) => {
  const { editor } = useContext(EditorContext);
  const mediaRef = useRef<any>(null);
  const realPathRef = useRef<number[] | null>(null);

  // Capture the path before opening the modal
  useEffect(() => {
    if (capturePath && menuPositionPath) {
      realPathRef.current = [...menuPositionPath];
    }
  }, [capturePath, menuPositionPath]);

  // Open the media modal when needed
  useEffect(() => {
    if (isModalOpen) {
      if (mediaRef.current) {
        mediaRef.current.openModal();
      }
    }
  }, [isModalOpen]);

  // Handle upload success
  const handleUploadSuccess = useCallback(
    (result: any) => {
      const path = realPathRef.current;
      onImageUploadSuccess(result, path); // Call the custom callback with result and path
      setIsModalOpen(false);
    },
    [onImageUploadSuccess, setIsModalOpen]
  );

  // Handle upload success
  const handleOnClose = useCallback(
    (result: any) => {
      const path = realPathRef.current;
      onImageUploadSuccess(result, path); // Call the custom callback with result and path
      setIsModalOpen(false);
    },
    [onImageUploadSuccess, setIsModalOpen]
  );

  return (
    <AddMediaComponent
      ref={mediaRef}
      uploadPreset={uploadPreset}
      onSuccess={handleUploadSuccess}
      onClose={handleOnClose}
    />
  );
};

export default MediaHandler;
