import { Box, Flex } from 'theme-ui';

const SkeletonPost = () => {
  return (
    <>
      <Flex
        sx={{
          marginBottom: '20px',
          gap: '10px',
          position: 'sticky',
          top: '0px',
          backgroundColor: 'background',
          paddingY: '10px',
          paddingX: '10px',
          zIndex: 1000,
          borderBottomStyle: 'solid',
          borderBottomWidth: '1px',
          borderBottomColor: 'buttonBorderColor',
        }}
      >
        {Array.from(Array(9).keys()).map((_b, i) => (
          <Box
            variant='boxes.skeletonButton'
            className='skeleton'
            key={`skel-button-${i}`}
          />
        ))}
      </Flex>
      <Box
        sx={{
          marginTop: '20px',
          minWidth: [null, null, '900px'],
          marginLeft: [0, 0, 'auto'],
          marginRight: [0, 0, 'auto'],
          marginBottom: '50px',
          width: ['100%', null, null],
          backgroundColor: 'background',
          borderRadius: '10px',
          padding: '10px',
        }}
      >
        <Flex sx={{ flexDirection: 'column', gap: '20px' }}>
          <Box
            sx={{
              width: '100%',
              // maxWidth: '690px',
              height: '450px',
              backgroundSize: '400px',
              borderRadius: '5px',
            }}
            className='skeleton'
          />
          <Flex>
            <Box sx={{ marginX: 'auto', maxWidth: '690px', width: '690px' }}>
              <Flex sx={{ gap: '20px', flexDirection: 'column' }}>
                <Box
                  sx={{
                    width: '100%',
                    // maxWidth: '690px',
                    height: '20px',
                    backgroundSize: '600px',
                    borderRadius: '5px',
                  }}
                  className='skeleton'
                />
                <Box
                  sx={{
                    width: '100%',
                    // maxWidth: '690px',
                    height: '20px',
                    backgroundSize: '600px',
                    borderRadius: '5px',
                  }}
                  className='skeleton'
                />
                <Box
                  sx={{
                    width: '100%',
                    // maxWidth: '690px',
                    height: '20px',
                    backgroundSize: '600px',
                    borderRadius: '5px',
                  }}
                  className='skeleton'
                />
                <Box
                  sx={{
                    width: '100%',
                    // maxWidth: '690px',
                    height: '20px',
                    backgroundSize: '600px',
                    borderRadius: '5px',
                  }}
                  className='skeleton'
                />
              </Flex>
            </Box>
          </Flex>
          <Flex>
            <Box
              sx={{
                width: '100%',
                maxWidth: '690px',
                marginX: 'auto',
                height: '450px',
                backgroundSize: '400px',
                borderRadius: '5px',
              }}
              className='skeleton'
            />
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default SkeletonPost;
