import { Box, Flex, Text } from "theme-ui";
import Head from "next/head";

import { getAllPosts } from "../../lib/api";
import type PostType from "../../interfaces/post";
import PublicHeader from "../../src/components/public/Header/PublicHeader";
import PublicFooter from "../../src/components/public/Footer/Footer";
import BlogPostList from "../../src/components/public/BlogPostList";
import FavIcon from "../../src/components/shared/FavIcon";

type Props = {
  allPosts: Array<PostType>;
};

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "topic",
  ]);

  return {
    props: { allPosts },
  };
};

export default function Post({ allPosts }: Props) {
  return (
    <>
      <Head>
        <title>Monopad - Blog</title>
        <FavIcon />
      </Head>

      <Box
        as="main"
        sx={{
          width: "100vw",
          height: "fit-content",
          backgroundColor: "background",
        }}
      >
        <PublicHeader />
        <Flex
          sx={{
            marginX: ["16px", "0px", "0px"],
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            flexDirection: "column",
          }}
        >
          <Flex
            sx={{
              width: ["100%", "100%", "800px"],
              flexDirection: "column",
              justifyContent: "center",
              gap: "40px",
              marginTop: ["20px", "20px", "200px"],
              marginBottom: ["20px", "20px", "200px"],
            }}
          >
            <Text as="h1">Blog</Text>
            <Text as="p">
              Delve into a blog encompassing diverse articles on training
              methodologies, UI/UX insights, software innovations, and the
              intricacies of cycling in the professional realm.
            </Text>
            <Text as="p">
              Stay up to date by subscribing to our newsletter.
            </Text>
            <Flex sx={{ flexDirection: "column", gap: "80px" }}>
              <BlogPostList allPosts={allPosts} />
            </Flex>
          </Flex>
        </Flex>
        <PublicFooter />
      </Box>
    </>
  );
}
