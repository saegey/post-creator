import { Box, Embed, Flex } from "theme-ui";

interface EmbedBaseProps {
  url: string;
}

const EmbedBase = ({ url }: EmbedBaseProps) => (
  <Flex
    contentEditable={false}
    sx={{
      minWidth: "100%",
      maxWidth: ["100vw", "690px", "690px"],
      height: "fit-content",
      padding: ["10px", null, null],
      marginY: ["20px", "60px", "60px"],
    }}
  >
    <Box
      sx={{
        marginX: "auto",
        width: ["100%", null, null],
        maxWidth: "690px",
        position: "relative",
      }}
    >
      <Embed
        src={url}
        sx={{
          height: ["500px", "700px", "700px"],
          width: "100%",
          border: "none",
        }}
      />
    </Box>
  </Flex>
);

export default EmbedBase;
