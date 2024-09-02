import React from "react";
import { Box, Flex, Text } from "theme-ui";

import TOCLink from "./TOCLink";

const BlogPostTOC = ({
  toc,
}: {
  toc: Array<{ id: string; title: string }>;
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        marginX: ["16px", "16px", "16px"],
        gridArea: ["2/1/3/2", "1/2/4/3", "1/2/4/3"],
      }}
    >
      <Box sx={{ top: "120px", position: "sticky" }}>
        <Text
          as="h6"
          sx={{
            textTransform: "uppercase",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "20px",
            marginBottom: "16px",
            height: "48px",
            borderBottomColor: "publicBlogDivider",
            borderBottomWidth: "1px",
            borderBottomStyle: "solid",
          }}
        >
          Contents
        </Text>
        <Flex sx={{ flexDirection: "column" }}>
          {toc.map((node) => (
            <TOCLink key={node.id} node={node} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default BlogPostTOC;
