import { Box, Flex, Button } from "theme-ui";
import React from "react";
import { getCldImageUrl } from "next-cloudinary";

import { PostContext } from "../../PostContext";
import OptionsButton from "../../buttons/OptionsButton";
import Dropdown from "../../shared/Dropdown";
import { EditorContext } from "../Editor/EditorContext";
import PhotoCaptionModal from "../Image/PhotoCaptionModal";
import { useClickOutside } from "../../../utils/ux";
import PostHeaderTextBlock from "./PostHeaderTextBlock";
import { cloudUrl } from "../../../utils/cloudinary";
import { HeroBannerType } from "../../../types/common";
import { useViewport } from "../../ViewportProvider";
import Image from "next/image";

const HeroBanner = ({ element }: { element: HeroBannerType }) => {
  const { heroImage, title, postLocation, date, subhead } =
    React.useContext(PostContext);

  const {
    setIsHeroImageModalOpen,
    setIsPhotoCaptionOpen,
    isPhotoCaptionOpen,
    setMobileMenu,
  } = React.useContext(EditorContext);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const wrapperRef = React.useRef();
  useClickOutside(
    wrapperRef,
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setIsMenuOpen(false);
      e.stopPropagation();
    }
  );

  const { width } = useViewport();
  const imageWidth = width < 690 ? width : 690;

  const imageUrl = heroImage
    ? getCldImageUrl(
        {
          src: heroImage?.public_id,
          width: width < 690 ? width : 690,
          height: heroImage?.height / (heroImage?.width / imageWidth),
        },
        {
          cloud: {
            cloudName: cloudUrl,
          },
        }
      )
    : undefined;

  const menu = (
    <Box sx={{ position: "absolute", right: "10px", top: "20px" }}>
      <Box sx={{ position: "relative" }} ref={wrapperRef}>
        <OptionsButton
          onClick={() => {
            if (isMenuOpen) {
              setIsMenuOpen(false);
            } else {
              setIsMenuOpen(true);
            }
          }}
        />
        <Dropdown isOpen={isMenuOpen}>
          <Box
            onClick={() => {
              setIsPhotoCaptionOpen(true);
              setIsMenuOpen(false);
            }}
            variant="boxes.dropdownMenuItem"
          >
            Photo Caption
          </Box>
          <Box
            onClick={() => {
              setIsHeroImageModalOpen(true);
              setIsMenuOpen(false);
              setMobileMenu({
                display: false,
                top: 0,
                left: 0,
                path: [0, 0],
                isFullScreen: false,
              });
            }}
            variant="boxes.dropdownMenuItem"
          >
            Change Image
          </Box>
        </Dropdown>
      </Box>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          width: "100%",
          marginBottom: "60px",
        }}
        contentEditable={false}
      >
        {isPhotoCaptionOpen && <PhotoCaptionModal element={element} />}
        <Flex
          sx={{
            height: "fit-content",
            flexDirection: ["column", "row", "row"],
            width: "100%",
          }}
        >
          {!heroImage && (
            <Flex
              sx={{
                width: ["100%", "65%", "65%"],

                background: "divider",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Flex>
                <Button
                  type="button"
                  variant="primaryButton"
                  sx={{
                    marginY: "auto",
                  }}
                  onClick={() => {
                    setIsHeroImageModalOpen(true);
                  }}
                >
                  Add Image
                </Button>
              </Flex>
            </Flex>
          )}
          {heroImage && heroImage !== null ? (
            <Flex
              sx={{
                backgroundColor:
                  heroImage && heroImage.colors ? heroImage.colors[0] : "black",
                width: ["100%", "65%", "65%"],
                display: ["inline-block", "", ""],
              }}
            >
              {imageUrl && (
                <Flex
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={imageUrl}
                    alt="Uploaded"
                    width={600}
                    height={500}
                    // layout="responsive"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                    priority={true}
                  />
                </Flex>
              )}
            </Flex>
          ) : (
            <></>
          )}
          <Box sx={{ width: ["100%", "35%", "35%"] }}>
            <PostHeaderTextBlock
              type={"Race"}
              title={title ? title : "Title"}
              teaser={subhead ? subhead : "Subhead"}
              date={date ? date : "Event date"}
              location={postLocation ? postLocation : "Location"}
              headerImageCaption={
                element.photoCaption
                  ? element.photoCaption
                  : "Enter caption here"
              }
              height="100%"
            />
          </Box>

          {menu}
        </Flex>
      </Box>
    </>
  );
};

export default HeroBanner;
