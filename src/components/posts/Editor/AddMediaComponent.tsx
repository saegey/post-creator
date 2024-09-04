import { useThemeUI } from "theme-ui";
import React, { useImperativeHandle, useRef, forwardRef } from "react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

type AddMediaComponentProps = {
  uploadPreset: string;
  onSuccess: (result: CloudinaryUploadWidgetResults) => void;
  onClose: () => void; // Add a callback to handle the modal close
};

const AddMediaComponent = forwardRef(
  ({ uploadPreset, onSuccess, onClose }: AddMediaComponentProps, ref) => {
    const { theme } = useThemeUI();
    const widgetOpenRef = useRef<() => void | null>(null); // Ref to store the open function

    // Expose the `openModal` function to the parent component
    useImperativeHandle(ref, () => ({
      openModal: () => {
        try {
          console.log(widgetOpenRef.current);
          widgetOpenRef && widgetOpenRef.current(); // Call the widget's open function
        } catch (e) {
          console.error("Widget open function is not available", e);
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
          console.log("Image upload widget success", result);
          onSuccess(result);
        }}
        onClose={() => {
          console.log("Image upload widget closed");
          onClose && onClose(); // Call the passed `onClose` callback when the widget closes
        }}
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
