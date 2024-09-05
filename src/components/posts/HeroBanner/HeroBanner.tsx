import { Box, Flex } from "theme-ui";
import React from "react";
import { getCldImageUrl } from "next-cloudinary";

import { PostContext } from "../../PostContext";
import PostHeaderTextBlock from "./PostHeaderTextBlock";
import { cloudUrl } from "../../../utils/cloudinary";
import { HeroBannerType } from "../../../types/common";
import { useViewport } from "../../ViewportProvider";
import { useSlateContext } from "../../SlateContext";
import DefaultImage from "./DefaultImage";
import HeroImage from "./HeroImage";
import useOptionsMenu from "../../../hooks/useSlateOptionsMenu";
import AddImage from "../Image/AddImage";
import { EditorContext } from "../Editor/EditorContext";

const HeroBanner = ({ element }: { element: HeroBannerType }) => {
  const { title, postLocation, date, subhead } = React.useContext(PostContext);
  const { editor, currentPath: path } = useSlateContext();
  const { isHeroImageModalOpen } = React.useContext(EditorContext);
  if (!editor) {
    return <></>;
  }
  const { optionsMenu } = useOptionsMenu(editor, path ? path : [], {
    position: "absolute",
    right: "10px",
    top: "10px",
  });

  const { width } = useViewport();
  const imageWidth = width < 690 ? width : 690;

  const heroBannerMemo = React.useMemo(() => {
    const imageUrl = element.image
      ? getCldImageUrl(
          {
            src: element.image?.public_id,
            height: element.image?.height / (element.image?.width / imageWidth),
          },
          {
            cloud: {
              cloudName: cloudUrl,
            },
          }
        )
      : undefined;

    return (
      <>
        <Box
          sx={{
            width: "100%",
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
            {element.image && element !== null && imageUrl ? (
              <HeroImage element={element} imageUrl={imageUrl} />
            ) : (
              <DefaultImage element={element} />
            )}

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
            />
          </Flex>
        </Box>
      </>
    );
  }, [title, postLocation, date, subhead, element.image]);

  return (
    <>
      {/* {isHeroImageModalOpen && <AddImage element={element} />} */}
      {heroBannerMemo}
      {optionsMenu}
    </>
  );
};

export default HeroBanner;
