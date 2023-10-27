import { Grid, Box } from "theme-ui";
import React from "react";
import Router from "next/router";

import PostCard from "./PostCard";
import Header from "./Header";
import { CloudinaryImage } from "./AddImage";

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
  signOut,
  user,
  posts,
}: {
  signOut?: any;
  user?: any;
  posts: PostType | undefined;
}) => {
  React.useEffect(() => {
    if (!user) {
      Router.push("/login");
    }
  }, [user]);

  return (
    <Box as="main" sx={{ height: "100vw" }}>
      <Header user={user} />
      <Box
        sx={{
          maxWidth: "900px",
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
