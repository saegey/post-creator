import React from "react";
import { Avatar, Box, Flex, Text } from "theme-ui";
import moment from "moment";

import SocialShare from "./SocialShare";
import PostType from "../../../interfaces/post";

const BlogPostShare = ({ post }: { post: PostType }) => {
  return (
    <Flex variant="boxes.publicShareSection">
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
