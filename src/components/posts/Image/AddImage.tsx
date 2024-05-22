import { Box, Flex, Button } from "theme-ui";
import React from "react";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";

import { PostContext } from "../../PostContext";
import { updatePost } from "../../../graphql/mutations";
import { UpdatePostMutation } from "../../../API";
import SidebarLeft from "../../shared/SidebarLeft";
import { CloudinaryImage } from "../../../types/common";
import { cloudUrl } from "../../../utils/cloudinary";

interface AddImageProps {
  callback: ({
    selectedImage,
  }: {
    selectedImage: CloudinaryImage | undefined;
  }) => Promise<void>;
  setIsOpen: (arg0: boolean) => void;
}

const AddImage = ({ callback, setIsOpen }: AddImageProps) => {
  const [selectedImage, setSelectedImage] = React.useState<CloudinaryImage>();
  const { setImages, images, id } = React.useContext(PostContext);

  return (
    <>
      <SidebarLeft closeOnclick={() => setIsOpen(false)} title={"Photos"}>
        <Flex
          sx={{
            margin: "15px",
            flexDirection: "column",
            height: "calc(100% - 300px)",
          }}
        >
          <Box
            sx={{
              ".cloudButton": {
                backgroundColor: "text",
                borderRadius: "5px",
                color: "background",
                fontSize: "14px",
                fontWeight: "600",
                "&:hover": {
                  backgroundColor: "primaryButtonBackgroundHover",
                },
              },
            }}
          >
            <CldUploadButton
              className="cloudButton"
              uploadPreset="epcsmymp"
              options={{ cropping: true }}
              onSuccess={async (d) => {
                images?.push(d.info as CloudinaryImage);

                if (images) {
                  setImages && setImages([...images]);
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
            />
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
                        backgroundColor: "activityOverviewBackgroundColor",
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
            marginY: "20px",
            paddingLeft: "20px",
            paddingTop: "20px",
            borderTopWidth: "1px",
            borderTopStyle: "solid",
            borderTopColor: "divider",
          }}
        >
          <Button
            variant="primaryButton"
            onClick={async () => {
              await callback({ selectedImage });
              setIsOpen(false);
            }}
            disabled={selectedImage ? false : true}
          >
            Choose
          </Button>
        </Box>
      </SidebarLeft>
    </>
  );
};

export default AddImage;
