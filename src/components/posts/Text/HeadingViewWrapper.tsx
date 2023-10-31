import { Flex, Text } from "theme-ui";
import { HeadingElement } from "../../../types/common";

const HeadingViewWrapper = ({ node }: { node?: HeadingElement }) => {
  return (
    <>
      {node &&
        node.children.map((c, i) => {
          if (!c.text) {
            return;
          }
          return (
            <Flex
              sx={{
                maxWidth: "690px",
                width: "690px",
                marginX: "auto",
              }}
              key={`heading-two-${i}`}
            >
              <Text
                as="h2"
                sx={{
                  paddingY: "15px",
                  borderLeft: "1px solid postBorderLeft",
                  width: ["100vw", null, null],
                  maxWidth: "690px",
                  paddingX: ["20px", "8px", "8px"],
                }}
              >
                {c.text}
              </Text>
            </Flex>
          );
        })}
    </>
  );
};

export default HeadingViewWrapper;
