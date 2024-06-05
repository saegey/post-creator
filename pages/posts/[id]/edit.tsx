import { withSSRContext } from "aws-amplify";
import Head from "next/head";
import React from "react";
import { GraphQLResult } from "@aws-amplify/api";

import { PostContext } from "../../../src/components/PostContext";
import { getPostInitial } from "../../../src/graphql/customQueries";
import EditUserPost from "../../../src/components/posts/Editor/EditUserPost";
import { GetPostInitialQuery } from "../../../src/API";
import {
  ActivityItem,
  CustomElement,
  GraphQLError,
  IUser,
  OmniResultType,
  CrossResultsPreviewType,
  PostType,
} from "../../../src/types/common";
import { CloudinaryImage } from "../../../src/types/common";

type ServerSideProps = {
  req: object;
  params: {
    id: string;
  };
};

export const getServerSideProps = async ({ req, params }: ServerSideProps) => {
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
  console.log(post);

  return {
    props: {
      user,
      post: {
        ...post,
        components: post.components
          ? (JSON.parse(post.components) as Array<CustomElement>)
          : [],
        images: post.images
          ? (JSON.parse(post.images) as Array<CloudinaryImage>)
          : [],
        heartAnalysis:
          post.heartAnalysis && post.heartAnalysis !== null
            ? JSON.parse(post.heartAnalysis)
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

const Post = ({ user, post, errorCode }: PostType) => {
  if (errorCode) {
    return <></>;
  }
  const isNewPost = (postComponents: Array<CustomElement>) => {
    if (postComponents.length === 1 && postComponents[0].type === "text") {
      return true;
    } else {
      return false;
    }
  };
  const [title, setTitle] = React.useState(post.title ? post.title : "");
  const [subhead, setSubhead] = React.useState(post.subhead);
  const [postLocation, setPostLocation] = React.useState(post.postLocation);
  const [id, setId] = React.useState(post.id);
  const [activity, setActivity] = React.useState<
    Array<ActivityItem> | undefined
  >();
  const [gpxFile, setGpxFile] = React.useState(post.gpxFile);
  const [stravaUrl, setStravaUrl] = React.useState(post.stravaUrl);
  const [components, setComponents] = React.useState(
    post.components && isNewPost(post.components)
      ? ([
          {
            type: "heroBanner",
            children: [{ text: "" }],
          },
          {
            type: "postAuthor",
            children: [{ text: "" }],
          },
          {
            type: "paragraph",
            children: [{ text: "Discuss your race..." }],
          },
        ] as Array<CustomElement>)
      : post.components
  );
  const [images, setImages] = React.useState(post.images);
  const [currentFtp, setCurrentFtp] = React.useState(post.currentFtp);
  const [resultsUrl, setResultsUrl] = React.useState(post.resultsUrl);
  const [powerAnalysis, setPowerAnalysis] =
    React.useState<Array<Record<number | string, number>>>();
  const [heartAnalysis, setHeartAnalysis] = React.useState(post.heartAnalysis);
  const [cadenceAnalysis, setCadenceAnalysis] = React.useState(
    post.cadenceAnalysis
  );
  const [tempAnalysis, setTempAnalysis] = React.useState(post.tempAnalysis);
  const [initialLoad, setInitialLoad] = React.useState(true);
  const [elevationTotal, setElevationTotal] = React.useState(
    post.elevationTotal
  );
  const [normalizedPower, setNormalizedPower] = React.useState(
    post.normalizedPower
  );
  const [distance, setDistance] = React.useState(post.distance);
  const [elapsedTime, setElapsedTime] = React.useState(post.elapsedTime);
  const [stoppedTime, setStoppedTime] = React.useState(post.stoppedTime);
  const [timeInRed, setTimeInRed] = React.useState(post.timeInRed);
  const [powerZones, setPowerZones] = React.useState(post.powerZones);
  const [powerZoneBuckets, setPowerZoneBuckets] = React.useState(
    post.powerZoneBuckets
  );
  const [heroImage, setHeroImage] = React.useState(post.heroImage);
  const [date, setDate] = React.useState(post.date);
  const [author, setAuthor] = React.useState(post.author);
  const [shortUrl, setShortUrl] = React.useState(post.shortUrl);

  const [raceResults, setRaceResults] = React.useState(post.raceResults);
  const [webscorerResults, setWebscorerResults] = React.useState(
    post.webscorerResults
  );
  const [crossResults, setCrossResults] = React.useState(post.crossResults);
  const [omniResults, setOmniResults] = React.useState(post.omniResults);
  const [runSignupResults, setRunSignupResults] = React.useState(
    post.runSignupResults
  );

  const [timeSeriesFile, setTimeSeriesFile] = React.useState(
    post.timeSeriesFile
  );
  const [privacyStatus, setPrivacyStatus] = React.useState(post.privacyStatus);
  const [createdAt, setCreatedAt] = React.useState(post.createdAt);
  const [powers, setPowers] = React.useState<Array<number> | undefined>();
  const [hearts, setHearts] = React.useState<Array<number> | undefined>();
  const [__typename] = React.useState(post.__typename);

  React.useEffect(() => {
    if (!initialLoad) {
      setId(post.id);
      setTitle(post.title);
      setSubhead(post.subhead);
      setComponents(post.components);
      setPostLocation(post.postLocation);
      setGpxFile(post.gpxFile);
      setStravaUrl(post.stravaUrl);
      setImages(post.images);
      setCurrentFtp(post.currentFtp);
      setElevationTotal(post.elevationTotal);
      setNormalizedPower(post.normalizedPower);
      setDistance(post.distance);
      setElapsedTime(post.elapsedTime);
      setStoppedTime(post.stoppedTime);
      setTimeInRed(post.timeInRed);
      setHeartAnalysis(post.heartAnalysis);
      setPowerAnalysis(post.powerAnalysis);
      setCadenceAnalysis(post.cadenceAnalysis);
      setTempAnalysis(post.tempAnalysis);
      setPowerZones(post.powerZones);
      setPowerZoneBuckets(post.powerZoneBuckets);
      setHeroImage(post.heroImage);
      setDate(post.date);
      setAuthor(post.author);
      setShortUrl(post.shortUrl);

      setRaceResults(post.raceResults);
      setWebscorerResults(post.webscorerResults);
      setCrossResults(post.crossResults);
      setOmniResults(post.omniResults);

      setTimeSeriesFile(post.timeSeriesFile);
      setPrivacyStatus(post.privacyStatus);
      setCreatedAt(post.createdAt);
    }
  }, [post.components]);

  React.useEffect(() => {
    setInitialLoad(false);
  }, []);

  return (
    <PostContext.Provider
      value={{
        title,
        setTitle,
        subhead,
        setSubhead,
        postLocation,
        setPostLocation,
        activity,
        setActivity,
        id,
        setId,
        gpxFile,
        setGpxFile,
        stravaUrl,
        setStravaUrl,
        components,
        setComponents,
        images,
        setImages,
        currentFtp,
        setCurrentFtp,
        resultsUrl,
        setResultsUrl,
        powerAnalysis,
        setPowerAnalysis,
        elevationTotal,
        setElevationTotal,
        normalizedPower,
        setNormalizedPower,
        distance,
        setDistance,
        elapsedTime,
        setElapsedTime,
        stoppedTime,
        setStoppedTime,
        timeInRed,
        setTimeInRed,
        heartAnalysis,
        setHeartAnalysis,
        cadenceAnalysis,
        setCadenceAnalysis,
        tempAnalysis,
        setTempAnalysis,
        powerZones,
        setPowerZones,
        powerZoneBuckets,
        setPowerZoneBuckets,
        heroImage,
        setHeroImage,
        date,
        setDate,
        shortUrl,
        setShortUrl,
        // race results
        raceResults,
        setRaceResults,
        webscorerResults,
        setWebscorerResults,
        crossResults,
        setCrossResults,
        omniResults,
        setOmniResults,
        runSignupResults,
        setRunSignupResults,

        author,
        setAuthor,
        timeSeriesFile,
        setTimeSeriesFile,
        privacyStatus,
        setPrivacyStatus,
        createdAt,
        setCreatedAt,
        powers,
        setPowers,
        hearts,
        setHearts,
        __typename,
      }}
    >
      <>
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <EditUserPost
          postComponents={components}
          postId={post.id}
          author={author}
          user={user}
        />
      </>
    </PostContext.Provider>
  );
};

export default Post;
