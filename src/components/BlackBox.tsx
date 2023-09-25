import { Box } from 'theme-ui';

const BlackBox = ({
  children,
  opacity = '0.2',
  onClick = () => {},
  zIndex = 30,
}) => (
  <Box
    sx={{
      position: 'fixed',
      top: '0',
      height: '100%',
      width: '100%',
      left: '0',
      backgroundColor: `rgba(var(--theme-ui-colors-blackBoxColor), ${opacity})`,
      // background-color: rgba(var(--color), 0.8);
      zIndex: zIndex,
      display: 'flex',
    }}
    onClick={onClick}
  >
    {children}
  </Box>
);

export default BlackBox;
