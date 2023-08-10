import PowerGraphElement from '../components/PowerGraphElement';
import ImageElement from '../components/ImageElement';

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
        <h2 style={style} {...attributes}>
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
            fontWeight: 400,
          }}
          {...attributes}
        >
          {children}
        </p>
      );
  }
};

export default renderElement