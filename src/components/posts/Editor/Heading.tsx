import { Text } from "theme-ui";
import HoverAction from "./HoverAction";

const Heading = ({ children }: { children: JSX.Element }) => {
  return (
    <HoverAction>
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
