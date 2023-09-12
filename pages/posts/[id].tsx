import { withSSRContext } from 'aws-amplify';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { withAuthenticator } from '@aws-amplify/ui-react';
import React from 'react';
import { Box } from 'theme-ui';

import Header from '../../src/components/Header';
import { PostContext } from '../../src/PostContext';
import { EditorContext } from '../../src/components/EditorContext';
import PostEditor from '../../src/components/PostEditor';
import { getPostInitial } from '../../src/graphql/customQueries';
import AuthCustom from '../../src/components/AuthCustom';

type ServerSideProps = {
  req: object;
  params: {
    id: string;
  };
};

export const getServerSideProps = async ({ req, params }: ServerSideProps) => {
  const SSR = withSSRContext({ req });

  const { data } = await SSR.API.graphql({
    query: getPostInitial,
    authMode: 'API_KEY',
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
    },
  };
};

const Post = ({
  signOut,
  user,
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
}) => {
  // const router = useRouter();
  const [title, setTitle] = React.useState(postTitle);
  const [subhead, setSubhead] = React.useState(postSubhead);
  const [postLocation, setPostLocation] = React.useState(postLocationOrig);
  const [id, setId] = React.useState(postId);
  const [activity, setActivity] = React.useState([]);
  const [gpxFile, setGpxFile] = React.useState(postGpxFile);
  const [stravaUrl, setStravaUrl] = React.useState(postStravaUrl);
  const [components, setComponents] = React.useState(postComponents);
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

  // editor context
  const [isGraphMenuOpen, setIsGraphMenuOpen] = React.useState(false);
  const [isFtpUpdating, setIsFtpUpdating] = React.useState(false);
  const [isGpxUploadOpen, setIsGpxUploadOpen] = React.useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);
  const [isPhotoCaptionOpen, setIsPhotoCaptionOpen] = React.useState(false);

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
      }}
    >
      <div>
        <Head>
          <title>{title}</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <AuthCustom>
          <Box
            as='main'
            sx={{
              // backgroundColor: 'editorBackground',
              // paddingBottom: '50px',
              // height: '100vh',
              width: '100vw',
              flexGrow: 1,
            }}
          >
            <Header user={user} signOut={signOut} title={'Edit Post'} />
            <Box>
              <EditorContext.Provider
                value={{
                  setIsGraphMenuOpen,
                  isGraphMenuOpen,
                  setIsFtpUpdating,
                  isFtpUpdating,
                  setIsGpxUploadOpen,
                  isGpxUploadOpen,
                  isImageModalOpen,
                  setIsImageModalOpen,
                  isPhotoCaptionOpen,
                  setIsPhotoCaptionOpen,
                }}
              >
                <PostEditor postId={postId} initialState={postComponents} />
              </EditorContext.Provider>
            </Box>
          </Box>
        </AuthCustom>
      </div>
    </PostContext.Provider>
  );
};

export default withAuthenticator(Post);
