import { Box, Text, Flex, Button } from 'theme-ui';

const Dropdown = ({ isOpen, children }) => {
  return (
    <Box
      sx={{
        display: isOpen ? 'absolute' : 'none',
        position: 'absolute',
        // backgroundColor: '#f9f9f9',/
        backgroundColor: 'dropdownMenuBackground',
        minWidth: '190px',
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        // padding: '12px 16px',
        borderRadius: '5px',
        zIndex: 1,
        left: '-158px',
        top: '35px',
        // ref: ref,
      }}
      className={'dropdown-content'}
    >
      <Flex sx={{ gap: '15px', flexDirection: 'column', padding: '10px' }}>
        {children}
      </Flex>
    </Box>
  );
};

export default Dropdown;
