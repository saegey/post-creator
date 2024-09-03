import { Box, Flex, Button } from "theme-ui";
import React from "react";
import { getCldImageUrl } from "next-cloudinary";

import { PostContext } from "../../PostContext";
import OptionsIcon from "../../icons/OptionsIcon";
import Dropdown from "../../shared/Dropdown";
import { EditorContext } from "../Editor/EditorContext";
import PhotoCaptionModal from "../Image/PhotoCaptionModal";
import { useClickOutside } from "../../../utils/ux";
import PostHeaderTextBlock from "./PostHeaderTextBlock";
import { cloudUrl } from "../../../utils/cloudinary";
import { HeroBannerType } from "../../../types/common";
import { useViewport } from "../../ViewportProvider";
import Image from "next/image";
import AddImage from "../Image/AddImage";
import useOptionsMenu from "../../../hooks/useSlateOptionsMenu";
import { useSlateContext } from "../../SlateContext";

const HeroBanner = ({ element }: { element: HeroBannerType }) => {
  const { title, postLocation, date, subhead } = React.useContext(PostContext);
  const { editor, currentPath: path } = useSlateContext();

  const {
    setIsHeroImageModalOpen,
    setIsPhotoCaptionOpen,
    isPhotoCaptionOpen,
    setMobileMenu,
    isHeroImageModalOpen,
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

  if (!editor) {
    return <></>;
  }

  const { optionsMenu, isOptionsOpen } = useOptionsMenu(editor, path);

  // const menu = React.useMemo(() => {
  //   return optionsMenu;
  //   return (
  //     <Box
  //       sx={{ position: "absolute", right: "10px", top: "20px" }}
  //       contentEditable={false}
  //     >
  //       <Box
  //         sx={{ position: "relative" }}
  //         ref={wrapperRef}
  //         contentEditable={false}
  //       >
  //         <OptionsIcon
  //           onClick={() => {
  //             if (isMenuOpen) {
  //               setIsMenuOpen(false);
  //             } else {
  //               setIsMenuOpen(true);
  //             }
  //           }}
  //         />
  //         <Dropdown isOpen={isMenuOpen}>
  //           <Box
  //             onClick={(e) => {
  //               e.preventDefault(); // Prevent the default focus behavior
  //               (document.activeElement as HTMLElement)?.blur(); // Blur the active element to remove focus
  //               setMobileMenu({
  //                 display: false,
  //                 top: 0,
  //                 left: 0,
  //                 path: [0, 0],
  //                 isFullScreen: false,
  //               });

  //               setIsPhotoCaptionOpen(true);
  //               setIsMenuOpen(false);
  //             }}
  //             onTouchStart={(e) => {
  //               e.preventDefault();
  //               (document.activeElement as HTMLElement)?.blur(); // Blur the active element to remove focus
  //             }}
  //             variant="boxes.dropdownMenuItem"
  //           >
  //             Photo Caption
  //           </Box>
  //           <Box
  //             onClick={(e) => {
  //               e.preventDefault(); // Prevent the default focus behavior
  //               (document.activeElement as HTMLElement)?.blur(); // Blur the active element to remove focus

  //               setIsHeroImageModalOpen(true);
  //               setIsMenuOpen(false);
  //               setMobileMenu({
  //                 display: false,
  //                 top: 0,
  //                 left: 0,
  //                 path: [0, 0],
  //                 isFullScreen: false,
  //               });
  //             }}
  //             onTouchStart={(e) => {
  //               e.preventDefault();
  //               (document.activeElement as HTMLElement)?.blur(); // Blur the active element to remove focus
  //             }}
  //             variant="boxes.dropdownMenuItem"
  //           >
  //             Change Image
  //           </Box>
  //         </Dropdown>
  //       </Box>
  //     </Box>
  //   );
  // }, [isOptionsOpen]);

  const heroBannerMemo = React.useMemo(() => {
    const imageUrl = element.image
      ? getCldImageUrl(
          {
            src: element.image?.public_id,
            // width: width < 690 ? width : 690,
            height: element.image?.height / (element.image?.width / imageWidth),
          },
          {
            cloud: {
              cloudName: cloudUrl,
            },
          }
        )
      : undefined;
    console.log("HeroBannerMemo", element);
    return (
      <>
        <Box
          sx={{
            width: "100%",
            maxWidth: "690px",
            marginBottom: "60px",
          }}
          contentEditable={false}
        >
          <Flex
            sx={{
              height: "fit-content",
              flexDirection: ["column", "row", "row"],
              width: "100%",
            }}
          >
            {!element.image && (
              <Flex
                sx={{
                  width: ["100%", "65%", "65%"],
                  height: "200px",
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
                    onClick={(e) => {
                      e.preventDefault(); // Prevent the default focus behavior
                      (document.activeElement as HTMLElement)?.blur(); // Blur the active element to remove focus

                      setIsHeroImageModalOpen(true);
                    }}
                  >
                    Add Image
                  </Button>
                </Flex>
              </Flex>
            )}
            {element.image && element !== null ? (
              <Flex
                sx={{
                  backgroundColor:
                    element.image && element.image.colors
                      ? element.image.colors[0]
                      : "black",
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
            {optionsMenu}dfdfd
          </Flex>
        </Box>
      </>
    );
  }, [isMenuOpen, title, postLocation, date, subhead, element.image]);

  return (
    <>
      {/* {isPhotoCaptionOpen && <PhotoCaptionModal element={element} />}
      {isHeroImageModalOpen && <AddImage element={element} />} */}
      {heroBannerMemo}
    </>
  );
};

export default HeroBanner;
