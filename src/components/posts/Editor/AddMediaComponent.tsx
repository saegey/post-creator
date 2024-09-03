import { useThemeUI } from "theme-ui";
import React from "react";
import { CldUploadWidget } from "next-cloudinary";

type AddMediaComponentProps = {
  uploadPreset: string;
  renderButton: (openModal: () => void) => React.ReactElement<any, any>; // Updated prop type
  onSuccess: (result: any) => void;
};

const AddMediaComponent = ({
  uploadPreset,
  renderButton, // Use the new render prop here
  onSuccess,
}: AddMediaComponentProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme } = useThemeUI();

  const openModal = (open: Function) => {
    setIsOpen(true);
    open();
  };

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <CldUploadWidget
      uploadPreset={uploadPreset}
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
            inactiveTabIcon: theme.rawColors?.muted,
            error: "#F44235",
            inProgress: "#0078FF",
            complete: "#20B832",
            sourceBg: theme.rawColors?.background,
          },
          frame: {
            background: "#00000080",
          },
          fonts: {
            "'SF Pro Display', 'Inter'":
              "https://fonts.googleapis.com/css2?family=Inter",
          },
        },
      }}
      onSuccess={onSuccess}
    >
      {({ open }) => renderButton(() => openModal(open))}
    </CldUploadWidget>
  );
};

export default AddMediaComponent;
