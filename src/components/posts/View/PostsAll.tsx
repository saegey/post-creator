import { Grid, Box, Button, Flex, Text, NavLink } from "theme-ui";
import { API } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import React from "react";
import Router from "next/router";
import { useSearchParams } from "next/navigation";

import PostCard from "./PostCard";
import Header from "../../shared/Header/Header";
import { PostType } from "../../../../pages/posts";
import { CreatePostMutation } from "../../../API";
import {
  listMyPostsCustom,
  listPostsCustom,
} from "../../../graphql/customQueries";
import { IUser } from "../../../types/common";
import { createPostNew } from "../../../graphql/customMutations";
import ShareIcon from "../../icons/ShareIcon";

interface ListPostsByCreatedAtTypes {
  listPostsByCreatedAt: {
    items: Array<{
      id: string;
      title: string;
      createdAt: string;
      images: string;
      author: {
        id: string;
        username: string;
        fullName: string;
        image: string;
      };
      privacyStatus: string;
    }>;
  };
}

interface ListPublishedPostsByCreatedAtTypes {
  listPublishedPostsByCreatedAt: {
    items: Array<{
      id: string;
      title: string;
      createdAt: string;
      images: string;
      author: string;
      privacyStatus?: string;
    }>;
  };
}

const PostsAll = ({ user }: { user: IUser }) => {
  React.useEffect(() => {
    if (!user) {
      Router.push("/login");
    }
  }, [user]);

  const [status, setStatus] = React.useState<string | undefined>();
  const [posts, setPosts] = React.useState<PostType>();

  const searchParams = useSearchParams();

  const search = searchParams.get("status");
  if (search && (!status || search !== status)) {
    setStatus(search);
  } else if (!search && !status) {
    setStatus("draft");
  }

  const getDraftPosts = async (type = "draft") => {
    const response = (await API.graphql({
      query: listMyPostsCustom,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        filter: {
          privacyStatus: {
            eq: type,
          },
        },
      },
    })) as GraphQLResult<ListPostsByCreatedAtTypes>;

    setPosts(
      response.data?.listPostsByCreatedAt.items.map((d) => {
        return { ...d, imagesObj: JSON.parse(d.images) };
      })
    );
  };

  const getPublishedPost = async () => {
    const response = (await API.graphql({
      query: listPostsCustom,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<ListPublishedPostsByCreatedAtTypes>;

    setPosts(
      response.data?.listPublishedPostsByCreatedAt.items.map((d) => {
        return {
          ...d,
          imagesObj: JSON.parse(d.images),
          author: JSON.parse(d.author),
        };
      })
    );
  };

  React.useEffect(() => {
    if (status === "draft") {
      getDraftPosts();
    }
    if (status === "published") {
      getPublishedPost();
    }
  }, [status]);

  const createNewPost = async () => {
    var response;
    try {
      response = (await API.graphql({
        authMode: "AMAZON_COGNITO_USER_POOLS",
        query: createPostNew,
        variables: {
          input: {
            title: "",
            type: "Post",
            privacyStatus: "draft",
            postAuthorId: user?.attributes.sub,
          },
        },
      })) as GraphQLResult<CreatePostMutation>;
    } catch (e) {
      console.error(e);
    }

    if (!response || !response.data || !response.data.createPost) {
      console.error("failed to create post");
    } else {
      Router.push(`/posts/${response?.data?.createPost?.id}/edit`);
    }
  };

  return (
    <Box as="main" sx={{ backgroundColor: "background", height: "100vw" }}>
      <Header user={user} />
      <Box
        sx={{
          // marginTop: '60px',
          maxWidth: "900px",
          marginLeft: ["0px", "auto", "auto"],
          marginRight: ["0px", "auto", "auto"],
          padding: "20px",
          width: "100vw",
        }}
      >
        <Flex sx={{ width: "100%" }}>
          <Box as="nav" sx={{ marginBottom: "10px", flexGrow: 1 }}>
            <NavLink
              href="#!"
              sx={{
                paddingY: "8px",
                paddingRight: "8px",
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                borderBottomColor: status === "draft" ? "text" : "divider",
                fontWeight: "500",
                flexGrow: 1,
              }}
              onClick={(e) => {
                e.preventDefault();
                setPosts(undefined);
                setStatus("draft");
                getDraftPosts();

                Router.push("/posts?status=draft");
              }}
            >
              Drafts
            </NavLink>
            <NavLink
              href="#!"
              p={2}
              sx={{
                paddingY: "8px",
                paddingRight: "8px",
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                borderBottomColor: status === "published" ? "text" : "divider",
                fontWeight: "500",
              }}
              onClick={(e) => {
                e.preventDefault();
                setPosts(undefined);
                setStatus("published");
                getPublishedPost();
                Router.push("/posts?status=published");
              }}
            >
              Published
            </NavLink>
            <NavLink
              href="#!"
              p={2}
              sx={{
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                borderBottomColor: "divider",
                fontWeight: "500",
              }}
            >
              Unlisted
            </NavLink>
          </Box>
          <Flex
            sx={{
              paddingBottom: "20px",
              // flexGrow: 1,
              justifyContent: "right",
              // width: "50%",
              // borderBottomWidth: "1px",
              // borderBottomStyle: "solid",
              // borderBottomColor: status === "draft" ? "text" : "divider",
            }}
          >
            <Button
              onClick={() => createNewPost()}
              id="create-new-post"
              variant="primaryButton"
            >
              <Text sx={{ fontWeight: "700" }}>+</Text>
            </Button>
          </Flex>
        </Flex>

        {!posts && (
          <Grid columns={[1, 2, 3]}>
            <Flex
              sx={{
                height: "240px",
                borderRadius: "5px",
              }}
              className="skeleton"
            ></Flex>
            <Flex
              sx={{
                height: "240px",
                borderRadius: "5px",
              }}
              className="skeleton"
            ></Flex>
            <Flex
              sx={{
                height: "240px",

                borderRadius: "5px",
              }}
              className="skeleton"
            ></Flex>
          </Grid>
        )}

        {posts && posts.length === 0 && (
          <>
            <Flex
              sx={{
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
                marginTop: "40px",
              }}
            >
              <ShareIcon sx={{ width: "205px", height: "auto" }} />
              <Text sx={{ fontSize: "32px", fontWeight: "700" }}>
                Share Posts
              </Text>
              When you share posts, they will appear on your profile.
              <Box>
                <Button variant="primaryButton" onClick={() => createNewPost()}>
                  Share your first post
                </Button>
              </Box>
            </Flex>
          </>
        )}
        {posts && (
          <>
            <Grid columns={[1, 2, 3]}>
              {posts.map((post, i) => (
                <div key={`post-${i}`}>
                  <PostCard post={post} showAuthor={false} />
                </div>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
};

export default PostsAll;
