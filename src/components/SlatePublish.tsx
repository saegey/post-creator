import React from 'react';
import { Box, Flex, Text, Image, Link } from 'theme-ui';
import {
  slateToReactConfig,
  type SlateToReactConfig,
} from '@slate-serializers/react';
import { CldImage } from 'next-cloudinary';
import dynamic from 'next/dynamic';

import PowerBreakdown from '../../src/components/TimePowerZones';
import ActivityOverview from '../../src/components/ActivityOverview';
import { PowerCurveGraph } from '../../src/components/PowerCurveGraph';
import PostHeader from '../../src/components/PostHeader';
import EmbedElemnt from '../../src/components/EmbedElement';
import RaceResultsDotComList from './RaceResultsDotComList';

const VisualOverview = dynamic(import('../../src/components/VisualOverview'), {
  ssr: false,
}); // Async API cannot be server-side rendered

const renderLink = (node) => {
  const attrs: any = {};

  return (
    <>
      <Link
        href={node.href}
        {...attrs}
        target={node.target}
        sx={{ textDecorationColor: 'text', color: 'text' }}
      >
        {node.children.map((c) => c.text)}
      </Link>
    </>
  );
};

const SlatePublish = ({ post, activity }) => {
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
                padding: ['20px', '30px', '30px'],
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
        heroBanner: ({ node }) => {
          return (
            <Box sx={{ marginBottom: ['0px', '60px', '120px'] }}>
              <PostHeader
                headerImage={
                  <Box sx={{ width: '100%', height: '100%' }}>
                    <CldImage
                      width='1800'
                      height='800'
                      src={JSON.parse(post.heroImage)?.public_id}
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
                teaser={post.subhead ? post.subhead : ''}
                headerImageCaption={node.photoCaption}
                title={post.title ? post.title : ''}
                location={post.postLocation ? post.postLocation : ''}
                date={post.date ? post.date : ''}
              />
            </Box>
          );
        },
        activityOverview: () => {
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
                padding: ['20px', '30px', '30px'],
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
                paddingTop: ['0px', '0px', '0px'],
                paddingBottom: ['0px', '20px', '20px'],
                paddingLeft: ['40px', '25px', '25px'],
                paddingRight: ['20px', '20px', '20px'],
                borderLeftColor: '#cccccc',
                borderLeftStyle: 'solid',
                borderLeftWidth: ['0px', '1px', '1px'],
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
                  <Box as='li' key={`bullet-${i}`}>
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
                      fontSize: '20px',
                      maxWidth: '690px',
                      width: ['100vw', null, null],
                      borderLeftWidth: ['0px', '1px', '1px'],
                      borderLeftStyle: 'solid',
                      borderLeftColor: '#cccccc',
                      paddingX: ['20px', '8px', '8px'],
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
        text: ({ node }) => {
          return (
            <Text
              as='p'
              sx={{
                fontSize: '20px',
                maxWidth: '690px',
                marginX: 'auto',
                width: ['100vw', null, null],
                borderLeftWidth: ['0px', '1px', '1px'],
                borderLeftStyle: 'solid',
                borderLeftColor: '#cccccc',
                paddingX: ['20px', '8px', '8px'],
              }}
            >
              {node.children.map((c, i) => {
                if (c.type === 'link') {
                  return renderLink(c);
                }
                return (
                  <Text
                    as='span'
                    className='text'
                    key={`text-paragraph-${i}`}
                    sx={{
                      fontWeight: c.bold ? '700' : null,
                    }}
                  >
                    {c.text}
                  </Text>
                );
              })}
            </Text>
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
                    sx={{
                      maxWidth: '690px',
                      width: '690px',
                      marginX: 'auto',
                    }}
                    key={`heading-two-${i}`}
                  >
                    <Text
                      as='h2'
                      sx={{
                        // marginY: '15px',
                        paddingY: '15px',
                        // fontSize: '20px',
                        borderLeft: '1px solid #cccccc',
                        width: ['100vw', null, null],
                        maxWidth: '690px',
                        paddingX: ['20px', '8px', '8px'],
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
        raceResultsDotCom: ({ node, children = [] }) => {
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
                padding: ['20px', '30px', '30px'],
              }}
            >
              <RaceResultsDotComList
                raceResults={JSON.parse(post.raceResults)}
              />
            </Box>
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
                <Image
                  as={CldImage}
                  width='1200'
                  height='1200'
                  src={node.public_id}
                  sizes='100vw'
                  alt='race pic'
                  // quality={'90'}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: ['0px', '5px', '5px'],
                  }}
                />
                <Text as='p' sx={{ paddingX: ['10px', null, null] }}>
                  {node.caption}
                </Text>
              </Box>
            </Flex>
          );
        },
      },
    },
  };
  return config;
};

export default SlatePublish;
