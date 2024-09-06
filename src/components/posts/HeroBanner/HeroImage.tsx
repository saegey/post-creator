import { Box, Flex, Button } from "theme-ui";
import React from "react";
import Image from "next/image";
import { HeroBannerType } from "../../../types/common";

const HeroImage = ({
  element,
  imageUrl,
}: {
  imageUrl: string;
  element: HeroBannerType;
}) => {
  return (
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
  );
};

export default HeroImage;
