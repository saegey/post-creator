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
        <Box variant='boxes.skeletonButton' />
        <Box variant='boxes.skeletonButton' />
        <Box variant='boxes.skeletonButton' />
      </Flex>
      <Box
        sx={{
          marginTop: '0px',
          maxWidth: '900px',
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: 'background',
          borderRadius: '10px',
          border: '1px dotted #bcbcbc',
          padding: '10px',
        }}
      >
        <Flex sx={{ flexDirection: 'column', gap: '20px' }}>
          <Box
            sx={{
              width: ['100%', '500px', '500px'],
              height: '40px',
              backgroundImage:
                'linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px)',
              backgroundSize: '600px',
              animation: 'shine-avatar 1.6s infinite linear',
              borderRadius: '100px',
            }}
          />
          <Box
            sx={{
              width: '300px',
              height: '30px',
              backgroundImage:
                'linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px)',
              backgroundSize: '600px',
              animation: 'shine-avatar 1.6s infinite linear',
              borderRadius: '100px',
            }}
          />
          <Box sx={{ width: '80%', marginX: 'auto' }}>
            <Flex sx={{ gap: '20px', flexDirection: 'column' }}>
              <Box
                sx={{
                  width: '100%',
                  height: '20px',
                  backgroundImage:
                    'linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px)',
                  backgroundSize: '600px',
                  animation: 'shine-avatar 1.6s infinite linear',
                  borderRadius: '40px',
                }}
              />
              <Box
                sx={{
                  width: '80%',
                  height: '20px',
                  backgroundImage:
                    'linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px)',
                  backgroundSize: '600px',
                  animation: 'shine-avatar 1.6s infinite linear',
                  borderRadius: '40px',
                }}
              />
              <Box
                sx={{
                  width: '90%',
                  height: '20px',
                  backgroundImage:
                    'linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px)',
                  backgroundSize: '600px',
                  animation: 'shine-avatar 1.6s infinite linear',
                  borderRadius: '40px',
                }}
              />
              <Box
                sx={{
                  width: '60%',
                  height: '20px',
                  backgroundImage:
                    'linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px)',
                  backgroundSize: '600px',
                  animation: 'shine-avatar 1.6s infinite linear',
                  borderRadius: '40px',
                }}
              />
            </Flex>
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '450px',
              backgroundImage:
                'linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px)',
              backgroundSize: '600px',
              animation: 'shine-avatar 1.6s infinite linear',
              borderRadius: '5px',
            }}
          />
          <Box sx={{ width: '80%', marginX: 'auto' }}>
            <Flex sx={{ gap: '20px', flexDirection: 'column' }}>
              <Box
                sx={{
                  width: '100%',
                  height: '20px',
                  backgroundImage:
                    'linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px)',
                  backgroundSize: '600px',
                  animation: 'shine-avatar 1.6s infinite linear',
                  borderRadius: '40px',
                }}
              />
              <Box
                sx={{
                  width: '80%',
                  height: '20px',
                  backgroundImage:
                    'linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px)',
                  backgroundSize: '600px',
                  animation: 'shine-avatar 1.6s infinite linear',
                  borderRadius: '40px',
                }}
              />
              <Box
                sx={{
                  width: '90%',
                  height: '20px',
                  backgroundImage:
                    'linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px)',
                  backgroundSize: '600px',
                  animation: 'shine-avatar 1.6s infinite linear',
                  borderRadius: '40px',
                }}
              />
              <Box
                sx={{
                  width: '60%',
                  height: '20px',
                  backgroundImage:
                    'linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px)',
                  backgroundSize: '600px',
                  animation: 'shine-avatar 1.6s infinite linear',
                  borderRadius: '40px',
                }}
              />
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default SkeletonPost;
