import React from "react";
import { Avatar, Box, Flex, Text, Link as ThemeLink } from "theme-ui";
import Link from "next/link";

import moment from "moment";
import PostType from "../../../interfaces/post";
import BackIcon from "../icons/BackIcon";

const BlogPostHeader = ({ post }: { post: PostType }) => {
  return (
    <Flex
      sx={{
        justifyContent: "center",
        paddingTop: ["60px", "176px", "176px"],
        paddingBottom: ["0px", "80px", "80px"],
      }}
    >
      <Box
        as="section"
        sx={{
          maxWidth: "1280px",
          width: "100%",
          marginTop: [0, 0, 0],
          // marginBottom: "60px",
        }}
      >
        <Flex
          sx={{
            alignItems: "flex-start",
            marginX: ["16px", "16px", "16px"],
            flexDirection: "column",
          }}
        >
          <ThemeLink as={Link} href="/blog" sx={{ textDecoration: "none" }}>
            <Flex>
              <BackIcon sx={{ color: "muted" }} />
              <Text as="div" variant="publicBlogHeaderBack">
                Blog
              </Text>
            </Flex>
          </ThemeLink>
          <Text as="h1" variant="publicBlogHeaderText">
            {post.title}
          </Text>

          <Text as="p" variant="publicBlogHeaderExcerpt">
            {post.excerpt}
          </Text>
          <Flex
            sx={{
              marginTop: "16px",
              gap: "16px",
            }}
          >
            <Avatar src={post.author.picture} />
            <Box>
              <Text as="div" variant="publicBlogAuthorName">
                {post.author.name}
              </Text>
              <Text as="div" variant="publicHeaderDate">
                {moment(post.date).format("MMMM D, YYYY")}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default BlogPostHeader;
