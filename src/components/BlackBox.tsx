import { Box } from 'theme-ui'

const BlackBox = ({ children }) => (
  <Box
    sx={{
      position: 'fixed',
      top: '0',
      height: '100%',
      width: '100%',
      left: '0',
      backgroundColor: 'rgba(0,0,0,0.8)',
      zIndex: 10000,
      display: 'flex',
    }}
  >
    {children}
  </Box>
);

export default BlackBox
