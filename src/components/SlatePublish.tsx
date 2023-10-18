import React from 'react';
import { Box, Flex, Text, Image as ThemeImage, Link, Spinner } from 'theme-ui';
import {
  slateToReactConfig,
  type SlateToReactConfig,
} from '@slate-serializers/react';
import { CldImage } from 'next-cloudinary';

import PowerBreakdown from '../../src/components/TimePowerZones';
import ActivityOverview from '../../src/components/ActivityOverview';
import { PowerCurveGraph } from '../../src/components/PowerCurveGraph';
import EmbedElemnt from '../../src/components/EmbedElement';
import RaceResultsDotComList from './RaceResultsDotComList';
import PostHeaderTextBlock from './PostHeaderTextBlock';
import PostAuthor from './PostAuthor';
import { cloudUrl } from '../utils/cloudinary';
import VisualOverview from '../../src/components/VisualOverview';
import { PostContext } from './PostContext';

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

const SlatePublish = ({ post }) => {
  const { title, subhead, date, postLocation, headerImageCaption, images } =
    post;

  const config: SlateToReactConfig = {
    ...slateToReactConfig,
    react: {
      elementTransforms: {
        ...slateToReactConfig.react.elementTransforms,
        powergraph: ({ node, children = [] }) => {
          // const powerAnalysis = JSON.parse(post.powerAnalysis);
          const postContext = React.useContext(PostContext);
          if (!postContext.powerAnalysis) {
            return (
              <Box>
                <Spinner />
              </Box>
            );
          }
          const graphData = Object.keys(postContext.powerAnalysis)
            .map((k, i) => {
              if (Number(k) > 0) {
                return {
                  x: Number(k),
                  y:
                    postContext && postContext.powerAnalysis
                      ? postContext.powerAnalysis[k]
                      : 0,
                };
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
          const postContext = React.useContext(PostContext);

          return (
            <Flex sx={{ marginX: [null, '120px', '120px'] }}>
              <Box sx={{ width: '900px', maxWidth: '900px', marginX: 'auto' }}>
                <VisualOverview
                  activity={
                    postContext && postContext.activity
                      ? postContext.activity
                      : undefined
                  }
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
          console.log('herro banner');
          const heroImage = JSON.parse(post.heroImage);

          return (
            <Box
              sx={{
                width: '100%',
                marginBottom: '60px',
              }}
            >
              <Flex
                sx={{
                  height: 'fit-content',
                  flexDirection: ['column', 'row', 'row'],
                  width: '100%',
                }}
              >
                {' '}
                <Box
                  sx={{
                    backgroundColor: heroImage.colors[0],
                    width: ['100%', '65%', '65%'],
                    display: ['inline-block', '', ''],
                    height: '600px',
                    // height: ['400px', '600px', '600px'],
                    // '@media (max-width: 400px)': {
                    //   height: '300px',
                    // },

                    // '@media only screen and (max-width: 600px) and (min-width: 400px)':
                    //   {
                    //     height: '400px',
                    //   },
                    '@media (min-width: 900px)': {
                      height: '700px',
                    },
                  }}
                >
                  <CldImage
                    // as={CldImage}
                    priority={true}
                    width={heroImage.width}
                    height={heroImage.height}
                    src={heroImage.public_id}
                    // sizes='100vw'
                    alt='race pic'
                    style={{
                      objectFit: 'contain',
                      // height: '100%',
                      maxWidth: '100%',
                      maxHeight: '100%',
                      // width: '100%',
                      // width: ['100%', null, null],
                    }}
                    config={{
                      cloud: {
                        cloudName: cloudUrl,
                      },
                    }}
                  />
                </Box>
                <Box sx={{ width: ['100%', '35%', '35%'] }}>
                  <PostHeaderTextBlock
                    type={'Race'}
                    title={title ? title : 'Title'}
                    teaser={subhead ? subhead : 'Subhead'}
                    date={date ? date : 'Event date'}
                    location={postLocation ? postLocation : 'Location'}
                    headerImageCaption={
                      node.photoCaption
                        ? node.photoCaption
                        : 'Enter caption here'
                    }
                    height='100%'
                  />
                </Box>
              </Flex>
            </Box>
          );
        },
        activityOverview: () => {
          const { powerAnalysis } = React.useContext(PostContext);
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
                  powerAnalysis: powerAnalysis,
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
        'heading-two': ({ node }) => {
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
                        paddingY: '15px',
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
        raceResultsDotCom: () => {
          return (
            <Box variant='boxes.componentCard'>
              <RaceResultsDotComList
                raceResults={JSON.parse(post.raceResults)}
              />
            </Box>
          );
        },
        postAuthor: () => {
          return (
            <PostAuthor
              postAuthor={post.author}
              publishedDate={post.createdAt}
            />
          );
        },
        image: ({ node, children = [] }) => {
          const imageMeta = JSON.parse(images)?.find(
            (i) => i.public_id === node.public_id
          );
          return (
            <Flex>
              <Box
                sx={{
                  position: 'relative',
                  width: '900px',
                  maxWidth: '900px',
                  marginX: 'auto',
                  marginY: ['20px', '60px', '60px'],
                  height: '600px',
                  // maxHeight: '600px',
                  marginBottom: '20px',
                }}
              >
                <Flex
                  sx={{
                    width: '100%',
                    height: '600px',
                    backgroundColor: imageMeta?.colors[0],
                    borderRadius: [0, '5px', '5px'],
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
                      objectFit: 'contain',
                      // height: '100%',
                      width: '100%',
                      maxHeight: '100%',
                      borderRadius:
                        imageMeta &&
                        imageMeta.width &&
                        imageMeta.height &&
                        imageMeta?.width > imageMeta?.height
                          ? '5px'
                          : '0px',
                    }}
                    config={{
                      cloud: {
                        cloudName: cloudUrl,
                      },
                    }}
                  />
                </Flex>
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
