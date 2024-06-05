import { Box, Text } from "theme-ui";
import HoverAction from "./HoverAction";
import { HeadingElement } from "../../../types/common";

const Heading = ({
  children,
  element,
}: {
  children: JSX.Element;
  element: HeadingElement;
}) => {
  const hover =
    element.children.length === 1 && element.children[0].text === "";

  if (!hover) {
    return (
      <Box
        sx={{
          position: "relative",
          width: ["100%", "690px", "690px"],
          marginX: "auto",
          marginY: "20px",
        }}
      >
        <Text
          as="h2"
          sx={{
            fontWeight: 700,
            maxWidth: "690px",
            width: ["100%", "690px", "690px"],
            marginLeft: "auto",
            marginRight: "auto",
            paddingX: ["10px", "0px", "0px"],
          }}
        >
          {children}
        </Text>
      </Box>
    );
  }
  return (
    <HoverAction element={element}>
      <Text
        as="h2"
        sx={{
          fontWeight: 700,
          maxWidth: "690px",
          width: ["100%", "690px", "690px"],
          marginLeft: "auto",
          marginRight: "auto",
          paddingX: ["10px", "0px", "0px"],
        }}
      >
        {children}
      </Text>
    </HoverAction>
  );
};

export default Heading;
