import { withSSRContext } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";

import { GetPostInitialQuery } from "../API";
import { getPostInitial } from "../graphql/customQueries";
import { GraphQLError, IUser } from "../types/common";
import { parseJsonFields } from "./parseJsonFields";

export const fetchUserAndPost = async (req: object, postId: string) => {
  const SSR = withSSRContext({ req });

  let user: IUser | null = null;

  try {
    const session = await SSR.Auth.currentSession();
    const { payload } = session.getIdToken();

    user = {
      userId: payload.sub,
      email: payload.email,
      email_verified: payload.email_verified,
      attributes: {
        picture: payload.picture || null,
        name: payload.name,
        preferred_username: payload.preferred_username,
        sub: payload.sub,
        profile: payload.profile || null,
        zoneinfo: payload.zoneinfo,
      },
    };
  } catch (e) {
    console.error("Authentication error:", e);
    return { redirect: { destination: "/login", permanent: false } };
  }

  try {
    const res = (await SSR.API.graphql({
      query: getPostInitial,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: { id: postId },
    })) as GraphQLResult<GetPostInitialQuery>;

    const post = res?.data?.getPost;
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

    return {
      props: {
        user,
        postRaw: parsedPost,
      },
    };
  } catch (error) {
    console.error("GraphQL error:", error);
    const knownError = error as GraphQLError;

    if (knownError.errors?.some((e) => e.errorType === "Unauthorized")) {
      return { props: { errorCode: 403 } };
    }
    return { props: { errorCode: 500 } };
  }
};
