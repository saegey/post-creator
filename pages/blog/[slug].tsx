import { useRouter } from "next/router";
import ErrorPage from "next/error";
import React from "react";
import sizeOf from "image-size";
import Head from "next/head";
import { join } from "path";
import { Box, Flex, Grid } from "theme-ui";

import { getPostBySlug, getAllPosts } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";
import BlogPostLayout from "../../src/components/public/BlogPostLayout";
import BlogPostHeader from "../../src/components/public/BlogPostHeader";
import BlogPostContent from "../../src/components/public/BlogPostContent";
import BlogPostTOC from "../../src/components/public/BlogPostTOC";
import BlogPostShare from "../../src/components/public/BlogPostShare";

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
  imageSizes: Record<string, { width: number; height: number }>;
};

// https://claritydev.net/blog/nextjs-blog-remark-interactive-table-of-contents

export default function Post({ post, imageSizes }: Props) {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <BlogPostLayout>
        <BlogPostHeader post={post} />
        <Flex
          sx={{ justifyContent: "center", marginTop: ["40px", "80px", "80px"] }}
        >
          <Box sx={{ maxWidth: "1280px", width: "100%" }}>
            <Grid
              columns={["1fr", "1fr", "1fr 280px"]}
              gap={["16px", "16px", "120px"]}
            >
              <BlogPostContent post={post} imageSizes={imageSizes} />
              <BlogPostTOC toc={post.toc} />
            </Grid>
          </Box>
        </Flex>
        <BlogPostShare post={post} />
      </BlogPostLayout>
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
