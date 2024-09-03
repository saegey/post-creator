import { Avatar, Box, Flex, Grid, Text, Link as ThemeLink } from "theme-ui";
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
  );
};

export default BlogPostListItem;
