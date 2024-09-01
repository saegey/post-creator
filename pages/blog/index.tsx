import { Avatar, Box, Flex, Grid, Text, Link as ThemeLink } from "theme-ui";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import { getAllPosts } from "../../lib/api";
import type PostType from "../../interfaces/post";
import PublicHeader from "../../src/components/public/header";
import PublicFooter from "../../src/components/public/Footer/Footer";

type Props = {
  allPosts: Array<PostType>;
};

export default function Post({ allPosts }: Props) {
  return (
    <>
      <Head>
        <title>Monopad - Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        as="main"
        sx={{
          width: "100vw",
          height: "fit-content",
          backgroundColor: "publicBackground",
        }}
      >
        <PublicHeader />
        <Flex
          sx={{
            // height: "100vh",
            marginX: ["16px", "0px", "0px"],
            justifyContent: "center",
            alignItems: "center",
            // zIndex: 1,
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
              {allPosts.map((post) => (
                <Grid
                  columns={["1fr", ".85fr 1fr", ".85fr 1fr"]}
                  // gap="24px"
                  sx={{ rowGap: ["30px", "30px", "64px"] }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <Image
                      src={post.coverImage}
                      alt="cover image"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "5px",
                      }}
                      width={800}
                      height={400}
                    />
                  </Link>
                  <Box>
                    <Text
                      as="div"
                      sx={{
                        marginBottom: "24px",
                        textTransform: "uppercase",
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontWeight: "400",
                      }}
                    >
                      {post.topic}
                    </Text>
                    <ThemeLink
                      as={Link}
                      href={`/blog/${post.slug}`}
                      sx={{ textDecoration: "none" }}
                    >
                      <Text
                        as="h3"
                        sx={{
                          color: "text",
                          fontSize: "26px",
                          lineHeight: "34px",
                          fontWeight: "400",
                        }}
                      >
                        {post.title}
                      </Text>
                    </ThemeLink>
                    <Text
                      as="div"
                      sx={{
                        fontSize: "16px",
                        lineHeight: "28px",
                        paddingTop: "16px",
                        marginBottom: "30px",
                      }}
                    >
                      {post.excerpt}
                    </Text>
                    <Flex sx={{ gap: "16px" }}>
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
                  </Box>
                </Grid>
              ))}
            </Flex>
          </Flex>
        </Flex>
        <PublicFooter />
      </Box>
    </>
  );
}

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
