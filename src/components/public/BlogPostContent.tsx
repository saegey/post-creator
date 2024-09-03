import React from "react";
import { Box, Text } from "theme-ui";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

import type PostType from "../../../interfaces/post";

type PostContentProps = {
  post: PostType;
  imageSizes: Record<string, { width: number; height: number }>;
};

const BlogPostContent = ({ post, imageSizes }: PostContentProps) => {
  return (
    <Box
      sx={{
        paddingTop: "40px",
        marginX: ["16px", "16px", "16px"],
        marginBottom: "20px",
      }}
    >
      <Box
        sx={{
          p: {
            marginBottom: "24px",
            fontSize: "20px",
            fontWeight: 300,
            lineHeight: "32px",
          },
          h2: {
            marginBottom: "40px",
            fontSize: "48px",
            fontWeight: 400,
            lineHeight: "56px",
            letterSpacing: "-2px",
          },
          ul: {
            marginTop: 0,
            marginBottom: "10px",
            paddingLeft: "48px",
          },
          ol: {
            marginTop: 0,
            marginBottom: "10px",
            paddingLeft: "48px",
          },
          li: {
            paddingBottom: "8px",
            paddingLeft: "16px",
            fontSize: "20px",
            fontWeight: 300,
          },
          a: {
            color: "link",
            borderBottomColor: "link",
            borderBottomStyle: "solid",
            borderBottomWidth: "1px",
            fontWeight: 400,
            textDecoration: "none",
            transition: "all .2s",
          },
          "a:hover": {
            color: "link",
            borderBottomColor: "link",
          },
          img: {
            width: "100%",
            height: "auto",
          },
          h3: {
            marginTop: "64px",
            marginBottom: "40px",
            fontSize: "40px",
            fontWeight: 400,
            lineHeight: "48px",
          },
        }}
      >
        <ReactMarkdown
          components={{
            h2: (props) => (
              <Text
                as="h2"
                id={props.children
                  ?.toString()
                  .replace(/[^a-zA-Z\d\s-]/g, "")
                  .split(" ")
                  .join("-")
                  .toLowerCase()}
              >
                {props.children?.toString()}
              </Text>
            ),
            img: (props) => {
              if (props.src && imageSizes[props.src]) {
                const { src, alt } = props;
                const { width, height } = imageSizes[props.src];
                return (
                  <Image
                    src={src}
                    alt={alt ? alt : ""}
                    width={width}
                    height={height}
                  />
                );
              } else {
                return <img {...props} />;
              }
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </Box>
    </Box>
  );
};

export default BlogPostContent;
