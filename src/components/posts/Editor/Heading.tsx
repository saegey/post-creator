import { Text } from "theme-ui";
import HoverAction from "./HoverAction";
import { HeadingElement } from "../../../types/common";

const Heading = ({
  children,
  element,
}: {
  children: JSX.Element;
  element: HeadingElement;
}) => {
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
