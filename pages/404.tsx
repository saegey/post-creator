import { Flex, Box, Text } from 'theme-ui';

export default function Custom404() {
  return (
    <Flex
      sx={{ flexGrow: '1', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box>
        <Flex sx={{ justifyContent: 'center' }}>
          <Text as='div' sx={{ fontSize: '60px', fontWeight: '700' }}>
            404
          </Text>
        </Flex>
        <Flex sx={{ justifyContent: 'center' }}>
          <Text as='div' sx={{ fontSize: '20px', fontWeight: '500' }}>
            Page Not Found
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}
