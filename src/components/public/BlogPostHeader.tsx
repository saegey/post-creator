import React from "react";
import { Avatar, Box, Flex, Text, Link as ThemeLink } from "theme-ui";
import Link from "next/link";

import ChevronLeft from "../icons/ChevronLeft";
import moment from "moment";
import PostType from "../../../interfaces/post";

const BlogPostHeader = ({ post }: { post: PostType }) => {
  return (
    <Flex
      sx={{
        justifyContent: "center",
        backgroundColor: "blogHeaderBackground",
        paddingTop: "176px",
        paddingBottom: "80px",
      }}
    >
      <Box
        as="section"
        sx={{
          maxWidth: "1280px",
          width: "100%",
          marginTop: [0, 0, 0],
          marginBottom: "60px",
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
              <ChevronLeft sx={{ color: "text" }} />
              <Text
                as="div"
                sx={{
                  marginBottom: "58px",
                  lineHeight: "34px",
                  fontWeight: 400,
                  fontSize: "26px",
                  color: "text",
                }}
              >
                Blog
              </Text>
            </Flex>
          </ThemeLink>
          <Text
            as="h1"
            sx={{
              marginBottom: "16px",
              fontSize: ["40px", "40px", "56px"],
              fontWeight: 400,
              lineHeight: ["48px", "48px", "64px"],
              letterSpacing: "-2px",
            }}
          >
            {post.title}
          </Text>

          <Text
            as="p"
            sx={{
              marginBottom: "30px",
              paddingTop: "16px",
              fontSize: "16px",
              lineHeight: "28px",
              fontWeight: 300,
            }}
          >
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
        </Flex>
      </Box>
    </Flex>
  );
};

export default BlogPostHeader;
