import React from 'react';

import PowerGraphElement from '../components/PowerGraphElement';
import ImageElement from '../components/ImageElement';
import VisualOverviewWrapper from '../components/VisualOverviewWrapper';

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
  const style = { textAlign: element.align };
  switch (element.type) {
    case 'powergraph':
      return (
        <PowerGraphElement
          attributes={attributes}
          children={children}
          element={element}
        />
      );
    case 'visualOverview':
      return (
        <VisualOverviewWrapper
          attributes={attributes}
          children={children}
          element={element}
        />
      );
    case 'image':
      return (
        <ImageElement
          attributes={attributes}
          children={children}
          element={element}
        />
      );
    case 'heading-two':
      return (
        <h2
          style={{
            fontWeight: 700,
            maxWidth: '690px',
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
            maxWidth: '690px',
            fontSize: '20px',
            // fontWeight: 400,
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
