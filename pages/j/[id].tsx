import { withSSRContext, Storage } from "aws-amplify";
import React from "react";
import Head from "next/head";
import { GraphQLResult } from "@aws-amplify/api";
import dynamic from "next/dynamic";

import {
  getPostInitial,
  getPublishedPost,
} from "../../src/graphql/customQueries";
import { getActivity } from "../../src/actions/PostGet";
import SlatePublish from "../../src/components/posts/View/SlatePublish";
import {
  Author,
  PostContext,
  RaceResultRow,
} from "../../src/components/PostContext";
import { generate as generateMetaTags } from "../../src/utils/metaTags";
import { GetPostInitialQuery, GetPublishedPostQuery } from "../../src/API";
import {
  ActivityItem,
  CustomElement,
  PostViewType,
  TimeSeriesDataType,
  PowerZoneType,
  IUser,
} from "../../src/types/common";
import { CloudinaryImage } from "../../src/types/common";

const PostView = dynamic(import("../../src/components/posts/View/PostView"), {
  ssr: false,
});

type ServerSideProps = {
  req: object;
  params: {
    id: string;
  };
};

export const getServerSideProps = async ({ req, params }: ServerSideProps) => {
  const SSR = withSSRContext({ req });

  let res:
    | GraphQLResult<GetPublishedPostQuery>
    | GraphQLResult<GetPostInitialQuery>;
  let post;
  let isPublished = true;

  let session;
  try {
    session = await SSR.Auth.currentSession();
  } catch (e) {
    console.log(e);
    // return {
    //   redirect: {
    //     destination: "/login",
    //     permanent: false,
    //   },
    // };
  }

  let user: IUser | null = null;
  if (session) {
    const sessionData = session.getIdToken();
    const { payload } = sessionData;
    //"custom:role": role if custom attribute is added
    const {
      email,
      sub,
      email_verified,
      "custom:role": role,
      picture,
      name,
      preferred_username,
      profile,
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
      },
    };
  }

  try {
    res = (await SSR.API.graphql({
      query: getPublishedPost,
      authMode: "API_KEY",
      variables: {
        id: params.id,
      },
    })) as GraphQLResult<GetPublishedPostQuery>;

    if (!res.data || !res.data.getPublishedPost) {
      res = (await SSR.API.graphql({
        query: getPostInitial,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          id: params.id,
        },
      })) as GraphQLResult<GetPostInitialQuery>;
      post = res.data?.getPost;
      isPublished = false;
    } else {
      post = res.data.getPublishedPost;
    }
  } catch (error) {
    console.log(error);
  }

  if (!post) {
    return {
      props: { errorCode: 403 },
    };
  }

  const author = (
    typeof post.author === "string" ? JSON.parse(post.author) : post.author
  ) as Author;

  const newPost = { ...post, author: author ? author : undefined };
  return {
    props: {
      post: newPost,
      metaTags: generateMetaTags({ post: newPost }),
      isPublished,
      user: user,
      // errorCode: errorCode
    },
  };
};

