import { Box, Close, Flex } from "theme-ui";
import React from "react";
import { CldImage } from "next-cloudinary";

import { cloudUrl } from "../../../utils/cloudinary";
import { PostContext } from "../../PostContext";
import useSwipe from "../../useSwipe";

const ImageFullScreen = ({
  setIsMaximized,
  width,
  height,
  publicId,
  index,
}: {
  setIsMaximized: React.Dispatch<React.SetStateAction<boolean>>;
  width: number;
  height: number;
  publicId: string;
  index: number;
}) => {
  const [currentImage, setCurrentImage] = React.useState<React.ReactNode>(
    <CldImage
      width={width}
      height={height}
      src={publicId}
      sizes="100vw"
      alt="race pic"
      quality={90}
      style={{
        objectFit: "contain",
        width: "100%",
        maxHeight: "100%",
        borderRadius: width && height && width > height ? "5px" : "0px",
        // boxShadow: `${selected && focused ? "0 0 0 3px #B4D5FF" : "none"}`,
      }}
      config={{
        cloud: {
          cloudName: cloudUrl,
        },
      }}
    />
  );
  const [currentIndex, setCurrentIndex] = React.useState(index);
  const { images } = React.useContext(PostContext);

  console.log(images);
  if (!images) {
    throw Error("musts have images");
  }
  const swipeHandlers = useSwipe({
    onSwipedLeft: () => {
      nextImage();
    },
    onSwipedRight: () => previousImage(),
  });

  const nextImage = () => {
    if (
      !images ||
      currentIndex === undefined ||
      currentIndex === images.length - 1
    ) {
      return;
    }
    const newIndex = images.length > currentIndex + 1 ? currentIndex + 1 : 0;
    const { width, height, public_id } = images[newIndex];
    setCurrentImage(
      <CldImage
        width={width}
        height={height}
        src={public_id}
        sizes="100vw"
        alt="race pic"
        quality={90}
        style={{
          objectFit: "contain",
          width: "100%",
          maxHeight: "100%",
          borderRadius: width && height && width > height ? "5px" : "0px",
        }}
        config={{
          cloud: {
            cloudName: cloudUrl,
          },
        }}
      />
    );
    setCurrentIndex(newIndex);
  };

  const previousImage = () => {
    if (!images || currentIndex === undefined || currentIndex === 0) {
      return;
    }
    const newIndex = currentIndex - 1;
    const { width, height, public_id } = images[newIndex];
    setCurrentImage(
      <CldImage
        width={width}
        height={height}
        src={public_id}
        sizes="100vw"
        alt="race pic"
        quality={90}
        style={{
          objectFit: "contain",
          width: "100%",
          maxHeight: "100%",
          borderRadius: width && height && width > height ? "5px" : "0px",
        }}
        config={{
          cloud: {
            cloudName: cloudUrl,
          },
        }}
      />
    );
    setCurrentIndex(newIndex);
  };

  return (
    <Box
      {...swipeHandlers}
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
      <Flex
        sx={{ position: "relative", width: "100%", justifyContent: "center" }}
      >
        {currentImage}
      </Flex>
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
      {currentIndex < images.length - 1 && (
        <Flex
          sx={{
            justifyContent: "right",
            alignItems: "center",
            // padding: "15px",
            position: "absolute",
            // width: "100%",
            right: "0px",
            height: "100%",
            zIndex: 0,
          }}
        >
          <Box
            sx={{
              padding: ["5px", "5px", "5px"],
              backgroundColor: `rgba(var(--theme-ui-colors-blackBoxColor), ${0.4})`,
              cursor: "pointer",
            }}
            onClick={() => {
              nextImage();
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
        </Flex>
      )}
      {currentIndex > 0 && (
        <Flex
          sx={{
            justifyContent: "left",
            alignItems: "center",
            // padding: "15px",
            position: "absolute",
            // width: "100%",
            left: "0px",
            height: "100%",
            zIndex: 0,
          }}
        >
          <Box
            sx={{
              padding: ["5px", "5px", "5px"],
              backgroundColor: `rgba(var(--theme-ui-colors-blackBoxColor), ${0.6})`,
              cursor: "pointer",
            }}
            onClick={() => {
              previousImage();
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
        </Flex>
      )}
    </Box>
  );
};

export default ImageFullScreen;
