import Head from "next/head";
import React from "react";
import { Box, Button, Flex, Text } from "theme-ui";
import { withSSRContext } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { GetServerSideProps } from "next";
import { Link as ThemeLink } from "theme-ui";
import Link from "next/link";

import { IUser, Post, PostContextType } from "../../src/types/common";
import { GetPublishedPostQuery } from "../../src/API";
import { parseJsonFields } from "../../src/utils/parseJsonFields";
import Header from "../../src/components/shared/Header/Header";
import { PostContext } from "../../src/components/PostContext";
import Viewer from "../../src/components/posts/Viewer/Viewer";
import { getPublishedPost } from "../../src/graphql/queries";
import EditIcon from "../../src/components/icons/EditIcon";

interface PostViewProps extends Post {
  authenticatedUser: IUser | null;
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const SSR = withSSRContext({ req });
  const { Auth, API } = SSR;

  let authenticatedUser: IUser | null = null;

  // Fetch the authenticated user if any
  try {
    const currentUser = await Auth.currentAuthenticatedUser();
    authenticatedUser = {
      userId: currentUser.username ?? null,
      email: currentUser.attributes.email ?? null,
      email_verified: currentUser.attributes.email_verified ?? null,
      role: currentUser.attributes["custom:role"] ?? null, // Ensure role is not undefined
      attributes: {
        picture: currentUser.attributes.picture ?? null,
        name: currentUser.attributes.name ?? null,
        preferred_username: currentUser.attributes.preferred_username ?? null,
        sub: currentUser.attributes.sub ?? null,
        profile: currentUser.attributes.profile ?? null,
        zoneinfo: currentUser.attributes.zoneinfo ?? null,
      },
    };
  } catch (err) {
    // User is not authenticated; proceed without error
  }

  try {
    const res = (await API.graphql({
      query: getPublishedPost,
      variables: { id: params?.id },
      authMode: authenticatedUser ? undefined : "AWS_IAM",
    })) as GraphQLResult<GetPublishedPostQuery>;

    const post = res?.data?.getPublishedPost;
    if (!post) {
      return { notFound: true };
    }

    const jsonFields = [
      "components",
      "images",
      "heartAnalysis",
      "powerAnalysis",
      "cadenceAnalysis",
      "tempAnalysis",
      "powerZones",
      "heroImage",
      "powerZoneBuckets",
      "raceResults",
      "webscorerResults",
      "crossResults",
      "omniResults",
      "runSignupResults",
    ] as const;

    const parsedPost = parseJsonFields(post, [...jsonFields]);

    console.log(parsedPost);

    return {
      props: {
        ...parsedPost,
        user: authenticatedUser ? authenticatedUser : null,
      },
    };
  } catch (e) {
    console.error(e);
    return { props: { errorCode: 500 } };
  }
};

interface PostViewProps extends Post {
  user: IUser | null;
}

const PostView = (props: PostViewProps) => {
  const { components, user } = props;

  const [post, setPostState] = React.useState<PostContextType>({
    ...props,
    setPost: (updates: Partial<PostContextType>) => {
      setPostState((prevState) => ({
        ...prevState,
        ...updates,
      }));
    },
    activity: [],
    elevations: [],
  });

  return (
    <PostContext.Provider value={post}>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Box
        as="main"
        sx={{
          width: "100%",
          minHeight: "100%",
        }}
      >
        <Header
          user={user ?? undefined}
          right={
            user ? (
              <ThemeLink
                href={`/posts/${post.id}/edit`}
                as={Link}
                sx={{ textDecoration: "none" }}
                title="Edit Post"
              >
                <Button variant="primaryButton" sx={{ width: "fit-content" }}>
                  <Flex sx={{ gap: "5px" }}>
                    <Box sx={{ width: "20px", height: "20px" }}>
                      <EditIcon />
                    </Box>
                    <Text>Edit</Text>
                  </Flex>
                </Button>
              </ThemeLink>
            ) : (
              <></>
            )
          }
        />
        <Viewer components={components} />
      </Box>
    </PostContext.Provider>
  );
};

export default PostView;
