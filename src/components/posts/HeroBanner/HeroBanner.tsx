import { Box, Flex, Button } from "theme-ui";
import React from "react";
import { CldImage } from "next-cloudinary";

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

const HeroBanner = ({ element }: { element: HeroBannerType }) => {
  const { heroImage, title, postLocation, date, subhead } =
    React.useContext(PostContext);
  // console.log(cloudUrl);

  const { setIsHeroImageModalOpen, setIsPhotoCaptionOpen, isPhotoCaptionOpen } =
    React.useContext(EditorContext);

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
                // height: "600px",
                // "@media (min-width: 900px)": {
                //   height: "700px",
                // },
              }}
            >
              <Flex>
                <Button
                  type="button"
                  variant="primaryButton"
                  sx={{
                    marginY: "auto",
                  }}
                  onClick={() => setIsHeroImageModalOpen(true)}
                >
                  Add Image
                </Button>
              </Flex>
            </Flex>
          )}
          {heroImage && heroImage !== null ? (
            <Box
              sx={{
                backgroundColor:
                  heroImage && heroImage.colors ? heroImage.colors[0] : "black",
                width: ["100%", "65%", "65%"],
                display: ["inline-block", "", ""],
                // height: "600px",
                // "@media (min-width: 900px)": {
                //   height: "700px",
                // },
              }}
            >
              {/* <CldImage
                // priority={true}
                width={heroImage.width < 690 ? heroImage.width : 690}
                height={heroImage?.height / (heroImage?.width / imageWidth)}
                src={heroImage.public_id}
                // src={
                //   typeof window !== "undefined"
                //     ? heroImage.public_id
                //     : `https://res.cloudinary.com/${cloudUrl}/image/upload/${heroImage.public_id}.jpg`
                // }
                alt="race pic"
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                config={{
                  cloud: {
                    cloudName: cloudUrl,
                  },
                }}
              /> */}
            </Box>
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
