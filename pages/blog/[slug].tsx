import { useRouter } from "next/router";
import ErrorPage from "next/error";
import React from "react";
import ReactMarkdown from "react-markdown";
import sizeOf from "image-size";
import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import Image from "next/image";
import { join } from "path";
import { Avatar, Box, Flex, Grid, Text, Link as ThemeLink } from "theme-ui";

import { getPostBySlug, getAllPosts } from "../../lib/api";
import { CMS_NAME } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";
import PublicHeader from "../../src/components/public/header";
import PublicFooter from "../../src/components/public/Footer/Footer";
import SocialShare from "../../src/components/public/SocialShare";
import ChevronLeft from "../../src/components/icons/ChevronLeft";
import TOCLink from "../../src/components/public/TOCLink";

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
  // post: PostType
  // Let’s add this prop:
  imageSizes: Record<string, { width: number; height: number }>;
};

// import { useEffect, useRef, useState } from "react";

// https://claritydev.net/blog/nextjs-blog-remark-interactive-table-of-contents

export default function Post({ post, morePosts, preview, imageSizes }: Props) {
  const router = useRouter();
  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main" sx={{ height: "fit-content", width: "100vw" }}>
        <PublicHeader />
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
        <Flex
          sx={{
            justifyContent: "center",
            marginTop: ["40px", "80px", "80px"],
            backgroundColor: "publicBackground",
          }}
        >
          <Box sx={{ maxWidth: "1280px", width: "100%" }}>
            <Grid
              columns={["1fr", "1fr", "1fr 280px"]}
              gap={["16px", "16px", "120px"]}
            >
              <Box
                sx={{
                  borderBottom: "1px solid #d7d7d7",
                  paddingBottom: "20px",
                  // maxWidth: "1280px",
                  marginX: ["16px", "16px", "16px"],
                  marginBottom: "20px",
                  height: "48px",
                }}
              >
                <SocialShare />
              </Box>
              <Box
                sx={{
                  paddingTop: "40px",
                  // maxWidth: "1280px",
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
                      color: "#14191a",
                      borderBottom: "1px solid #14191a",
                      fontWeight: 400,
                      textDecoration: "none",
                      transition: "all .2s",
                    },
                    "a:hover": {
                      color: "rgba(20,25,26,.5)",
                      borderBottomColor: "rgba(20,25,26,.5)",
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
                  // dangerouslySetInnerHTML={{ __html: post.content }}
                >
                  <ReactMarkdown
                    // className={markdownStyles['markdown']}
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
                          // If we don’t have the image’s dimensions, let’s use a classic
                          // `img` element.
                          return <img {...props} />;
                        }
                      },
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </Box>
              </Box>
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
                      borderBottom: "1px solid #d7d7d7",
                    }}
                  >
                    Contents
                  </Text>
                  <Flex sx={{ flexDirection: "column" }}>
                    {post.toc.map((node) => (
                      <TOCLink node={node} />
                    ))}
                  </Flex>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Flex>
        <PublicFooter />
      </Box>
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "excerpt",
  ]);
  const content = await markdownToHtml(post.content || "");

  const imageSizes: Props["imageSizes"] = {};

  // A regular expression to iterate on all images in the post
  const iterator = post.content.matchAll(/\!\[.*]\((.*)\)/g);
  let match: IteratorResult<RegExpMatchArray, any>;
  while (!(match = iterator.next()).done) {
    const [, src] = match.value;
    try {
      // Images are stored in `public`
      const { width, height } = sizeOf(join("public", src));
      imageSizes[src] = {
        width: width ? width : 0,
        height: height ? height : 0,
      };
    } catch (err) {
      console.error(`Can't get dimensions for ${src}:`, err);
    }
  }

  return {
    props: {
      imageSizes,
      post: {
        ...post,
        content: content.result,
        toc: content.toc,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
