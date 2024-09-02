import React from "react";
import { Avatar, Box, Flex, Text } from "theme-ui";

import SocialShare from "./SocialShare";
import moment from "moment";

const BlogPostShare = () => {
  return (
    <Flex
      sx={{
        marginTop: "16px",
        gap: "16px",
        marginBottom: "200px",
        maxWidth: "1280px",
        marginX: ["16px", "16px", "16px"],
        borderTop: "1px solid #e7e8eb",
        paddingTop: "24px",
        flexDirection: ["column", "row", "row"],
      }}
    >
      <Flex sx={{ width: "100%", gap: "16px" }}>
        <Avatar
          src={post.author.picture}
          sx={{ height: "64px", width: "64px" }}
        />
        <Box>
          <Text
            as="div"
            sx={{
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "24px",
            }}
          >
            {post.author.name}
          </Text>
          <Text
            as="div"
            sx={{
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "24px",
            }}
          >
            {moment(post.date).format("MMMM D, YYYY")}
          </Text>
        </Box>
      </Flex>
      <Flex sx={{ flexDirection: "column", width: "100%" }}>
        <Text
          sx={{
            textAlign: ["center", "right", "right"],
            fontSize: "16px",
            fontWeight: 300,
          }}
        >
          Share article
        </Text>
        <SocialShare />
      </Flex>
    </Flex>
  );
};

export default BlogPostShare;
