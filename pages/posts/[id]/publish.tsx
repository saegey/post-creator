import { withSSRContext } from 'aws-amplify';
import React from 'react';
import { Box, Flex, Text } from 'theme-ui';
import {
  SlateToReact,
  slateToReactConfig,
  type SlateToReactConfig,
} from '@slate-serializers/react';
import { CldImage } from 'next-cloudinary';
// import VisualOverview from '../../../src/components/VisualOverview';

import dynamic from 'next/dynamic';
import Header from '../../../src/components/Header';
import { getPostInitial } from '../../../src/graphql/customQueries';
import ActivityOverview from '../../../src/components/ActivityOverview';
import Link from 'next/link';
import { PowerCurveGraph } from '../../../src/components/PowerCurveGraph';
import { getActivity } from '../../../src/actions/PostGet';
import HeroBanner from '../../../src/components/HeroBanner';
import PostHeader from '../../../src/components/PostHeader';

const VisualOverview = dynamic(
  import('../../../src/components/VisualOverview'),
  {
    ssr: false,
  }
); // Async API cannot be server-side rendered

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
  if (!data || !data.getPost) {
    console.error('faileed too get activity data');
    return;
  }
  const post = data.getPost;
  // console.log(post.coordinates);

  const activityString = await getActivity(post);

  const activity = activityString.map((a) => {
    return {
      ...a,
      g: a.g !== null ? a.g : 0,
    };
  });

  return {
    props: {
      post: post,
      activity: activity,
    },
  };
};

