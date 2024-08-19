import React from "react";
import { Box, Flex } from "theme-ui";
import { CldImage } from "next-cloudinary";

import PostHeaderTextBlock from "./PostHeaderTextBlock";
import { cloudUrl } from "../../../utils/cloudinary";
import { HeroBannerType } from "../../../types/common";
import { PostContext } from "../../PostContext";

const HeroBannerViewWrapper = ({ node }: { node?: HeroBannerType }) => {
  const { heroImage, id, title, subhead, date, postLocation } =
    React.useContext(PostContext);

  console.log(heroImage);

  if (!heroImage) {
    return <Box key={`{herobanner-${id}}`} />;
  }

  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: "60px",
      }}
      key={`{herobanner-${id}}`}
    >
      <Flex
        sx={{
          height: "fit-content",
          flexDirection: ["column", "row", "row"],
          width: "100%",
        }}
      >
        {" "}
        <Box
          sx={{
            width: ["100%", "65%", "65%"],
            display: ["inline-block", "", ""],
          }}
        >
          <CldImage
            priority={true}
            width={heroImage.width}
            height={heroImage.height}
            src={heroImage.public_id}
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
          />
        </Box>
        <Box sx={{ width: ["100%", "35%", "35%"] }}>
          <PostHeaderTextBlock
            type={"Race"}
            title={title ? title : "Title"}
            teaser={subhead ? subhead : "Subhead"}
            date={date ? date : "Event date"}
            location={postLocation ? postLocation : "Location"}
            headerImageCaption={
              node?.photoCaption ? node.photoCaption : "Enter caption here"
            }
            height="100%"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default HeroBannerViewWrapper;
