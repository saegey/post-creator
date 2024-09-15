import {
  AspectRatio,
  Avatar,
  Box,
  Flex,
  Grid,
  Text,
  Link as ThemeLink,
} from "theme-ui";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import type PostType from "../../../interfaces/post";

type PostItemProps = {
  post: PostType;
};

const BlogPostListItem = ({ post }: PostItemProps) => {
  return (
    <Grid
      columns={["1fr", ".85fr 1fr", ".85fr 1fr"]}
      sx={{
        rowGap: ["30px", "30px", "64px"],
        // padding: "20px",
        backgroundColor: "surfaceLight",
        borderRadius: "5px",
      }}
    >
      <Link href={`/blog/${post.slug}`}>
        <AspectRatio ratio={4 / 3}>
          <Image
            src={post.coverImage}
            alt="cover image"
            style={{
              width: "100%",
              height: "100%",
              // width: "100%",
              // height: "100%",
              objectFit: "cover",
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
            }}
            width={800}
            height={400}
          />
        </AspectRatio>
      </Link>
      <Flex sx={{ flexDirection: "column", gap: "20px", margin: "10px" }}>
        <Text
          as="div"
          sx={{
            // marginBottom: "12px",
            textTransform: "uppercase",
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: "530",
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
              letterSpacing: "-0.5px",
              lineHeight: "30px",
              fontWeight: "530",
            }}
          >
            {post.title}
          </Text>
        </ThemeLink>
        <Text
          as="div"
          sx={{
            fontSize: "16px",
            lineHeight: "20px",
            // paddingTop: "16px",
            // marginBottom: "30px",
          }}
        >
          {post.excerpt}
        </Text>
        <Flex sx={{ gap: "16px" }}>
          <Avatar
            src={post.author.picture}
            sx={{ width: "40px", height: "40px" }}
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
      </Flex>
    </Grid>
  );
};

export default BlogPostListItem;
