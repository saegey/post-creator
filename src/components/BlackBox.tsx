import { Box } from 'theme-ui';

const BlackBox = ({
  children,
  opacity = '.7',
  onClick = () => {},
  zIndex = 30,
  fullScreen = false,
  noModal = false,
}) => (
  <Box
    sx={{
      position: 'fixed',
      top: '0',
      height: '100%',
      width: '100%',
      left: '0',
      backgroundColor: fullScreen
        ? 'background'
        : `rgba(var(--theme-ui-colors-blackBoxColor), ${opacity})`,
      // background-color: rgba(var(--color), 0.8);
      zIndex: zIndex,
      display: 'flex',
      justifyContent: !noModal || fullScreen ? 'center' : '',
      // verticalAlign: fullScreen ? 'middle' : '',
      alignItems: !noModal || fullScreen ? 'center' : '',
    }}
    onClick={onClick}
  >
    {children}
  </Box>
);

export default BlackBox;
