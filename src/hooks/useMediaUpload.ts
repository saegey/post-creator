import { useRef, useCallback, useEffect } from "react";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";

const useMediaUpload = ({
  onImageUploadSuccess,
  openModalState,
  setOpenModalState,
}: // uploadPreset,
{
  onImageUploadSuccess: (result: CloudinaryUploadWidgetResults) => void;
  openModalState: boolean;
  setOpenModalState: (state: boolean) => void;
  // uploadPreset: string;
}) => {
  const mediaRef = useRef<any>(null);

  const openModal = useCallback(() => {
    if (mediaRef.current) {
      mediaRef.current.openModal();
    }
  }, []);

  const handleUploadSuccess = useCallback(
    (result: CloudinaryUploadWidgetResults) => {
      if (onImageUploadSuccess) {
        onImageUploadSuccess(result);
      }
      setOpenModalState(false); // Close the modal after successful upload
    },
    [onImageUploadSuccess, setOpenModalState]
  );

  useEffect(() => {
    if (openModalState) {
      openModal();
    }
  }, [openModalState, openModal]);

  return {
    mediaRef,
    openModal,
    handleUploadSuccess,
    closeModal: () => setOpenModalState(false),
  };
};

export default useMediaUpload;
