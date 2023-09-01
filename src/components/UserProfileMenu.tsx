import BlackBox from './BlackBox';
import { Box, Flex, Close, Text, Link as ThemeLink } from 'theme-ui';
import Link from 'next/link';
import React from 'react';
import { CldImage } from 'next-cloudinary';

import AvatarButton from './AvatarButton';

const UserProfileMenu = ({ setProfileOpen, profileOpen, signOut, user }) => {
  const ref = React.useRef();

  React.useEffect(() => {
    console.log('profilleopen');
    const checkIfClickedOutside = (e) => {
      // console.log(e);
      if (ref.current && !ref.current.contains(e.target)) {
        setProfileOpen(false);
        console.log(e, profileOpen);
        // if (profileOpen === true) {
        //   // setProfileOpen(false);
        // }
      }
    };
    document.addEventListener('click', checkIfClickedOutside);
    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, [profileOpen]);

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
    <BlackBox>
      <Flex sx={{ marginLeft: 'auto' }}>
        <Box
          ref={ref}
          sx={{
            flexDirection: 'column',
            width: '400px',
            height: '100%',
            backgroundColor: 'white',
            animation: 'fadeIn .2s;',
            borderTopLeftRadius: '10px',
            borderBottomLeftRadius: '10px',
          }}
        >
          <Box sx={{ marginLeft: 'auto' }}>
            <Flex
              sx={{
                width: '100%',
                marginTop: '10px',
                padding: '10px',
                borderBottom: '1px solid #d6d6d6',
              }}
            >
              <Flex sx={{ gap: '10px', width: '100%' }}>
                <Box sx={{ height: '40px' }}>
                  {user.attributes.picture && (
                    <CldImage
                      width='400'
                      height='300'
                      src={user.attributes.picture}
                      style={{
                        // objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        borderRadius: '100%',
                      }}
                      preserveTransformations
                      underlay={user.attributes.picture}
                      quality={90}
                      sizes='100vw'
                      alt='Description of my image'
                    />
                  )}
                  {!user.attributes.picture && <AvatarButton />}
                </Box>
                <Box>
                  <Text as='div'>
                    {user.attributes.name}
                  </Text>
                  <Text as='div' sx={{ lineHeight: '12px', fontWeight: 700, marginTop: '5px' }}>
                    {user.attributes.preferred_username}
                  </Text>
                </Box>
              </Flex>
              <Close
                onClick={() => setProfileOpen(false)}
                sx={{ backgroundColor: '#eeeeee', marginLeft: 'auto' }}
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
                        backgroundColor: '#ececec',
                        borderRadius: '5px',
                      },
                      textDecoration: 'none',
                      color: 'black',
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
                        backgroundColor: '#ececec',
                        borderRadius: '5px',
                      },
                      textDecoration: 'none',
                      color: 'black',
                      padding: '5px',
                      width: '100%',
                    }}
                    href={`/posts`}
                  >
                    Your Posts
                  </ThemeLink>
                </Flex>
                <Flex as='li'>
                  <Text
                    as='span'
                    sx={{
                      '&:hover': {
                        backgroundColor: '#ececec',
                        borderRadius: '5px',
                      },
                      padding: '5px',
                      width: '100%',
                    }}
                  >
                    Settings
                  </Text>
                </Flex>
                <Flex as='li' sx={{ borderTop: '1px solid #ececec' }}>
                  <Text
                    as='span'
                    sx={{
                      '&:hover': {
                        backgroundColor: '#ececec',
                        borderRadius: '5px',
                      },
                      padding: '5px',
                      width: '100%',
                    }}
                  >
                    Docs
                  </Text>
                </Flex>
                <Flex as='li'>
                  <Text
                    as='span'
                    sx={{
                      '&:hover': {
                        backgroundColor: '#ececec',
                        borderRadius: '5px',
                      },
                      padding: '5px',
                      width: '100%',
                    }}
                  >
                    Support
                  </Text>
                </Flex>
                <Flex as='li' sx={{ borderTop: '1px solid #ececec' }}>
                  <Text
                    as='span'
                    sx={{
                      '&:hover': {
                        backgroundColor: '#ececec',
                        borderRadius: '5px',
                      },
                      padding: '5px',
                      width: '100%',
                      cursor: 'pointer',
                    }}
                    onClick={signOut}
                  >
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
