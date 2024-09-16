import { Grid, Box } from "theme-ui";
import React from "react";
import Router from "next/router";

import PostCard from "./PostCard";
import Header from "../../shared/Header/Header";
import { CloudinaryImage, IUser } from "../../../types/common";

export type PostType = Array<{
  id: string;
  title: string;
  images: string;
  imagesObj: Array<CloudinaryImage>;
  author: {
    fullName: string;
    username: string;
    image: string;
  };
  privacyStatus: string;
}>;

const PostsAllUsers = ({
  user,
  posts,
}: {
  user?: IUser;
  posts: PostType | undefined;
}) => {
  if (!user) {
    return <></>;
  }

  return (
    <Box as="main" sx={{ height: "100vw" }}>
      {user && <Header user={user} />}
      <Box
        sx={{
          maxWidth: "1280px",
          marginLeft: ["0px", "auto", "auto"],
          marginRight: ["0px", "auto", "auto"],
          padding: "20px",
        }}
      >
        <Grid columns={[1, 2, 3]} sx={{ gridGap: "20px" }}>
          {posts &&
            posts.map((post, i) => {
              return (
                <Box key={`postcard-${i}`}>
                  <PostCard post={post} />
                </Box>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
};

export default PostsAllUsers;
