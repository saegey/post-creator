import { Box, Flex, Embed } from 'theme-ui';
import { useUnits } from './UnitProvider';

const EmbedElemnt = ({ element }) => {
  const { unitOfMeasure } = useUnits();
  const url = `${element.url}{${
    unitOfMeasure === 'metric' ? '&metricUnits=true' : ''
  }}`;

  return (
    <Flex
      sx={{
        // width: '900px',
        minWidth: '100%',
        // maxWidth: [null, null, '900px'],
        maxWidth: ['100vw', '900px', '900px'],
        height: 'fit-content',
        padding: ['10px', null, null],

        marginY: ['20px', '60px', '60px'],
      }}
    >
      <Box
        sx={{ marginX: 'auto', width: ['100%', null, null], maxWidth: '900px' }}
      >
        <Embed
          src={url}
          sx={{
            height: ['500px', '700px', '700px'],
            width: '100%',
            border: 'none',
          }}
        />
      </Box>
    </Flex>
  );
};

export default EmbedElemnt;
