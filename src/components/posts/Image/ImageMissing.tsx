import { AspectRatio, Box, Flex, Text } from "theme-ui";
import ImagesIcon from "../../icons/ImagesIcon";

const ImageMissing = () => (
  <Box contentEditable={false}>
    <AspectRatio
      ratio={16 / 9}
      sx={{
        backgroundColor: "error",
        borderRadius: [0, "5px", "5px"],
      }}
    >
      <Flex
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <ImagesIcon />
        <Text>Missing image</Text>
      </Flex>
    </AspectRatio>
  </Box>
);

export default ImageMissing;
