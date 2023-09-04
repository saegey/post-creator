import React from 'react';

import PowerGraphElement from '../components/PowerGraphElement';
import ImageElement from '../components/ImageElement';
import VisualOverviewWrapper from '../components/VisualOverviewWrapper';
import ActivityOverviewWrapper from '../components/ActivityOverviewWrapper';
import TimePowerZonesWrapper from '../components/TimePowerZonesWrapper';
import MatchesBurnedWrapper from '../components/MatchesBurnedWrapper';

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
    case 'powergraph':
      return (
        <PowerGraphElement
          attributes={attributes}
          children={children}
          element={element}
        />
      );
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
    case 'heading-two':
      return (
        <h2
          style={{
            fontWeight: 700,
            // maxWidth: '690px',
            // width: '100vw',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          {...attributes}
        >
          {children}
        </h2>
      );
    default:
      return (
        <p
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            // maxWidth: '690px',
            // width: '100vw',
            fontSize: '20px',
          }}
          {...attributes}
        >
          {children}
        </p>
      );
  }
};

export default renderElement;
export { renderLeaf };