const Publish = ({
  post,
  isPublished,
  user,
}: {
  post: PostViewType;
  isPublished: boolean;
  user: IUser;
}): JSX.Element => {
  const config = SlatePublish();
  const components = (
    post.components ? JSON.parse(post.components) : []
  ) as CustomElement[];

  const [activity, setActivity] = React.useState<ActivityItem[] | undefined>(
    undefined
  );
  const [powerAnalysis, setPowerAnalysis] = React.useState<
    Array<Record<number | string, number>> | undefined
  >();
  const [elevationTotal, setElevationTotal] = React.useState<
    number | undefined
  >(Number(post.elevation));
  const [id, setId] = React.useState(post.id);
  const [distance, setDistance] = React.useState<number | undefined>(
    post.distance ? post.distance : undefined
  );
  const [normalizedPower, setNormalizedPower] = React.useState<
    number | undefined
  >(post.normalizedPower ? post.normalizedPower : undefined);

  const [heartAnalysis, setHeartAnalysis] = React.useState(
    post.heartAnalysis ? JSON.parse(post.heartAnalysis) : undefined
  );
  const [cadenceAnalysis, setCadenceAnalysis] = React.useState(
    post.cadenceAnalysis ? JSON.parse(post.cadenceAnalysis) : undefined
  );
  const [tempAnalysis, setTempAnalysis] = React.useState(
    post.tempAnalysis ? JSON.parse(post.tempAnalysis) : undefined
  );
  const [stoppedTime, setStoppedTime] = React.useState<number | undefined>(
    post.stoppedTime ? post.stoppedTime : undefined
  );
  const [elapsedTime, setElapsedTime] = React.useState<number | undefined>(
    post.elapsedTime ? post.elapsedTime : undefined
  );
  const [timeInRed, setTimeInRed] = React.useState<number | undefined>(
    post.timeInRed ? post.timeInRed : undefined
  );
  const [heroImage, setHeroImage] = React.useState<CloudinaryImage | undefined>(
    post.heroImage ? JSON.parse(post.heroImage) : undefined
  );
  const [author, setAuthor] = React.useState<Author | undefined>(
    post.author ? post.author : undefined
  );

  const [powerZones, setPowerZones] = React.useState<PowerZoneType[]>(
    post.powerZones ? JSON.parse(post.powerZones) : undefined
  );

  const [powerZoneBuckets, setPowerZoneBuckets] = React.useState<number[]>(
    post.powerZoneBuckets ? JSON.parse(post.powerZoneBuckets) : undefined
  );

  const [raceResults, setRaceResults] = React.useState<
    RaceResultRow | undefined
  >(post.raceResults ? JSON.parse(post.raceResults) : undefined);

  const [images, setImages] = React.useState<CloudinaryImage[] | undefined>(
    post.images ? JSON.parse(post.images) : undefined
  );

  const [title, setTitle] = React.useState<string | undefined>(post.title);

  const [subhead, setSubhead] = React.useState<string | undefined>(
    post.subhead ? post.subhead : undefined
  );

  const [date, setDate] = React.useState<string | undefined>(
    post.date ? post.date : undefined
  );

  const [currentFtp, setCurrentFtp] = React.useState<number | undefined>(
    post.currentFtp ? Number(post.currentFtp) : undefined
  );
  const [postLocation, setPostLocation] = React.useState<string | undefined>(
    post.postLocation ? post.postLocation : undefined
  );
  const [powers, setPowers] = React.useState<Array<number> | undefined>();
  const [hearts, setHearts] = React.useState<Array<number> | undefined>();

  const getTimeSeriesFile = async (timeSeriesFile: string) => {
    const result = await Storage.get(timeSeriesFile, {
      download: true,
      level: isPublished === true ? "public" : "private",
    });

    const timeSeriesData = (await new Response(
      result.Body
    ).json()) as TimeSeriesDataType;

    setPowerAnalysis(timeSeriesData.powerAnalysis);
    setPowers && setPowers(timeSeriesData.powers);
    setHearts && setHearts(timeSeriesData.hearts);

    const activityString = await getActivity(timeSeriesData);

    const activity =
      activityString &&
      activityString.map((a, i) => {
        return {
          t: a?.t,
          c: a?.c,
          g: a?.g !== null ? a?.g : 0,
          e: a?.e === null ? 0 : a?.e,
          d:
            a?.d === 0
              ? activityString[i - 1]
                ? activityString[i - 1]?.d
                : 0
              : a?.d,
        };
      });

    return activity;
  };

  React.useEffect(() => {
    if (!post.timeSeriesFile) {
      return;
    }
    getTimeSeriesFile(post.timeSeriesFile).then((e) => {
      return setActivity(e);
    });
  }, []);

  return (
    <>
      <PostContext.Provider
        value={{
          activity,
          setActivity,
          powerAnalysis,
          setPowerAnalysis,
          elevationTotal,
          setElevationTotal,
          id,
          setId,
          distance,
          setDistance,
          normalizedPower,
          setNormalizedPower,
          heartAnalysis,
          setHeartAnalysis,
          cadenceAnalysis,
          setCadenceAnalysis,
          tempAnalysis,
          setTempAnalysis,
          stoppedTime,
          setStoppedTime,
          elapsedTime,
          setElapsedTime,
          timeInRed,
          setTimeInRed,
          heroImage,
          setHeroImage,
          powerZones,
          setPowerZones,
          images,
          setImages,
          raceResults,
          setRaceResults,
          title,
          setTitle,
          currentFtp,
          setCurrentFtp,
          subhead,
          setSubhead,
          date,
          setDate,
          postLocation,
          setPostLocation,
          author,
          setAuthor,
          powerZoneBuckets,
          setPowerZoneBuckets,
          powers,
          setPowers,
          hearts,
          setHearts,
        }}
      >
        <Head>
          <title>{post.title}</title>
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>M</text></svg>"
          />
        </Head>
        <PostView
          components={components}
          config={config}
          post={post}
          user={user}
        />
      </PostContext.Provider>
    </>
  );
};

export default Publish;
