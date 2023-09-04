import { Box, Flex, Text, Close } from 'theme-ui';
import React from 'react';

import BlackBox from './BlackBox';

const StandardModal = ({ children, isOpen, title }) => {
  const ref = React.useRef<any>();

  React.useEffect(() => {
    const checkIfClickedOutside1 = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        isOpen(false);
      }
    };
    document.addEventListener('click', checkIfClickedOutside1);
    return () => {
      document.removeEventListener('click', checkIfClickedOutside1);
    };
  }, [isOpen]);

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
      <BlackBox opacity={'0.7'}>
        <Box
          sx={{
            maxWidth: '690px',
            maxHeight: '800px',
            height: ['100vh', 'auto', 'auto'],
            width: ['100vw', null, null],
            margin: 'auto',
            background: 'background',
            borderRadius: ['', '5px', '5px'],
            padding: '20px',
            position: 'relative',
          }}
          ref={ref}
        >
          <Flex
            sx={{
              borderBottomWidth: '1px',
              borderBottomColor: 'divider',
              borderBottomStyle: 'solid',
              paddingY: '5px',
              marginBottom: '20px',
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
              onClick={() => isOpen(false)}
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
