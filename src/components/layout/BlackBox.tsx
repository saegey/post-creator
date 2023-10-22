import { Box } from 'theme-ui';
import React from 'react';

const BlackBox = ({
  children,
  opacity = '.7',
  onClick = () => {},
  zIndex = 30,
  fullScreen = false,
  noModal = false,
  noBackground = false,
}: {
  children: JSX.Element;
  opacity?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  zIndex?: number;
  fullScreen?: boolean;
  noModal?: boolean;
  noBackground?: boolean;
}) => (
  <Box
    sx={{
      position: 'fixed',
      top: '0',
      height: '100%',
      width: '100%',
      left: '0',
      backgroundColor: noBackground
        ? 'unset'
        : fullScreen
        ? 'background'
        : `rgba(var(--theme-ui-colors-blackBoxColor), ${opacity})`,
      zIndex: zIndex,
      display: 'flex',
      justifyContent: !noModal || fullScreen ? 'center' : '',
      alignItems: !noModal || fullScreen ? 'center' : '',
    }}
    onClick={onClick}
  >
    {children}
  </Box>
);

export default BlackBox;
