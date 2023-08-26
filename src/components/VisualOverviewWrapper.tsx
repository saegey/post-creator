import React from 'react';
import dynamic from 'next/dynamic';

import { PostContext } from '../PostContext';

const VisualOverview = dynamic(import('@saegey/posts.visual-overview'), {
  ssr: false,
}); // Async API cannot be server-side rendered

const VisualOverviewWrapper = ({ attributes, children, element }) => {
  const { activity } = React.useContext(PostContext);
  const fixedData = activity.map((a) => {
    return { ...a, g: a.g !== null ? a.g : 0 };
  });
	console.log(fixedData)

  const vizOverview = React.useMemo(() => {
    return (
      <VisualOverview
        activity={fixedData}
        token={
          'pk.eyJ1Ijoic2FlZ2V5IiwiYSI6ImNsYmU1amxuYTA3emEzbm81anNmdXo4YnIifQ.uxutNvuagvWbw1h-RBfmPg'
        }
      />
    );
  }, [activity]);

  return vizOverview;
};

export default VisualOverviewWrapper;
