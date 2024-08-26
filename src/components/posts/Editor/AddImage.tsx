import { Box, Flex, Text, useThemeUI } from "theme-ui";
import React from "react";
import { useSlateStatic } from "slate-react";
import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import { CldUploadWidget } from "next-cloudinary";
import { Path, Transforms } from "slate";

import { PostContext } from "../../PostContext";
import { updatePost } from "../../../graphql/mutations";
import { UpdatePostMutation } from "../../../API";
import { CloudinaryImage } from "../../../types/common";
import { EditorContext } from "./EditorContext";
import ImagesButton from "./PostMenu/buttons/ImagesButton";

const AddImage = ({ path }: { path: Path }) => {
  const { setIsNewComponentMenuOpen, setMobileMenu, mobileMenu } =
    React.useContext(EditorContext);
  const { setPost, images, id } = React.useContext(PostContext);
  const [isOpen, setIsOpen] = React.useState(false);
  const editor = useSlateStatic();

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

  const insertImage = (selectedImage: CloudinaryImage) => {
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
      { at: path }
    );
    if (path.length > 2) {
      Transforms.liftNodes(editor);
    }

    setMobileMenu({
      top: 0,
      left: 0,
      display: false,
      path: path,
      isFullScreen: false,
    });
    setIsNewComponentMenuOpen(false);
    const selection = window.getSelection();
    selection && selection.removeAllRanges();
    setIsOpen(false);
  };
  const { theme } = useThemeUI();

  return (
    <>
      {/* https://demo.cloudinary.com/uw/#/ */}
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
        onSuccess={async (result) => {
          const uploadImage = result.info as CloudinaryImage;
          images?.push(result.info as CloudinaryImage);

          if (images) {
            setPost({ images: [...images] });
            insertImage(uploadImage);

            try {
              const response = (await API.graphql({
                authMode: "AMAZON_COGNITO_USER_POOLS",
                query: updatePost,
                variables: {
                  input: {
                    images: JSON.stringify(images),
                    id: id,
                  },
                },
              })) as GraphQLResult<UpdatePostMutation>;
            } catch (errors) {
              console.error(errors);
            }
          }
        }}
      >
        {({ open }) => {
          return (
            <Box
              onClick={() => openModal(open)}
              variant="boxes.sidebarMenuItem"
              sx={{
                cursor: "pointer",
              }}
            >
              <Flex sx={{ alignItems: "center", gap: "20px" }}>
                <Box
                  sx={{
                    width: "16px",
                    height: "auto",
                  }}
                >
                  <ImagesButton />
                </Box>
                <Text
                  as="span"
                  sx={{
                    color: "text",
                    fontSize: "14px",
                  }}
                >
                  Image
                </Text>
              </Flex>
            </Box>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default AddImage;
