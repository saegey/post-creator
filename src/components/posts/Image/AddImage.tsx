import { Box, Flex, Button } from "theme-ui";
import React from "react";
import { CldImage } from "next-cloudinary";
import { Editor } from "slate";

import { PostContext } from "../../PostContext";
import { CloudinaryImage } from "../../../types/common";
import { cloudUrl } from "../../../utils/cloudinary";
import StandardModal from "../../shared/StandardModal";
import { EditorContext } from "../Editor/EditorContext";
import { useSlateContext } from "../../SlateContext";
import AddMediaComponent from "../Editor/AddMediaComponent";
import { updateHeroImage } from "../../../utils/SlateUtilityFunctions";
import { updateImages } from "../../../utils/editorActions";

const AddImage = () => {
  const [selectedImage, setSelectedImage] = React.useState<CloudinaryImage>();

  const { setPost, images, id } = React.useContext(PostContext);
  const { setIsHeroImageModalOpen, isHeroImageModalOpen, menuPosition } =
    React.useContext(EditorContext);

  const { editor, slateRef } = useSlateContext();

  if (!editor && menuPosition.path) {
    return;
  }

  console.log("slateRef", slateRef);

  return (
    <>
      <StandardModal
        title={"Add Image"}
        setIsOpen={() => setIsHeroImageModalOpen(false)}
        isOpen={isHeroImageModalOpen}
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
          <Box>
            <Button
              onClick={() => {
                console.log("open modal");
                setIsHeroImageModalOpen(true);
              }}
              variant="primaryButton"
            >
              Add Image
            </Button>
            {/* <AddMediaComponent
              onClose={() => console.log("close media")}
              ref={addMediaRef}
              uploadPreset="epcsmymp"
              onSuccess={async (d) => {
                images?.push(d.info as CloudinaryImage);

                if (images) {
                  setPost({ images: [...images] });
                  updateImages(id, images);
                }
              }}
            /> */}
          </Box>
          <Box sx={{ height: "calc(100% + 0px)" }}>
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
              {images &&
                images.map((image, i) => {
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
                            width={(image.width / image.height) * 250}
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
                })}
            </Flex>
          </Box>
        </Flex>
        <Box
          sx={{
            flex: "0 1 40px",
            display: "flex",
            paddingLeft: "0px",
            paddingTop: "10px",
            borderTopWidth: "1px",
            borderTopStyle: "solid",
            borderTopColor: "border",
          }}
        >
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
                const heroBannerElement = node.children?.find(
                  (child) => child.type === "heroBanner"
                );
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

                setIsHeroImageModalOpen(false); // Close the modal
              }
            }}
            disabled={selectedImage ? false : true}
          >
            Choose
          </Button>
        </Box>
      </StandardModal>
    </>
  );
};

export default AddImage;
