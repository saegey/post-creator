// utils/fetchUserAndPost.ts
import { withSSRContext } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { GetPostInitialQuery } from "../API";
import { getPostInitial } from "../graphql/customQueries";
import {
  CustomElement,
  GraphQLError,
  IUser,
  CloudinaryImage,
  CrossResultsPreviewType,
  OmniResultType,
} from "../types/common";

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
        picture: payload.picture ? payload.picture : null,
        name: payload.name,
        preferred_username: payload.preferred_username,
        sub: payload.sub,
        profile: payload.profile ? payload.profile : null,
        zoneinfo: payload.zoneinfo,
      },
    };
  } catch (e) {
    console.log(e);
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

    return {
      props: {
        user,
        postRaw: {
          ...post,
          components: JSON.parse(
            post.components || "[]"
          ) as Array<CustomElement>,
          images: JSON.parse(post.images || "[]") as Array<CloudinaryImage>,
          heartAnalysis: post.heartAnalysis
            ? JSON.parse(post.heartAnalysis)
            : null,
          powerAnalysis: post.powerAnalysis
            ? JSON.parse(post.powerAnalysis)
            : null,
          cadenceAnalysis: post.cadenceAnalysis
            ? JSON.parse(post.cadenceAnalysis)
            : null,
          tempAnalysis: post.tempAnalysis
            ? JSON.parse(post.tempAnalysis)
            : null,
          powerZones: post.powerZones ? JSON.parse(post.powerZones) : null,
          heroImage: post.heroImage ? JSON.parse(post.heroImage) : null,
          powerZoneBuckets: post.powerZoneBuckets
            ? JSON.parse(post.powerZoneBuckets)
            : null,
          raceResults: post.raceResults ? JSON.parse(post.raceResults) : null,
          webscorerResults: post.webscorerResults
            ? JSON.parse(post.webscorerResults)
            : null,
          crossResults: (post.crossResults
            ? JSON.parse(post.crossResults)
            : null) as CrossResultsPreviewType | null,
          omniResults: (post.omniResults
            ? JSON.parse(post.omniResults)
            : null) as OmniResultType | null,
          runSignupResults: (post.runSignupResults
            ? JSON.parse(post.runSignupResults)
            : null) as OmniResultType | null,
        },
      },
    };
  } catch (error: unknown) {
    const knownError = error as GraphQLError;
    console.log(error);

    if (knownError.errors?.find((e) => e.errorType === "Unauthorized")) {
      return { props: { errorCode: 403 } };
    }
  }

  return { props: { errorCode: 500 } };
};
