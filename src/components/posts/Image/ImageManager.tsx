import {
  Box,
  Flex,
  Button,
  Text,
  ThemeUIStyleObject,
  Theme,
  IconButton,
  Grid,
} from "theme-ui";
import React from "react";
import { CldImage } from "next-cloudinary";
import { Editor } from "slate";

import { PostContext } from "../../PostContext";
import { CloudinaryImage, CustomElement } from "../../../types/common";
import { cloudUrl } from "../../../utils/cloudinary";
import StandardModal from "../../shared/StandardModal";
import { EditorContext } from "../Editor/EditorContext";
import { useSlateContext } from "../../SlateContext";
import { updateHeroImage } from "../../../utils/SlateUtilityFunctions";
import UploadIcon from "../../icons/UploadIcon";
import { lighten } from "@theme-ui/color";

const ImageManager = () => {
  const [selectedImage, setSelectedImage] = React.useState<CloudinaryImage>();
  const { images } = React.useContext(PostContext);
  const {
    menuPosition,
    setIsChangeImageModalOpen,
    isChangeImageModalOpen,
    setIsHeroImageModalOpen,
  } = React.useContext(EditorContext);

  const { editor, slateRef } = useSlateContext();

  if (!editor && menuPosition.path) {
    return;
  }
  const boxesData = [1, 2, 3, 4];

  return (
    <>
      <StandardModal
        title={"Media"}
        onClose={() => setIsChangeImageModalOpen(false)}
        setIsOpen={setIsChangeImageModalOpen}
        isOpen={isChangeImageModalOpen}
        topRight={
          <IconButton
            onClick={() => {
              // console.log("open modal");
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
            <UploadIcon />
          </IconButton>
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
                gap: "20px",
                marginTop: "20px",
                overflow: "auto",
                maxHeight: "calc(100% - 70px)",
                flexDirection: "column",
              }}
            >
              <Grid gap={2} columns={[2, 3, 4]}>
                {images && images.length > 0
                  ? images.map((image, i) => {
                      return (
                        <Box
                          sx={{
                            backgroundColor: "background",
                            height: "100%",
                            flexDirection: "row",
                            borderRadius: "5px",
                            border:
                              selectedImage &&
                              image.secure_url === selectedImage.secure_url
                                ? "2px solid blue"
                                : "none",
                          }}
                          key={`image-media-${i}`}
                          onClick={() => {
                            setSelectedImage(image);
                          }}
                        >
                          <Flex
                            sx={{
                              marginX: "auto",
                            }}
                            key={`image-${i}`}
                          >
                            <Box sx={{ margin: "auto", height: "fit-content" }}>
                              <CldImage
                                width={250}
                                height={250}
                                src={image.public_id}
                                underlay={image.public_id}
                                quality={90}
                                sizes="100vw"
                                alt="Description of my image"
                                style={{
                                  height: "auto",
                                  maxWidth: "100%",
                                }}
                                config={{
                                  cloud: {
                                    cloudName: cloudUrl,
                                  },
                                }}
                              />
                            </Box>
                          </Flex>
                        </Box>
                      );
                    })
                  : boxesData.map((box, index) => (
                      <Box
                        key={index} // It's a good idea to provide a unique key
                        sx={{
                          width: "100%",
                          height: "150px",
                          backgroundColor: "surface",
                          borderRadius: "5px",
                        }}
                      />
                    ))}
              </Grid>
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
            variant="secondaryButton"
            onClick={() => setIsChangeImageModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primaryButton"
            onClick={async () => {
              console.log("selectedImage", selectedImage);
              if (editor && menuPosition.path) {
                // Fetch the existing node data at the specific path
                // const existingNode = Node.get(editor, menuPosition.path);
                // Get the node at the specified path
                const [node] = Editor.node(editor, menuPosition.path);

                // If you're targeting a specific child node (like the heroBanner), ensure you're at the correct path
                // const heroBannerElement = node.children?.find(
                //   (child) => "type" in child && child.type === "heroBanner"
                // );

                const heroBannerElement = (
                  node.children as CustomElement[]
                ).find(
                  (child) => "type" in child && child.type === "heroBanner"
                );
                if (!heroBannerElement) {
                  throw new Error("Hero banner element not found");
                }

                console.log(heroBannerElement, menuPosition.path);

                if (heroBannerElement === undefined) {
                  throw new Error("Hero banner element not found");
                }

                if (selectedImage === undefined) {
                  throw new Error("No image selected");
                }

                updateHeroImage({
                  editor,
                  element: heroBannerElement,
                  path: menuPosition.path.length == 0 ? [0] : menuPosition.path,
                  image: selectedImage,
                });

                setIsChangeImageModalOpen(false); // Close the modal
              }
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
