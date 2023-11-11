import { Box, Close, Flex, Text } from "theme-ui";
import React from "react";
import { CldImage } from "next-cloudinary";
import { Slide } from "react-slideshow-image";
// import { CSSTransition, TransitionGroup } from "react-transition-group";

import { cloudUrl } from "../../../utils/cloudinary";
import { PostContext } from "../../PostContext";
import useSwipe from "../../useSwipe";
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
  const [currentImage, setCurrentImage] = React.useState({
    width,
    height,
    public_id,
    index,
  });
  const [showMessage, setShowMessage] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(index);
  const [pastIndex, setPastIndex] = React.useState();
  const { images } = React.useContext(PostContext);
  const nodeRef = React.useRef(null);

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
      <Box sx={{ width: ["20px", "20px", "30px"], height: "auto" }}>
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
        {/* <Flex sx={{ width: "100%", height: "100%" }}> */}
        <Slide
          autoplay={false}
          prevArrow={backArrow}
          nextArrow={forwardArrow}
          // duration={1000}
          transitionDuration={500}
          defaultIndex={currentIndex}
        >
          {images.map((image, index) => (
            <Box
              sx={{
                // height: "100vh",
                display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
                height: "100%",
                width: "100%",
                backgroundColor: "black",
              }}
            >
              {/* <Box> */}
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
                  // maxHeight: "100%",
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
              {/* </Box> */}
            </Box>
          ))}
        </Slide>
        {/* </Flex> */}
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
