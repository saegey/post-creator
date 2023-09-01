import { Box } from 'theme-ui';

const BlackBox = ({ children, opacity = '0.2' }) => (
  <Box
    sx={{
      position: 'fixed',
      top: '0',
      height: '100%',
      width: '100%',
      left: '0',
      backgroundColor: `rgba(0,0,0, ${opacity})`,
      zIndex: 10000,
      display: 'flex',
    }}
    // onClick={() => console.log('fuck')}
  >
    {children}
  </Box>
);

export default BlackBox;
