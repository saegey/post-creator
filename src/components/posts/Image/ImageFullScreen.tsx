import { Box, Close, Flex, Text } from "theme-ui";
import React from "react";
import { CldImage } from "next-cloudinary";
import { Slide } from "react-slideshow-image";

import { cloudUrl } from "../../../utils/cloudinary";
import { PostContext } from "../../PostContext";

import "react-slideshow-image/dist/styles.css";

const ImageFullScreen = ({
  setIsMaximized,
  width,
  height,
  public_id,
  index,
}: {
  setIsMaximized: React.Dispatch<React.SetStateAction<boolean>>;
  width: number;
  height: number;
  public_id: string;
  index: number;
}) => {
  const [currentIndex] = React.useState(index);
  const { images } = React.useContext(PostContext);

  if (!images) {
    throw Error("musts have images");
  }

  const backArrow = (
    <Box
      sx={{
        padding: ["5px", "5px", "5px"],
        backgroundColor: `rgba(var(--theme-ui-colors-blackBoxColor), ${0.4})`,
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          width: ["20px", "20px", "30px"],
          height: ["20px", "20px", "30px"],
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 6L9 12L15 18"
            stroke="var(--theme-ui-colors-background)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>
    </Box>
  );

  const forwardArrow = (
    <Box
      sx={{
        padding: ["5px", "5px", "5px"],
        backgroundColor: `rgba(var(--theme-ui-colors-blackBoxColor), ${0.4})`,
        cursor: "pointer",
      }}
    >
      <Box sx={{ width: ["20px", "20px", "30px"], height: "auto" }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 6L15 12L9 18"
            stroke="var(--theme-ui-colors-background)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        position: "fixed",
        top: "0",
        height: "100%",
        width: "100%",
        left: "0",
        backgroundColor: "text",
        zIndex: 200,
        display: "flex",
      }}
    >
      <Box sx={{ display: "block", height: "auto", width: "100%" }}>
        <Slide
          autoplay={false}
          prevArrow={backArrow}
          nextArrow={forwardArrow}
          transitionDuration={500}
          defaultIndex={currentIndex}
        >
          {images.map((image, index) => (
            <Box
              sx={{
                display: "flex",
                height: "100%",
                width: "100%",
                backgroundColor: "black",
              }}
            >
              <CldImage
                key={image.public_id}
                width={image.width}
                height={image.height}
                src={image.public_id}
                sizes="100vw"
                alt="race pic"
                quality={90}
                style={{
                  objectFit: "contain",
                  height: "100vh",
                  width: "100vw",
                  borderRadius:
                    image.width && image.height && image.width > image.height
                      ? "5px"
                      : "0px",
                }}
                config={{
                  cloud: {
                    cloudName: cloudUrl,
                  },
                }}
              />
            </Box>
          ))}
        </Slide>
      </Box>
      <Flex
        sx={{
          justifyContent: "right",
          padding: "15px",
          position: "absolute",
          width: "100%",
          zIndex: 1,
        }}
      >
        <Close
          onClick={() => {
            setIsMaximized(false);
          }}
          sx={{ color: "background" }}
        />
      </Flex>
    </Box>
  );
};

export default ImageFullScreen;
