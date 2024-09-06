import { useThemeUI } from "theme-ui";
import React, { useImperativeHandle, useRef, forwardRef } from "react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

type AddMediaComponentProps = {
  uploadPreset: string;
  onSuccess: (
    result: CloudinaryUploadWidgetResults,
    realPath?: number[]
  ) => void;
  onClose: () => void; // A callback to handle the modal close
};

const AddMediaComponent = forwardRef(
  ({ uploadPreset, onSuccess, onClose }: AddMediaComponentProps, ref) => {
    const { theme } = useThemeUI();
    const widgetOpenRef = useRef<() => void | null>(); // Ref to store the open function

    // Use imperative handle to expose openModal function to parent
    useImperativeHandle(ref, () => ({
      openModal: () => {
        // Trigger the Cloudinary widget to open
        if (widgetOpenRef.current) {
          widgetOpenRef.current();
        } else {
          console.error("Widget is not initialized");
        }
      },
    }));

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
        onSuccess={(result) => {
          // Handle success - pass result back to parent component
          onSuccess(result);
        }}
        onClose={onClose} // Handle widget close
      >
        {({ open }) => {
          widgetOpenRef.current = open; // Store the open function in the ref
          // return null; // No button rendering here, as it's triggered programmatically

          return <></>;
        }}
      </CldUploadWidget>
    );
  }
);

export default AddMediaComponent;
