import { Flex, Text, Box, Close, Button } from 'theme-ui';
import React from 'react';

const SidebarLeft = ({ closeOnclick, children, title }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'sideMenuBackground',
        minWidth: '300px',
        borderRightColor: 'sideMenuRightBorder',
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        position: ['absolute', 'sticky', 'sticky'],
        display: ['absolute', null, null],
        top: [0, '55px', '55px'],
        marginTop: [0, 0, 0],
        width: ['100%', '300px', '300px'],
        height: ['100vh', 'calc(100vh - 55px)', 'calc(100vh - 55px)'],
        zIndex: 20,
      }}
    >
      <Box sx={{ height: '100vh' }}>
        <Flex
          sx={{
            padding: '15px',
            borderBottomColor: 'divider',
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
          }}
        >
          <Text
            as='span'
            sx={{
              lineHeight: '30px',
              fontSize: '16px',
              fontWeight: '600',
              marginLeft: '10px',
            }}
          >
            {title}
          </Text>
          <Close onClick={closeOnclick} sx={{ marginLeft: 'auto' }} />
        </Flex>
        {children}
      </Box>
    </Box>
  );
};

export default SidebarLeft;
