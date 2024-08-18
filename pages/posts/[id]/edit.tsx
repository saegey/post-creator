import { withSSRContext } from "aws-amplify";
import Head from "next/head";
import React from "react";
import { GraphQLResult } from "@aws-amplify/api";

import { PostContext } from "../../../src/components/PostContext";
import { getPostInitial } from "../../../src/graphql/customQueries";
import EditUserPost from "../../../src/components/posts/Editor/EditUserPost";
import { GetPostInitialQuery } from "../../../src/API";
import {
  CustomElement,
  GraphQLError,
  IUser,
  OmniResultType,
  CrossResultsPreviewType,
  PostType,
  PostContextType,
} from "../../../src/types/common";
import { CloudinaryImage } from "../../../src/types/common";

type ServerSideProps = {
  req: object;
  params: {
    id: string;
  };
};

const getUserAndPost = async ({ req, params }: ServerSideProps) => {
  const SSR = withSSRContext({ req });
  let session;
  let user: IUser | null = null;

  try {
    session = await SSR.Auth.currentSession();
    const sessionData = session.getIdToken();
    const { payload } = sessionData;

    const {
      email,
      sub,
      email_verified,
      "custom:role": role,
      picture,
      name,
      preferred_username,
      profile,
      zoneinfo,
    } = payload;

    user = {
      userId: sub,
      email: email,
      email_verified: email_verified,
      // role: role,
      attributes: {
        picture,
        name,
        preferred_username,
        sub,
        profile,
        zoneinfo,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  let res;

  try {
    res = (await SSR.API.graphql({
      query: getPostInitial,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        id: params.id,
      },
    })) as GraphQLResult<GetPostInitialQuery>;
  } catch (error: unknown) {
    const knownError = error as GraphQLError;
    console.log(error);

    if (knownError.errors?.find((e) => e.errorType === "Unauthorized")) {
      return {
        props: { errorCode: 403 },
      };
    }
  }

  const post = res?.data?.getPost;
  if (!post) {
    return {
      props: { errorCode: 403 },
    };
  }

  return {
    props: {
      user,
      postRaw: {
        ...post,
        components: post.components
          ? (JSON.parse(post.components) as Array<CustomElement>)
          : [
              { type: "heroBanner", children: [{ text: "" }], void: true },
              {
                type: "postAuthor",
                children: [{ text: "" }],
              },
              {
                type: "paragraph",
                children: [{ text: "Discuss your activity..." }],
              },
            ],
        images: post.images
          ? (JSON.parse(post.images) as Array<CloudinaryImage>)
          : [],
        heartAnalysis:
          post.heartAnalysis && post.heartAnalysis !== null
            ? JSON.parse(post.heartAnalysis)
            : null,
        powerAnalysis:
          post.powerAnalysis && post.powerAnalysis !== null
            ? JSON.parse(post.powerAnalysis)
            : null,
        cadenceAnalysis: post.cadenceAnalysis
          ? JSON.parse(post.cadenceAnalysis)
          : null,
        tempAnalysis: post.tempAnalysis ? JSON.parse(post.tempAnalysis) : null,
        powerZones: post.powerZones ? JSON.parse(post.powerZones) : null,
        heroImage: post.heroImage ? JSON.parse(post.heroImage) : null,
        powerZoneBuckets: post.powerZoneBuckets
          ? JSON.parse(post.powerZoneBuckets)
          : null,
        raceResults: post.raceResults ? JSON.parse(post.raceResults) : "null",
        webscorerResults: post.webscorerResults
          ? JSON.parse(post.webscorerResults)
          : null,
        crossResults: (post.crossResults
          ? JSON.parse(post.crossResults)
          : null) as CrossResultsPreviewType | null,
        omniResults: (post.omniResults
          ? JSON.parse(post.omniResults)
          : null) as OmniResultType | null,
        runSignupResults: (post.runSignupResults !== undefined &&
        post.runSignupResults !== null
          ? JSON.parse(post.runSignupResults)
          : null) as OmniResultType | null,
      },
    },
  };
};

export const getServerSideProps = async ({ req, params }: ServerSideProps) => {
  return getUserAndPost({ req, params });
};

const Post = ({ user, postRaw, errorCode }: PostType) => {
  const [post, setPostState] = React.useState<PostContextType>({
    __typename: "Post",
    setPost: (updates: Partial<PostContextType>) => {
      setPostState((prevState) => ({
        ...prevState,
        ...updates,
      }));
    },
    activity: [],
    elevations: [],
    ...postRaw,
  });

  return (
    <PostContext.Provider value={post}>
      <>
        <Head>
          <title>{post.title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <EditUserPost user={user} />
      </>
    </PostContext.Provider>
  );
};

export default Post;
