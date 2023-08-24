import React from 'react';
import dynamic from 'next/dynamic';

import { PostContext } from '../PostContext';

const VisualOverview = dynamic(import('@saegey/posts.visual-overview'), {
  ssr: false,
}); // Async API cannot be server-side rendered

const VisualOverviewWrapper = ({ attributes, children, element }) => {
  const { activity } = React.useContext(PostContext);
  console.log(activity);
  const vizOverview = React.useMemo(() => {
    return (
      <VisualOverview
        elevationData={{
          data: [],
          downsampleRate: 1,
          axisXTickValues: {
            imperial: [[2, 4, 6]],
            metric: [[4, 8, 12]],
          },
          axisLeftTickValues: {
            imperial: [[200, 300, 400]],
            metric: [[50, 100, 150]],
          },
        }}
        coordinates={[]}
        elevationToAdd={500}
        yMin={0}
        token={
          'pk.eyJ1Ijoic2FlZ2V5IiwiYSI6ImNsYmU1amxuYTA3emEzbm81anNmdXo4YnIifQ.uxutNvuagvWbw1h-RBfmPg'
        }
      />
    );
  }, [elevation, coordinates]);

  return vizOverview;
};

export default VisualOverviewWrapper;
