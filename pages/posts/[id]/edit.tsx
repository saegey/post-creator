import { withSSRContext } from "aws-amplify";
import Head from "next/head";
import React from "react";
import { GraphQLResult } from "@aws-amplify/api";

import {
  PostContext,
  RaceResultRow,
} from "../../../src/components/PostContext";
import { getPostInitial } from "../../../src/graphql/customQueries";
import EditUserPost from "../../../src/components/posts/Editor/EditUserPost";
import { GetPostInitialQuery } from "../../../src/API";
import {
  ActivityItem,
  CustomElement,
  GraphQLError,
  PostType,
} from "../../../src/types/common";
import { UserContext } from "../../../src/components/UserContext";
import { CloudinaryImage } from "../../../src/types/common";

type ServerSideProps = {
  req: object;
  params: {
    id: string;
  };
};

export const getServerSideProps = async ({ req, params }: ServerSideProps) => {
  const { API } = withSSRContext({ req });

  let res;

  try {
    res = (await API.graphql({
      query: getPostInitial,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        id: params.id,
      },
    })) as GraphQLResult<GetPostInitialQuery>;
    // console.log(res);
  } catch (error: unknown) {
    const knownError = error as GraphQLError;
    console.log(error);
    if (knownError.errors?.find((e) => e.errorType === "Unauthorized")) {
      return {
        props: { errorCode: 403 },
      };
    }
  }

  // if (!res || !res.data) {
  //   return {
  //     notFound: true,
  //   };
  // }

  const post = res?.data?.getPost;
  if (!post) {
    return {
      props: { errorCode: 403 },
    };
  }

  return {
    props: {
      postId: post.id,
      postComponents: post.components
        ? (JSON.parse(post.components) as Array<CustomElement>)
        : [],
      postTitle: post.title,
      postSubhead: post.subhead,
      postImages:
        post.images && post.images !== null
          ? (JSON.parse(post.images) as Array<CloudinaryImage>)
          : [],
      postLocationOrig: post.postLocation,
      postGpxFile: post.gpxFile,
      postStravaUrl: post.stravaUrl,
      postResultsUrl: post.resultsUrl,
      postCurrentFtp: post.currentFtp,
      postElevationTotal: post.elevationTotal,
      postNormalizedPower: post.normalizedPower,
      postDistance: post.distance,
      postStoppedTime: post.stoppedTime,
      postElapsedTime: post.elapsedTime,
      postTimeInRed: post.timeInRed,
      postHeartAnalysis:
        post.heartAnalysis && post.heartAnalysis !== null
          ? JSON.parse(post.heartAnalysis)
          : null,
      postCadenceAnalysis: post.cadenceAnalysis
        ? JSON.parse(post.cadenceAnalysis)
        : null,
      postTempAnalysis: post.tempAnalysis
        ? JSON.parse(post.tempAnalysis)
        : null,
      postPowerZones: post.powerZones ? JSON.parse(post.powerZones) : null,
      postPowerZoneBuckets: post.powerZoneBuckets
        ? JSON.parse(post.powerZoneBuckets)
        : null,
      postHeroImage: post.heroImage ? JSON.parse(post.heroImage) : null,
      postDate: post.date,
      postAuthor: post.author,
      postShortUrl: post.shortUrl,
      postRaceResults: post.raceResults ? JSON.parse(post.raceResults) : null,
      postTimeSeriesFile: post.timeSeriesFile,
      postPrivacyStatus: post.privacyStatus ? post.privacyStatus : null,
      postCreatedAt: post.createdAt,
    },
  };
};

