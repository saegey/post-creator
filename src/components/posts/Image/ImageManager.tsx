import {
  Box,
  Flex,
  Button,
  Text,
  ThemeUIStyleObject,
  Theme,
  IconButton,
  Grid,
  AspectRatio,
} from "theme-ui";
import React from "react";
import { CldImage } from "next-cloudinary";
import { Transforms } from "slate";
import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import { lighten } from "@theme-ui/color";

import { PostContext } from "../../PostContext";
import {
  CloudinaryImage,
  CustomElement,
  ImageElementType,
} from "../../../types/common";
import { cloudUrl } from "../../../utils/cloudinary";
import StandardModal from "../../shared/StandardModal";
import { EditorContext } from "../Editor/EditorContext";
import { useSlateContext } from "../../SlateContext";
import UploadIcon from "../../icons/UploadIcon";

import { UpdatePostMutation } from "../../../API";
import { updatePostImages } from "../../../graphql/customMutations";
import ImagesIcon from "../../icons/ImagesIcon";
import DeleteIcon from "../../icons/DeleteIcon";

const ImageManager = () => {
  const [selectedImage, setSelectedImage] = React.useState<CloudinaryImage>();
  const { images, setPost, id } = React.useContext(PostContext);
  const {
    menuPosition,
    setIsChangeImageModalOpen,
    isChangeImageModalOpen,
    setIsHeroImageModalOpen,
  } = React.useContext(EditorContext);
  const { path } = menuPosition;
  const { editor } = useSlateContext();

  if (!editor && menuPosition.path) {
    return;
  }

  return (
    <>
      <StandardModal
        title={"Media"}
        onClose={() => setIsChangeImageModalOpen(false)}
        setIsOpen={setIsChangeImageModalOpen}
        isOpen={isChangeImageModalOpen}
        topRight={
          <Button
            variant="primaryButton"
            onClick={() => {
              setIsHeroImageModalOpen(true);
            }}
            sx={{
              cursor: "pointer",
              color: "primary",
              backgroundColor: "surface",
              "&:hover": { backgroundColor: lighten("surface", 0.05) },
              marginBottom: "5px",
            }}
          >
            <Flex sx={{ alignItems: "center", gap: "2px" }}>
              <IconButton
                as="div"
                sx={{
                  width: ["24px", "24px", "24px"],
                  height: ["24px", "24px", "24px"],
                }}
              >
                <UploadIcon />
              </IconButton>
              <Text>Upload</Text>
            </Flex>
          </Button>
        }
        heading={
          <Flex sx={{ flexDirection: "row" }}>
            <Text
              as="div"
              sx={
                {
                  fontSize: "20px",
                  fontWeight: 600,
                } as ThemeUIStyleObject<Theme>
              }
            >
              Images
            </Text>
          </Flex>
        }
      >
        <Flex
          sx={{
            marginY: "15px",
            flexDirection: "column",
            height: "calc(100% - 300px)",
            flexGrow: ["1", "inherit", "inherit"],
            overflowY: "scroll",
          }}
        >
          <Box sx={{ height: "calc(100% + 0px)", maxHeight: "500px" }}>
            <Flex
              sx={{
                flex: "1 1 auto",
                overflow: "auto",
                maxHeight: "calc(100% - 70px)",
                flexDirection: "column",
              }}
            >
              {images && (
                <Grid
                  gap={3}
                  columns={[2, 3, 4]}
                  sx={{ width: "100%", margin: "auto" }}
                >
                  {images &&
                    images.length > 0 &&
                    images.map((image, i) => {
                      return (
                        <Box
                          sx={{
                            borderStyle: "solid",

                            borderWidth: "2px",
                            borderColor:
                              selectedImage &&
                              image.secure_url === selectedImage.secure_url
                                ? "accent"
                                : "transparent",
                            borderRadius: "5px",
                          }}
                          key={`image-media-${i}`}
                          onClick={() => {
                            setSelectedImage(image);
                          }}
                        >
                          <AspectRatio
                            ratio={4 / 3}
                            sx={{
                              bg: "surface",
                              borderRadius: 5,
                              overflow: "hidden",
                            }}
                          >
                            <CldImage
                              width={250}
                              height={250}
                              src={image.public_id}
                              underlay={image.public_id}
                              quality={90}
                              sizes="100vw"
                              alt="Description of my image"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                              config={{
                                cloud: {
                                  cloudName: cloudUrl,
                                },
                              }}
                            />
                          </AspectRatio>
                        </Box>
                      );
                    })}
                </Grid>
              )}
              {!images ||
                (images.length === 0 && (
                  <Flex
                    sx={{
                      width: "100%",
                      height: "300px",
                      justifyContent: "center",
                      alignItems: "center",
                      // color: "surfaceAccent",
                      backgroundColor: "surface",
                      borderRadius: "5px",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: "border",
                    }}
                  >
                    <ImagesIcon sx={{ color: "surfaceAccent" }} />
                    <Text sx={{ fontSize: 3, color: "surfaceAccent" }}>
                      No images uploaded yet.
                    </Text>
                  </Flex>
                ))}
            </Flex>
          </Box>
        </Flex>
        <Flex
          sx={{
            paddingTop: "10px",
            borderTopWidth: "1px",
            borderTopStyle: "solid",
            borderTopColor: "border",
            justifyContent: "right",
            gap: "10px",
          }}
        >
          <Button
            id="delete-image"
            variant="dangerButton"
            type="button"
            onClick={async (e) => {
              if (!images || !selectedImage) {
                throw new Error("No images or selected image");
              }
              const updatedImages = images.filter(
                (image) => image.public_id !== selectedImage.public_id
              );
              setPost({
                images: updatedImages,
              });

              try {
                const response = (await API.graphql({
                  authMode: "AMAZON_COGNITO_USER_POOLS",
                  query: updatePostImages,
                  variables: {
                    input: {
                      images: JSON.stringify(updatedImages),
                      id: id,
                    },
                  },
                }))  as GraphQLResult<UpdatePostMutation>;
              } catch (errors) {
                console.error(errors);
              }
            }}
            disabled={selectedImage ? false : true}
          >
            <Flex sx={{ alignItems: "center", gap: "2px" }}>
              <IconButton
                as="div"
                sx={{
                  width: ["24px", "24px", "24px"],
                  height: ["24px", "24px", "24px"],
                }}
              >
                <DeleteIcon />
              </IconButton>
              <Text>Delete</Text>
            </Flex>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="secondaryButton"
            onClick={() => setIsChangeImageModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primaryButton"
            onClick={async () => {
              if (!selectedImage) {
                throw new Error("No image selected");
              }
              if (!editor) {
                throw new Error("Editor is not defined");
              }
              if (
                menuPosition.path.length === 0 ||
                (menuPosition.path.length === 1 && menuPosition.path[0] === 0)
              ) {
                Transforms.setNodes<CustomElement>(
                  editor,
                  { image: selectedImage },
                  {
                    at: [0],
                  }
                );
                setIsChangeImageModalOpen(false);
                return;
              }

              Transforms.insertNodes(
                editor,
                {
                  type: "image",
                  asset_id: selectedImage.asset_id,
                  public_id: selectedImage.public_id,
                  children: [{ text: "" }],
                  void: true,
                  photoCaption: "",
                } as ImageElementType,
                {
                  at: menuPosition.path,
                }
              );

              if (path.length > 1) {
                Transforms.liftNodes(editor);
              }

              setIsChangeImageModalOpen(false);
            }}
            disabled={selectedImage ? false : true}
          >
            Select
          </Button>
        </Flex>
      </StandardModal>
    </>
  );
};

export default ImageManager;
