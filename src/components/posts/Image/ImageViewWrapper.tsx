import { Flex, Box, Text } from "theme-ui";
import { CldImage } from "next-cloudinary";
import React from "react";

import { ImageElementType } from "../../../types/common";
import { cloudUrl } from "../../../utils/cloudinary";
import { PostContext } from "../../PostContext";
import MaximizeIcon from "../../icons/MaximizeIcon";
import ImageFullScreen from "./ImageFullScreen";

const ImageViewWrapper = ({ node }: { node: ImageElementType }) => {
  const { images } = React.useContext(PostContext);
  const [isMaximized, setIsMaximized] = React.useState(false);
  const imageMetaIndex: number | undefined = images?.findIndex(
    (i) => i.public_id === node.public_id
  );
  if (imageMetaIndex === undefined) {
    return;
  }
  const imageMeta = images ? images[imageMetaIndex] : undefined;
  const wrapperRef = React.useRef();

  return (
    <>
      {isMaximized && imageMeta?.height && imageMeta?.width && (
        <ImageFullScreen
          setIsMaximized={setIsMaximized}
          width={imageMeta?.width}
          height={imageMeta?.height}
          publicId={imageMeta.public_id}
          index={imageMetaIndex}
        />
      )}

      <Flex>
        <Box
          sx={{
            position: "relative",
            width: "900px",
            maxWidth: "900px",
            marginX: "auto",
            marginY: ["20px", "60px", "60px"],
            height: "600px",
            // maxHeight: '600px',
            marginBottom: "20px",
          }}
        >
          <Flex
            sx={{
              width: "100%",
              height: "600px",
              backgroundColor: imageMeta?.colors[0],
              borderRadius: [0, "5px", "5px"],
            }}
          >
            <CldImage
              width="1200"
              height="1200"
              src={node.public_id}
              sizes="100vw"
              alt="race pic"
              quality={90}
              style={{
                objectFit: "contain",
                // height: '100%',
                width: "100%",
                maxHeight: "100%",
                borderRadius:
                  imageMeta &&
                  imageMeta.width &&
                  imageMeta.height &&
                  imageMeta?.width > imageMeta?.height
                    ? "5px"
                    : "0px",
              }}
              config={{
                cloud: {
                  cloudName: cloudUrl,
                },
              }}
            />
          </Flex>
          <Text as="p" sx={{ paddingX: ["10px", null, null] }}>
            {node.caption}
          </Text>
          <Box
            sx={{
              position: "absolute",
              right: "10px",
              bottom: "10px",
            }}
            ref={wrapperRef}
          >
            <Box
              sx={{ width: "30px", height: "auto", cursor: "pointer" }}
              onClick={() => {
                setIsMaximized(true);
              }}
            >
              <MaximizeIcon />
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default ImageViewWrapper;
