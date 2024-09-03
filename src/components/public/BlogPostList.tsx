import React from "react";
import { Flex } from "theme-ui";
import type PostType from "../../../interfaces/post";
import BlogPostListItem from "./BlogPostListItem";

type PostListProps = {
  allPosts: Array<PostType>;
};

const BlogPostList = ({ allPosts }: PostListProps) => {
  return (
    <Flex sx={{ flexDirection: "column", gap: "80px" }}>
      {allPosts.map((post) => (
        <BlogPostListItem key={post.slug} post={post} />
      ))}
    </Flex>
  );
};

export default BlogPostList;
