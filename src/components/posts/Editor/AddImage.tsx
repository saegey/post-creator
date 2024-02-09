import { Box, Flex, Text } from "theme-ui";
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
  const { setImages, images, id } = React.useContext(PostContext);
  const editor = useSlateStatic();

  const openModal = (open: Function) => {
    setIsNewComponentMenuOpen(false);
    setMobileMenu({ ...mobileMenu, display: false });
    open();
  };

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
  };

  return (
    <>
      <CldUploadWidget
        uploadPreset="epcsmymp"
        options={{
          sources: [
            "local",
            "url",
            "camera",
            "image_search",
            "google_drive",
            // 'facebook',
            "dropbox",
            "instagram",
          ],
          styles: {
            frame: {
              background: "black",
            },
            palette: {
              window: "#FFF",
              windowBorder: "black",
              tabIcon: "black",
              menuIcons: "black",
              textDark: "#000000",
              textLight: "#FFFFFF",
              link: "black",
              action: "black",
              inactiveTabIcon: "#888888",
              error: "#F44235",
              inProgress: "#0078FF",
              complete: "#20B832",
              sourceBg: "#e4e4e4",
            },
            fonts: {
              Inter: "",
            },
          },
        }}
        onSuccess={async (result, { widget }) => {
          // async (d) => {
          const uploadImage = result.info as CloudinaryImage;
          images?.push(result.info as CloudinaryImage);

          if (images) {
            setImages && setImages([...images]);
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
          widget.close();
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
                  <ImagesButton
                    onClick={() => {
                      console.log("clicked");
                    }}
                  />
                </Box>
                <Text
                  as="span"
                  sx={{
                    color: "text",
                    fontSize: "14px",
                  }}
                >
                  Add image
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