const Publish = ({ post, activity }): JSX.Element => {
  const config: SlateToReactConfig = {
    ...slateToReactConfig,
    react: {
      elementTransforms: {
        ...slateToReactConfig.react.elementTransforms,
        powergraph: ({ node, children = [] }) => {
          const powerAnalysis = JSON.parse(post.powerAnalysis);
          const graphData = Object.keys(powerAnalysis)
            .map((k, i) => {
              if (Number(k) > 0) {
                return { x: Number(k), y: powerAnalysis[k] };
              }
            })
            .filter((p) => p !== undefined);
          console.log(graphData);
          return (
            <Box
              sx={{
                maxWidth: '690px',
                width: '100%',
                marginX: 'auto',
                height: '350px',
                marginY: '20px',
                backgroundColor: '#f1f1f1',
                padding: '30px',
                borderRadius: '5px',
              }}
            >
              <h2>Power Curve</h2>
              <PowerCurveGraph
                ftp={post.currentFtp ? Number(post.currentFtp) : 0}
                data={graphData as any}
              />
            </Box>
          );
        },
        visualOverview: ({ node, children = [] }) => {
          return (
            <Box>
              <VisualOverview
                activity={activity}
                token={
                  'pk.eyJ1Ijoic2FlZ2V5IiwiYSI6ImNsYmU1amxuYTA3emEzbm81anNmdXo4YnIifQ.uxutNvuagvWbw1h-RBfmPg'
                }
              />
            </Box>
          );
        },
        timeInZones: ({ node, children = [] }) => {
          return <h1>time in zonoes</h1>;
        },
        heroBanner: ({ node, children = [] }) => {
          return (
            <Box sx={{ marginBottom: '120px' }}>
              <PostHeader
                headerImage={
                  <CldImage
                    width='800'
                    height='800'
                    src={JSON.parse(post.heroImage).public_id}
                    sizes='100vw'
                    alt='race pic'
                    quality={90}
                    style={{
                      objectFit: 'cover',
                      // width: '100%',
                      height: '100%',
                      // borderRadius: '5px',
                    }}
                  />
                }
                type={'Race'}
                teaser={'This is an epic race that you need to attend.'}
                headerImageCaption={
                  'Thee fieelld strung out on the first descent'
                }
                title={post.title ? post.title : ''}
                location={post.postLocation ? post.postLocation : ''}
                date={'2023-09-09'}
              />
            </Box>
          );
        },
        activityOverview: ({ node, children = [] }) => {
          return (
            <Box
              sx={{
                marginY: '20px',
                maxWidth: '690px',
                marginX: 'auto',
                backgroundColor: '#f1f1f1',
                borderRadius: '5px',
                padding: '30px',
              }}
            >
              <ActivityOverview
                data={{
                  elevationGain: post.elevationTotal,
                  distance: post.distance,
                  normalizedPower: post.normalizedPower,
                  heartAnalysis: JSON.parse(post.heartAnalysis),
                  powerAnalysis: JSON.parse(post.powerAnalysis),
                  cadenceAnalysis: JSON.parse(post.cadenceAnalysis),
                  tempAnalysis: JSON.parse(post.tempAnalysis),
                  stoppedTime: post.stoppedTime,
                  elapsedTime: { seconds: post.elapsedTime },
                  timeInRed: post.timeInRed,
                }}
                selectedFields={[
                  'Normalized Power',
                  'Avg Heart Rate',
                  'Distance',
                  'Elevation Gain',
                  'Avg Temperature',
                  'Avg Speed',
                  'Elapsed Time',
                  'Stopped Time',
                  'Time in Red',
                  'Avg Cadence',
                  'Avg Power',
                ]}
              />
            </Box>
          );
        },
        paragraph: ({ node, children = [] }) => {
          return (
            <>
              {node.children.map((c, i) => {
                if (!c.text) {
                  return;
                }
                return (
                  <Text
                    as='p'
                    key={`paragraph-${i}`}
                    sx={{
                      marginY: '15px',
                      fontSize: '20px',
                      maxWidth: '690px',
                      // font-size: 20px;
                      borderLeftWidth: '1px',
                      paddingLeft: '8px',
                    }}
                  >
                    {c.text}
                  </Text>
                );
              })}
            </>
          );
        },
        text: ({ node, children = [] }) => {
          return (
            <>
              {node.children.map((c, i) => {
                if (!c.text) {
                  return;
                }
                return (
                  <Text
                    as='p'
                    key={`paragraph-${i}`}
                    sx={{
                      marginY: '15px',
                      fontSize: '20px',
                      maxWidth: '690px',
                      marginX: 'auto',
                      // font-size: 20px;
                      borderLeftWidth: '1px',
                      borderLeftStyle: 'solid',
                      borderLeftColor: '#cccccc',
                      paddingLeft: '8px',
                    }}
                  >
                    {c.text}
                  </Text>
                );
              })}
            </>
          );
        },
        'heading-two': ({ node, children = [] }) => {
          return (
            <>
              {node.children.map((c, i) => {
                if (!c.text) {
                  return;
                }
                return (
                  <Text
                    as='h2'
                    key={`paragraph-${i}`}
                    sx={{
                      marginY: '15px',
                      // fontSize: '20px',
                      maxWidth: '690px',
                    }}
                  >
                    {c.text}
                  </Text>
                );
              })}
            </>
          );
        },
        image: ({ node, children = [] }) => {
          return (
            <Box sx={{ marginBottom: '15px' }}>
              <CldImage
                width='800'
                height='800'
                src={node.public_id}
                sizes='100vw'
                alt='race pic'
                quality={90}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '5px',
                }}
              />
              <p>{node.caption}</p>
              {/* <p>{JSON.stringify(node)}</p> */}
            </Box>
          );
        },
      },
    },
  };

  // const serialize = (nodes) => {
  //   return nodes.map((n) => Node.string(n)).join('\n');
  // };

  return (
    <Box
      as='main'
      sx={{
        // backgroundColor: 'editorBackground',
        // paddingBottom: '50px',
        // height: '100%',
        width: '100vw',
        flexGrow: 1,
        marginBottom: 'auto',
      }}
    >
      <Header user={null} signOut={() => {}} title={''} />
      <Flex sx={{ flexDirection: 'column', width: '100vw' }}>
        {/* <Box sx={{ marginX: 'auto', maxWidth: '900px' }}> */}
        <Link href={`/posts/${post.id}/`}>Edit</Link>
        {/* <h1>{post.title}</h1>
        <h2>{post.postLocation}</h2> */}
        <SlateToReact node={JSON.parse(post.components)} config={config} />
        {/* </Box> */}
      </Flex>
    </Box>
  );
};

export default Publish;