const Post = ({
  postComponents,
  postTitle,
  postSubhead,
  postLocationOrig,
  postGpxFile,
  postId,
  postImages,
  postResultsUrl,
  postStravaUrl,
  postCurrentFtp,
  postElevationTotal,
  postNormalizedPower,
  postDistance,
  postElapsedTime,
  postStoppedTime,
  postTimeInRed,
  postHeartAnalysis,
  postPowerAnalysis,
  postCadenceAnalysis,
  postTempAnalysis,
  postPowerZones,
  postPowerZoneBuckets,
  postHeroImage,
  postDate,
  postAuthor,
  postShortUrl,
  postRaceResults,
  postTimeSeriesFile,
  postPrivacyStatus,
  postCreatedAt,
  errorCode,
}: PostType) => {
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
  const [title, setTitle] = React.useState<string | undefined>(postTitle);
  const [subhead, setSubhead] = React.useState<string | undefined>(postSubhead);
  const [postLocation, setPostLocation] = React.useState<string | undefined>(
    postLocationOrig
  );
  const [id, setId] = React.useState(postId);
  const [activity, setActivity] = React.useState<ActivityItem[] | undefined>();
  const [gpxFile, setGpxFile] = React.useState(postGpxFile);
  const [stravaUrl, setStravaUrl] = React.useState<string | undefined>(
    postStravaUrl
  );
  const [components, setComponents] = React.useState(
    (isNewPost(postComponents)
      ? [
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
        ]
      : postComponents) as Array<CustomElement> | undefined
  );
  const [images, setImages] = React.useState<
    Array<CloudinaryImage> | undefined
  >(postImages ? postImages : undefined);

  const [currentFtp, setCurrentFtp] = React.useState<number | undefined>(
    postCurrentFtp
  );
  const [resultsUrl, setResultsUrl] = React.useState<string | undefined>(
    postResultsUrl
  );

  const [powerAnalysis, setPowerAnalysis] =
    React.useState<Array<Record<string | number, number>>>();
  const [heartAnalysis, setHeartAnalysis] = React.useState<
    Array<Record<number | string, number>> | undefined
  >(postHeartAnalysis);
  const [cadenceAnalysis, setCadenceAnalysis] = React.useState<
    Array<Record<number | string, number>> | undefined
  >(postCadenceAnalysis);
  const [tempAnalysis, setTempAnalysis] = React.useState<
    Array<Record<number | string, number>> | undefined
  >(postTempAnalysis);

  const [initialLoad, setInitialLoad] = React.useState(true);

  const [elevationTotal, setElevationTotal] = React.useState<
    number | undefined
  >(postElevationTotal);
  const [normalizedPower, setNormalizedPower] = React.useState<
    number | undefined
  >(postNormalizedPower);
  const [distance, setDistance] = React.useState<number | undefined>(
    postDistance
  );
  const [elapsedTime, setElapsedTime] = React.useState<number | undefined>(
    postElapsedTime
  );
  const [stoppedTime, setStoppedTime] = React.useState<number | undefined>(
    postStoppedTime
  );
  const [timeInRed, setTimeInRed] = React.useState<number | undefined>(
    postTimeInRed
  );
  const [powerZones, setPowerZones] = React.useState(postPowerZones);
  const [powerZoneBuckets, setPowerZoneBuckets] =
    React.useState(postPowerZoneBuckets);
  const [heroImage, setHeroImage] = React.useState(postHeroImage);
  const [date, setDate] = React.useState<string | undefined>(postDate);
  const [author, setAuthor] = React.useState(postAuthor);
  const [shortUrl, setShortUrl] = React.useState<string | undefined>(
    postShortUrl
  );
  const [raceResults, setRaceResults] = React.useState<
    RaceResultRow | undefined
  >(postRaceResults);
  const [timeSeriesFile, setTimeSeriesFile] =
    React.useState(postTimeSeriesFile);
  const [privacyStatus, setPrivacyStatus] = React.useState<string | undefined>(
    postPrivacyStatus
  );
  const [createdAt, setCreatedAt] = React.useState<string | undefined>(
    postCreatedAt
  );
  const [selection, setSelection] = React.useState<[number, number]>();
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    if (!initialLoad) {
      setId(postId);
      setTitle(postTitle);
      setSubhead(postSubhead);
      setComponents(postComponents);
      setPostLocation(postLocationOrig);
      setGpxFile(postGpxFile);
      setStravaUrl(postStravaUrl);
      setImages(postImages);
      setCurrentFtp(postCurrentFtp);
      setElevationTotal(postElevationTotal);
      setNormalizedPower(postNormalizedPower);
      setDistance(postDistance);
      setElapsedTime(postElapsedTime);
      setStoppedTime(postStoppedTime);
      setTimeInRed(postTimeInRed);
      setHeartAnalysis(postHeartAnalysis);
      setPowerAnalysis(postPowerAnalysis);
      setCadenceAnalysis(postCadenceAnalysis);
      setTempAnalysis(postTempAnalysis);
      setPowerZones(postPowerZones !== null ? postPowerZones : []);
      setPowerZoneBuckets(postPowerZoneBuckets);
      setHeroImage(postHeroImage);
      setDate(postDate);
      setAuthor(postAuthor);
      setShortUrl(postShortUrl);
      setRaceResults(postRaceResults);
      setTimeSeriesFile(postTimeSeriesFile);
      setPrivacyStatus(postPrivacyStatus);
      setCreatedAt(postCreatedAt);
    }
  }, [postComponents]);

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
        raceResults,
        setRaceResults,
        author,
        setAuthor,
        timeSeriesFile,
        setTimeSeriesFile,
        privacyStatus,
        setPrivacyStatus,
        createdAt,
        setCreatedAt,
        selection,
        setSelection,
      }}
    >
      <>
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <EditUserPost
          postComponents={components}
          postId={postId}
          author={author}
          user={user}
        />
      </>
    </PostContext.Provider>
  );
};

export default Post;
