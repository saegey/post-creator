import React from "react";
import { Box, Flex, Text } from "theme-ui";

const FeatureHighlightItem = ({
  icon,
  content,
}: {
  icon: JSX.Element;
  content: JSX.Element;
}) => {
  return (
    <Flex>
      <Box
        sx={{
          marginRight: "20px",
          alignSelf: "center",
          flex: "none",
        }}
      >
        <Flex sx={{ width: "24px", height: "24px" }}>{icon}</Flex>
      </Box>
      <Text as="p" sx={{ fontSize: "16px", lineHeight: "24px" }}>
        {content}
      </Text>
    </Flex>
  );
};

export default FeatureHighlightItem;
