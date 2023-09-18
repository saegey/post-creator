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

const renderElement = ({ attributes, children, element }) => {
  switch (element.type) {
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

    case 'heading-two':
      return (
        <h2
          style={{
            fontWeight: 700,
            maxWidth: '690px',
            // width: '100vw',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          {...attributes}
        >
          {children}
        </h2>
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
    default:
      return (
        <Text
          as='p'
          sx={{
            marginX: 'auto',
            // marginRight: 'auto',
            width: '690px',
            fontSize: '20px',
            marginY: '20px',
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
