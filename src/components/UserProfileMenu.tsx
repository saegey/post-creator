import BlackBox from './BlackBox';
import {
  Box,
  Flex,
  Close,
  Text,
  Link as ThemeLink,
  useColorMode,
  Switch,
} from 'theme-ui';
import Link from 'next/link';
import React from 'react';
import { CldImage } from 'next-cloudinary';

import AvatarButton from './AvatarButton';
import { useUnits } from './UnitProvider';

const UserProfileMenu = ({ setProfileOpen, profileOpen, signOut, user }) => {
  const ref = React.useRef<any>();
  const [mode, setMode] = useColorMode();
  const { toggleUnit, unitOfMeasure } = useUnits();

  React.useEffect(() => {
    if (profileOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [profileOpen]);

  if (!profileOpen) {
    return <></>;
  }

  return (
    <BlackBox
      onClick={() => {
        setProfileOpen(false);
      }}
    >
      <Flex
        sx={{ marginLeft: 'auto' }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Box
          ref={ref}
          sx={{
            flexDirection: 'column',
            width: '400px',
            height: '100%',
            backgroundColor: 'background',
            animation: 'fadeIn .2s;',
            borderTopLeftRadius: '10px',
            borderBottomLeftRadius: '10px',
          }}
        >
          <Box sx={{ marginLeft: 'auto' }}>
            <Flex
              sx={{
                width: '100%',
                margin: '10px',
                padding: '10px',
                borderBottomStyle: 'solid',
                borderBottomWidth: '1px',
                borderBottomColor: 'divider',
              }}
            >
              <Flex sx={{ gap: '10px', width: '100%' }}>
                <Flex
                  sx={{
                    height: '100%',
                    // width: '40px',
                    flexDirection: 'column',
                  }}
                >
                  {user.attributes.picture && (
                    <Box sx={{ width: '40px', height: '40px' }}>
                      <CldImage
                        width='400'
                        height='300'
                        src={user.attributes.picture}
                        style={{
                          // objectFit: 'cover',
                          width: '100%',
                          height: 'auto',
                          marginTop: 'auto',
                          marginBottom: 'auto',
                          borderRadius: '100%',
                        }}
                        // preserveTransformations
                        // underlay={user.attributes.picture}
                        quality={90}
                        // sizes='100vw'
                        sizes='(max-width: 480px) 100vw, 50vw'
                        alt='Description of my image'
                      />
                    </Box>
                  )}
                  {!user.attributes.picture && <AvatarButton />}
                </Flex>
                <Box>
                  <Text as='div' sx={{ color: 'text' }}>
                    {user.attributes.name}
                  </Text>
                  <Text
                    as='div'
                    sx={{
                      lineHeight: '12px',
                      fontWeight: 700,
                      // marginTop: '5px',
                      color: 'text',
                    }}
                  >
                    {user.attributes.preferred_username}
                  </Text>
                </Box>
              </Flex>
              <Close
                onClick={() => setProfileOpen(false)}
                sx={{ backgroundColor: 'background', marginLeft: 'auto' }}
              />
            </Flex>
            <Box sx={{ padding: '10px' }}>
              <Box
                as='ul'
                sx={{
                  listStyleType: 'none',
                  li: {
                    padding: '5px',
                    margin: '5px',
                    fontWeight: 500,
                    fontSize: '16px',
                  },
                }}
              >
                <Flex as='li'>
                  <ThemeLink
                    as={Link}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'menuItemBackgroundHoverColor',
                        borderRadius: '5px',
                      },
                      textDecoration: 'none',
                      color: 'text',
                      padding: '5px',
                      width: '100%',
                    }}
                    href={`/profile`}
                    // onClick={() => setMenuOpen(false)}
                  >
                    Your Profile
                  </ThemeLink>
                </Flex>
                <Flex as='li'>
                  <ThemeLink
                    as={Link}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'menuItemBackgroundHoverColor',
                        borderRadius: '5px',
                      },
                      textDecoration: 'none',
                      color: 'text',
                      padding: '5px',
                      width: '100%',
                    }}
                    href={`/posts`}
                  >
                    Your Posts
                  </ThemeLink>
                </Flex>
                <Flex
                  as='li'
                  sx={{
                    borderTopColor: 'divider',
                    borderTopStyle: 'solid',
                    borderTopWidth: '1px',
                  }}
                >
                  <Flex sx={{ width: '100%', padding: '5px' }}>
                    <Text as='span'>Dark Mode</Text>
                    <Box sx={{ marginLeft: 'auto' }}>
                      <Switch
                        checked={mode === 'dark' ? true : false}
                        onClick={(e) => {
                          const next = mode === 'dark' ? 'light' : 'dark';
                          setMode(next);
                        }}
                      />
                    </Box>
                  </Flex>
                </Flex>
                <Flex as='li'>
                  <Flex sx={{ width: '100%', padding: '5px' }}>
                    <Text as='span'>
                      Units{' '}
                      <Text as='span' sx={{ color: '#aeaeae' }}>
                        imperial/metric
                      </Text>
                    </Text>
                    <Box sx={{ marginLeft: 'auto' }}>
                      <Switch
                        checked={unitOfMeasure !== 'imperial' ? true : false}
                        onClick={(e) => {
                          toggleUnit();
                        }}
                      />
                    </Box>
                  </Flex>
                </Flex>
                <Flex
                  as='li'
                  sx={{
                    borderTopColor: 'divider',
                    borderTopStyle: 'solid',
                    borderTopWidth: '1px',
                  }}
                >
                  <Text variant={'menuItem'}>Docs</Text>
                </Flex>
                <Flex as='li'>
                  <Text as='span' variant={'menuItem'}>
                    Support
                  </Text>
                </Flex>
                <Flex
                  as='li'
                  sx={{
                    borderTopColor: 'divider',
                    borderTopStyle: 'solid',
                    borderTopWidth: '1px',
                  }}
                >
                  <Text as='span' variant={'menuItem'} onClick={signOut}>
                    Sign out
                  </Text>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </BlackBox>
  );
};

export default UserProfileMenu;
