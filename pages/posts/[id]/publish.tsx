import { withSSRContext } from 'aws-amplify';
import React from 'react';
import { Box, Flex, Text, Container } from 'theme-ui';
import Head from 'next/head';
import {
  SlateToReact,
  slateToReactConfig,
  type SlateToReactConfig,
} from '@slate-serializers/react';
import { CldImage } from 'next-cloudinary';
import PowerBreakdown from '../../../src/components/TimePowerZones';

import dynamic from 'next/dynamic';
import HeaderPublic from '../../../src/components/HeaderPublic';
import { getPostInitial } from '../../../src/graphql/customQueries';
import ActivityOverview from '../../../src/components/ActivityOverview';
import { PowerCurveGraph } from '../../../src/components/PowerCurveGraph';
import { getActivity } from '../../../src/actions/PostGet';
import PostHeader from '../../../src/components/PostHeader';
import EmbedElemnt from '../../../src/components/EmbedElement';

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
  const activityString = await getActivity(post);

  const activity = activityString.map((a, i) => {
    return {
      ...a,
      g: a?.g !== null ? a?.g : 0,
      d:
        a?.d === 0
          ? activityString[i - 1]
            ? activityString[i - 1]?.d
            : 0
          : a?.d,
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
          // console.log(graphData);
          return (
            <Box
              sx={{
                maxWidth: '690px',
                width: '100%',
                marginX: 'auto',
                height: ['300px', '450px', '450px'],
                marginY: ['30px', '60px', '60px'],
                backgroundColor: [
                  null,
                  'activityOverviewBackgroundColor',
                  'activityOverviewBackgroundColor',
                ],
                paddingY: '10px',
                borderRadius: '5px',
              }}
            >
              {/* <h2>Power Curve</h2> */}
              <PowerCurveGraph
                ftp={post.currentFtp ? Number(post.currentFtp) : 0}
                data={graphData as any}
              />
            </Box>
          );
        },
        embed: ({ node, children = [] }) => {
          return <EmbedElemnt element={node} />;
        },
        visualOverview: ({ node, children = [] }) => {
          return (
            <Flex sx={{ marginX: [null, '120px', '120px'] }}>
              <Box sx={{ width: '900px', maxWidth: '900px', marginX: 'auto' }}>
                <VisualOverview
                  activity={activity}
                  token={
                    'pk.eyJ1Ijoic2FlZ2V5IiwiYSI6ImNsYmU1amxuYTA3emEzbm81anNmdXo4YnIifQ.uxutNvuagvWbw1h-RBfmPg'
                  }
                />
              </Box>
            </Flex>
          );
        },
        timeInZones: ({ node, children = [] }) => {
          return (
            <Box
              sx={{
                marginY: ['20px', '60px', '60px'],
                marginX: 'auto',
                maxWidth: '690px',
                backgroundColor: [
                  null,
                  'activityOverviewBackgroundColor',
                  'activityOverviewBackgroundColor',
                ],
                padding: ['10px', '30px', '30px'],
                borderRadius: '5px',
              }}
            >
              <PowerBreakdown
                powerZoneBuckets={JSON.parse(post.powerZoneBuckets)}
                powerZones={JSON.parse(post.powerZones)}
              />
            </Box>
          );
        },
        heroBanner: ({ node, children = [] }) => {
          return (
            <Box sx={{ marginBottom: '120px' }}>
              <PostHeader
                headerImage={
                  <Box sx={{ width: '100%', height: '100%' }}>
                    <CldImage
                      width='1800'
                      height='800'
                      src={JSON.parse(post.heroImage).public_id}
                      sizes='100vw'
                      alt='race pic'
                      quality={90}
                      style={{
                        objectFit: 'fill',
                        width: '100%',
                        height: '100%',
                        // borderRadius: '5px',
                      }}
                    />
                  </Box>
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
                marginY: ['20px', '60px', '60px'],
                maxWidth: '690px',
                marginX: 'auto',
                backgroundColor: [
                  null,
                  'activityOverviewBackgroundColor',
                  'activityOverviewBackgroundColor',
                ],
                borderRadius: '5px',
                padding: ['10px', '30px', '30px'],
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
        'bulleted-list': ({ node, children = [] }) => {
          return (
            <Box
              as='ul'
              sx={{
                paddingY: '40px',
                paddingLeft: ['20px', '20px', '20px'],
                marginX: 'auto',
                maxWidth: '690px',
                fontSize: '20px',
                li: {
                  paddingX: '5px',
                  paddingY: '5px',
                },
              }}
            >
              {node.children.map((c, i) => {
                return (
                  <Box as='li'>
                    {c.children.map((child) => {
                      if (child.bold) {
                        return (
                          <Box as='span' sx={{ fontWeight: '700' }}>
                            {child.text}
                          </Box>
                        );
                      }
                      return `${child.text}`;
                    })}
                  </Box>
                );
              })}
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
                      // marginY: '15px',
                      fontSize: '20px',
                      maxWidth: '690px',
                      // font-size: 20px;
                      borderLeftWidth: '1px',
                      paddingLeft: '8px',
                      marginX: 'auto',
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
                if (!c.text || c.text === '') {
                  return;
                }
                return (
                  <Text
                    as='p'
                    key={`text-paragraph-${i}`}
                    sx={{
                      // marginY: '15px',
                      fontSize: '20px',
                      maxWidth: '690px',
                      marginX: 'auto',
                      width: [null, '690px', '690px'],
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
                  <Flex
                    sx={{ maxWidth: '690px', width: '690px', marginX: 'auto' }}
                    key={`heading-two-${i}`}
                  >
                    <Text
                      as='h2'
                      sx={{
                        marginY: '15px',
                        // fontSize: '20px',
                        maxWidth: '690px',
                      }}
                    >
                      {c.text}
                    </Text>
                  </Flex>
                );
              })}
            </>
          );
        },
        image: ({ node, children = [] }) => {
          return (
            <Flex>
              <Box
                sx={{
                  marginY: ['20px', '60px', '60px'],
                  maxWidth: '900px',
                  width: '900px',
                  marginX: 'auto',
                }}
              >
                <CldImage
                  width='1200'
                  height='1200'
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
              </Box>
            </Flex>
          );
        },
      },
    },
  };

  const components = JSON.parse(post.components);
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box
        as='main'
        sx={{
          marginBottom: 'auto',
        }}
      >
        <HeaderPublic />

        {/* <Flex sx={{ flexDirection: 'column', width: '100vw' }}> */}
        <Container
          as='article'
          className='article'
          sx={{
            '&.article>p+p': {
              paddingTop: '30px',
            },
            '&.article>h2+ul': {
              paddingTop: '30px',
            },
            '&.article>ul+h2': {
              paddingTop: '30px',
            },
            '&.article>ol+h2': {
              paddingTop: '30px',
            },
            '&.article>h2+ol': {
              paddingTop: '0px',
            },
            '&.article>p+h2': {
              paddingTop: '30px',
            },
          }}
        >
          <SlateToReact node={components} config={config} />
        </Container>
      </Box>
    </>
  );
};

export default Publish;
