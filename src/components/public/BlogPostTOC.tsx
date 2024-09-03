import React from "react";
import { Box, Flex, Text } from "theme-ui";

import TOCLink from "./TOCLink";
import { TransformType } from "../../../lib/markdownToHtml";

const BlogPostTOC = ({ toc }: { toc: TransformType[] }) => {
  return (
    <Box
      sx={{
        position: "relative",
        marginX: ["16px", "16px", "16px"],
        gridArea: ["2/1/3/2", "1/2/4/3", "1/2/4/3"],
      }}
    >
      <Box sx={{ top: "120px", position: "sticky" }}>
        <Text as="h6" variant={"publicBlogTOCHeader"}>
          Contents
        </Text>
        <Flex sx={{ flexDirection: "column" }}>
          {toc.map((node) => (
            <TOCLink node={node} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default BlogPostTOC;
