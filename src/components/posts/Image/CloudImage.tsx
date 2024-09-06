import { Box, Flex } from "theme-ui";
import Image from "next/image";

import { CloudinaryImage } from "../../../types/common";
import MaximizeIcon from "../../icons/MaximizeIcon";

type MemoizedImageProps = {
  imageUrl: string;
  imageMeta: CloudinaryImage;
  selected: boolean;
  focused: boolean;
  onMaximize: () => void;
};

const CloudImage = ({
  imageUrl,
  imageMeta,
  selected,
  focused,
  onMaximize,
}: MemoizedImageProps) => {
  // console.log("rendering CloudImage", imageMeta);
  return (
    <figure>
      <Flex
        sx={{
          width: "100%",
          height: "auto",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: imageMeta?.colors ? imageMeta.colors[0] : "white",
          borderRadius: [0, "5px", "5px"],
        }}
      >
        <Image
          src={imageUrl}
          alt="Uploaded"
          width={600}
          height={500}
          style={{
            maxWidth: "100%",
            height: "auto",
            boxShadow: selected && focused ? "0 0 0 3px #B4D5FF" : "none",
          }}
          priority={true}
        />
      </Flex>
      <Box
        sx={{
          position: "absolute",
          right: "10px",
          top: "10px",
          cursor: "pointer",
        }}
        onClick={onMaximize}
      >
        <MaximizeIcon />
      </Box>
    </figure>
  );
};

export default CloudImage;
