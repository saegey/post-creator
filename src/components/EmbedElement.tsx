import { Box, Flex } from 'theme-ui';
import { useUnits } from './UnitProvider';

const EmbedElemnt = ({ element }) => {
  const { unitOfMeasure } = useUnits();
  const url = `${element.url}{${
    unitOfMeasure === 'metric' ? '&metricUnits=true' : ''
  }}`;
  console.log(unitOfMeasure, url);
  return (
    <Flex
      sx={{
        width: '900px',
        minWidth: '100%',
        maxWidth: '900px',
        height: '700px',

        marginY: ['20px', '60px', '60px'],
      }}
      contentEditable={false}
    >
      <Box sx={{ marginX: 'auto' }}>
        <iframe
          src={url}
          scrolling='no'
          style={{ width: '900px', height: '700px', border: 'none' }}
        />
      </Box>
    </Flex>
  );
  return <h1>{JSON.stringify(element)}</h1>;
};

export default EmbedElemnt;
