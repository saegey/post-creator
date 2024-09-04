import { useThemeUI } from "theme-ui";
import React, { useImperativeHandle, useRef, forwardRef } from "react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

type AddMediaComponentProps = {
  uploadPreset: string;
  onSuccess: (result: CloudinaryUploadWidgetResults) => void;
};

const AddMediaComponent = forwardRef(
  ({ uploadPreset, onSuccess }: AddMediaComponentProps, ref) => {
    const { theme } = useThemeUI();
    const [isOpen, setIsOpen] = React.useState(false);
    const widgetOpenRef = useRef<() => void | null>(null); // Ref to store the open function

    // Expose the `openModal` function to the parent component
    useImperativeHandle(ref, () => ({
      openModal: () => {
        if (widgetOpenRef.current) {
          setIsOpen(true);
          console.log(widgetOpenRef.current);
          widgetOpenRef.current(); // Call the widget's open function
        } else {
          console.error("Widget open function is not availabl1e");
        }
      },
    }));

    React.useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.body.style.overflow = "auto";
      };
    }, [isOpen]);

    console.log("add media component");

    return (
      <CldUploadWidget
        uploadPreset={uploadPreset}
        options={{
          cropping: true,
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
        {({ open }) => {
          widgetOpenRef.current = open; // Store the open function in the ref
          return null; // No button rendering here, since it will be triggered externally
        }}
      </CldUploadWidget>
    );
  }
);

export default AddMediaComponent;
