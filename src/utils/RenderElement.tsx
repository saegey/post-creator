import React from 'react';
import { Box, Text } from 'theme-ui';

import PowerGraphElement from '../components/PowerGraphElement';
import ImageElement from '../components/ImageElement';
import VisualOverviewWrapper from '../components/VisualOverviewWrapper';
import ActivityOverviewWrapper from '../components/ActivityOverviewWrapper';
import TimePowerZonesWrapper from '../components/TimePowerZonesWrapper';
import MatchesBurnedWrapper from '../components/MatchesBurnedWrapper';
import StravaLink from '../components/StravaLink';
import HeroBanner from '../components/HeroBanner';
import EmbedElemnt from '../components/EmbedElement';
import RaceResultsDotComListWrapper from '../components/RaceResultsDotComListWrapper';
import Link from '../components/Link';
import PostAuthor from '../components/PostAuthor';

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : '' }}
    >
      {props.children}
    </span>
  );
};

// Define a leaf rendering function that is memoized with `useCallback`.
const renderLeaf = (props) => {
  return <Leaf {...props} />;
};

const renderElement = (props) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case 'postAuthor':
      return <PostAuthor publishedDate={element} />;
    case 'embed':
      return <EmbedElemnt element={element} />;
    case 'stravaLink':
      return <StravaLink element={element} />;
    case 'powergraph':
      return <PowerGraphElement element={element} />;
    case 'timeInZones':
      return <TimePowerZonesWrapper element={element} />;
    case 'matchesBurned':
      return <MatchesBurnedWrapper element={element} />;
    case 'activityOverview':
      return <ActivityOverviewWrapper element={element} />;
    case 'visualOverview':
      return <VisualOverviewWrapper element={element} />;
    case 'image':
      return <ImageElement children={children} element={element} />;
    case 'heroBanner':
      return <HeroBanner element={element} />;
    case 'link':
      return <Link {...props} />;

    case 'heading-two':
      return (
        <Text
          as='h2'
          sx={{
            fontWeight: 700,
            maxWidth: '690px',
            width: ['100%', '690px', '690px'],
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingX: ['10px', '0px', '0px'],
          }}
          {...attributes}
          {...element.attr}
        >
          {children}
        </Text>
      );
    case 'bulleted-list':
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
          {...attributes}
        >
          {children}
        </Box>
      );
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'raceResultsDotCom':
      return <RaceResultsDotComListWrapper />;
    default:
      return (
        <Text
          as='p'
          sx={{
            marginX: 'auto',
            // marginRight: 'auto',
            width: ['100%', '690px', '690px'],
            fontSize: '20px',
            marginY: '20px',
            paddingX: ['10px', '0px', '0px'],
          }}
          {...attributes}
        >
          {children}
        </Text>
      );
  }
};

export default renderElement;
export { renderLeaf };
