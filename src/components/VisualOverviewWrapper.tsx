import React from 'react';
import dynamic from 'next/dynamic';

import { MyContext } from '../MyContext';

const VisualOverview = dynamic(import('@saegey/posts.visual-overview'), {
  ssr: false,
}); // Async API cannot be server-side rendered

const VisualOverviewWrapper = ({ attributes, children, element }) => {
  const { elevation, coordinates } = React.useContext(MyContext);

  return (
    <VisualOverview
      elevationData={{
        data: elevation,
        downsampleRate: 2,
        axisXTickValues: {
          imperial: [[2, 4, 6, 8]],
          metric: [[4, 8, 12]],
        },
        axisLeftTickValues: {
          imperial: [[200, 300, 400]],
          metric: [[50, 100, 150]],
        },
      }}
      coordinates={coordinates}
      elevationToAdd={500}
      yMin={0}
      token={
        'pk.eyJ1Ijoic2FlZ2V5IiwiYSI6ImNsYmU1amxuYTA3emEzbm81anNmdXo4YnIifQ.uxutNvuagvWbw1h-RBfmPg'
      }
    />
  );
};

export default VisualOverviewWrapper;
