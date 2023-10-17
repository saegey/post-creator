import { withSSRContext } from 'aws-amplify';
import Head from 'next/head';
import React from 'react';
import { Amplify, Auth } from 'aws-amplify';

// import awsconfig from '../../../src/aws-exports';
import { PostContext } from '../../../src/components/PostContext';
import { getPostInitial } from '../../../src/graphql/customQueries';
import AuthCustom from '../../../src/components/AuthCustom';
import EditUserPost from '../../../src/components/EditUserPost';
// Amplify.configure(awsconfig);

type ServerSideProps = {
  req: object;
  params: {
    id: string;
  };
};

export const getServerSideProps = async ({ req, params }: ServerSideProps) => {
  const { API } = withSSRContext({ req });

  const { data } = await API.graphql({
    query: getPostInitial,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
    variables: {
      id: params.id,
    },
  });

  const post = data.getPost;

  return {
    props: {
      postId: post.id,
      postComponents: JSON.parse(post.components),
      postTitle: post.title,
      postSubhead: post.subhead,
      postImages: JSON.parse(post.images),
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
      postHeartAnalysis: JSON.parse(post.heartAnalysis),
      postPowerAnalysis: JSON.parse(post.powerAnalysis) as { entire: number },
      postCadenceAnalysis: JSON.parse(post.cadenceAnalysis),
      postTempAnalysis: JSON.parse(post.tempAnalysis),
      postPowerZones: JSON.parse(post.powerZones),
      postPowerZoneBuckets: JSON.parse(post.powerZoneBuckets),
      postHeroImage: JSON.parse(post.heroImage),
      postDate: post.date,
      postAuthor: post.author,
      postShortUrl: post.shortUrl,
      postRaceResults: JSON.parse(post.raceResults),
      postTimeSeriesFile: post.timeSeriesFile,
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
}) => {
  const isNewPost = (postComponents) => {
    if (postComponents.length === 1 && postComponents[0].type === 'text') {
      return true;
    } else {
      return false;
    }
  };
  const [title, setTitle] = React.useState(postTitle);
  const [subhead, setSubhead] = React.useState(postSubhead);
  const [postLocation, setPostLocation] = React.useState(postLocationOrig);
  const [id, setId] = React.useState(postId);
  const [activity, setActivity] = React.useState([]);
  const [gpxFile, setGpxFile] = React.useState(postGpxFile);
  const [stravaUrl, setStravaUrl] = React.useState(postStravaUrl);
  const [components, setComponents] = React.useState(
    isNewPost(postComponents)
      ? [
          {
            type: 'heroBanner',
            children: [{ text: '' }],
          },
          {
            type: 'postAuthor',
            children: [{ text: '' }],
          },
          {
            type: 'paragraph',
            children: [{ text: 'Discuss your race...' }],
          },
        ]
      : postComponents
  );
  const [images, setImages] = React.useState(postImages ? postImages : []);

  const [currentFtp, setCurrentFtp] = React.useState(postCurrentFtp);
  const [resultsUrl, setResultsUrl] = React.useState(postResultsUrl);

  const [powerAnalysis, setPowerAnalysis] = React.useState<{
    entire: number;
  } | null>(null);
  const [heartAnalysis, setHeartAnalysis] = React.useState(postHeartAnalysis);
  const [cadenceAnalysis, setCadenceAnalysis] =
    React.useState(postCadenceAnalysis);
  const [tempAnalysis, setTempAnalysis] = React.useState(postTempAnalysis);

  const [initialLoad, setInitialLoad] = React.useState(true);

  const [elevationTotal, setElevationTotal] =
    React.useState(postElevationTotal);
  const [normalizedPower, setNormalizedPower] =
    React.useState(postNormalizedPower);
  const [distance, setDistance] = React.useState(postDistance);
  const [elapsedTime, setElapsedTime] = React.useState(postElapsedTime);
  const [stoppedTime, setStoppedTime] = React.useState(postStoppedTime);
  const [timeInRed, setTimeInRed] = React.useState(postTimeInRed);
  const [powerZones, setPowerZones] = React.useState(postPowerZones);
  const [powerZoneBuckets, setPowerZoneBuckets] =
    React.useState(postPowerZoneBuckets);
  const [heroImage, setHeroImage] = React.useState(postHeroImage);
  const [date, setDate] = React.useState(postDate);
  const [author, setAuthor] = React.useState(postAuthor);
  const [shortUrl, setShortUrl] = React.useState(postShortUrl);
  const [raceResults, setRaceResults] = React.useState(postRaceResults);
  const [timeSeriesFile, setTimeSeriesFile] =
    React.useState(postTimeSeriesFile);

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
    }
  }, [postComponents]);

  React.useEffect(() => {
    setInitialLoad(false);
    // getUser().then((g) => console.log(g.identityId));
  }, []);

  // const getUser = async () => {
  //   return await Auth.currentUserCredentials();
  //   // console.log("identityId", credentials.identityId);
  // };

  return (
    <AuthCustom>
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
        }}
      >
        <div>
          <Head>
            <title>{title}</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>

          <EditUserPost
            postComponents={components}
            postId={postId}
            author={author}
          />
        </div>
      </PostContext.Provider>
    </AuthCustom>
  );
};

export default Post;
