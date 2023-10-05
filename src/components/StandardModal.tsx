import { Box, Flex, Text, Close } from 'theme-ui';
import React from 'react';

import BlackBox from './BlackBox';

const StandardModal = ({ children, isOpen, setIsOpen, title }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <BlackBox opacity={'0.7'} onClick={() => setIsOpen(false)} zIndex={50}>
        <Box
          sx={{
            maxWidth: '690px',
            maxHeight: '800px',
            height: ['auto', 'auto', 'auto'],
            width: ['100vw', null, null],
            margin: 'auto',
            background: 'background',
            borderRadius: [null, '5px', '5px'],
            padding: '20px',
            position: 'relative',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Flex
            sx={{
              borderBottomWidth: '1px',
              borderBottomColor: 'divider',
              borderBottomStyle: 'solid',
              paddingY: '5px',
              // marginBottom: '20px',
            }}
          >
            <Text
              as='div'
              sx={{
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              {title}
            </Text>
            <Close
              onClick={() => {
                setIsOpen(false);
              }}
              sx={{
                alignItems: 'center',
                height: '100%',
                marginLeft: 'auto',
              }}
            />
          </Flex>
          {children}
        </Box>
      </BlackBox>
    </>
  );
};

export default StandardModal;
