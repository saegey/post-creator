import React, { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { CloudinaryImage } from "../../../types/common";
import { useThemeUI } from "theme-ui";

type ImageUploadWidgetProps = {
  onSuccess: (uploadedImage: CloudinaryImage) => void;
  onOpen: (open: () => void) => void; // Callback to provide the open function
};

const ImageUploadWidget = ({ onSuccess, onOpen }: ImageUploadWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useThemeUI();

  const openModal = (open: Function) => {
    setIsOpen(true);
    open();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <CldUploadWidget
      uploadPreset="epcsmymp"
      options={{
        sources: ["local", "url", "camera", "image_search", "instagram"],
        styles: {
          palette: {
            window: theme.rawColors?.background,
            windowBorder: theme.rawColors?.text,
            tabIcon: theme.rawColors?.text,
            menuIcons: "#5A616A",
            textDark: "#000000",
            textLight: "#FFFFFF",
            link: theme.rawColors?.primary,
            action: "#FF620C",
            inactiveTabIcon: theme.rawColors?.textMuted,
            error: "#F44235",
            inProgress: "#0078FF",
            complete: "#20B832",
            sourceBg: theme.rawColors?.editorBackground,
          },
          frame: {
            background: `rgba(${theme.rawColors?.blackBoxColor}, 0.7)`,
          },
          fonts: {
            "'SF Pro Display', 'Inter'":
              "https://fonts.googleapis.com/css2?family=Inter",
          },
        },
      }}
      onSuccess={(result) => {
        const uploadedImage = result.info as CloudinaryImage;
        onSuccess(uploadedImage);
        setIsOpen(false);
      }}
    >
      {({ open }) => {
        onOpen(() => openModal(open)); // Pass the open function to the callback
        return <div />; // Return an empty div element
      }}
    </CldUploadWidget>
  );
};

export default ImageUploadWidget;
