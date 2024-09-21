import Head from "next/head";
import React from "react";
import { Box } from "theme-ui";

import { Post, PostContextType } from "../../src/types/common";
import FavIcon from "../../src/components/shared/FavIcon";
import { getPublishedPost } from "../../src/graphql/customQueries";
import { withSSRContext } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { GetPublishedPostQuery } from "../../src/API";
import { parseJsonFields } from "../../src/utils/parseJsonFields";
import Header from "../../src/components/shared/Header/Header";
import { PostContext } from "../../src/components/PostContext";
import Viewer from "../../src/components/posts/Viewer/Viewer";

type ServerSideProps = {
  req: object;
  params: {
    id: string;
  };
};

export const getServerSideProps = async ({ req, params }: ServerSideProps) => {
  const SSR = withSSRContext({ req });

  try {
    const res = (await SSR.API.graphql({
      query: getPublishedPost,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: { id: params.id },
    })) as GraphQLResult<GetPublishedPostQuery>;

    const post = res?.data?.getPublishedPost;
    if (!post) {
      return { props: { errorCode: 403 } };
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
    return { props: parsedPost };
  } catch (e) {
    console.log(e);
    return { redirect: { destination: "/login", permanent: false } };
  }
};

const PostView = (props: Post) => {
  const { components } = props;

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
        <title>Post</title>
        <FavIcon />
      </Head>
      <Box
        as="main"
        sx={{
          width: "100%",
          minHeight: "100%",
        }}
      >
        <Header />
        <Viewer components={components} />
      </Box>
    </PostContext.Provider>
  );
};

export default PostView;
