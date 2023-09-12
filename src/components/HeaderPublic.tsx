import React from 'react';
import {
  MenuButton,
  Box,
  Flex,
  Text,
  Link as ThemeLink,
  Switch,
  useColorMode,
  Close,
} from 'theme-ui';
import Link from 'next/link';

import Logo from './Logo';
import BlackBox from './BlackBox';
import { useUnits } from './UnitProvider';

const HeaderPublic = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const ref = React.useRef<any>();
  const [mode, setMode] = useColorMode();
  const { toggleUnit, unitOfMeasure } = useUnits();

  return (
    <>
      {menuOpen && (
        <BlackBox>
          <Flex sx={{ marginRight: 'auto' }}>
            <Box
              ref={ref}
              sx={{
                flexDirection: 'column',
                width: '400px',
                height: '100%',
                backgroundColor: 'background',
                animation: 'fadeIn .2s;',
                borderTopRightRadius: '10px',
                borderBottomRightRadius: '10px',
              }}
            >
              <Box sx={{ marginLeft: 'auto' }}>
                <Flex
                  sx={{
                    width: '100%',
                    marginTop: '10px',
                    padding: '10px',
                    borderBottomStyle: 'solid',
                    borderBottomWidth: '1px',
                    borderBottomColor: 'divider',
                  }}
                >
                  <Close
                    onClick={() => setMenuOpen(false)}
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
                      <Flex sx={{ width: '100%', padding: '5px' }}>
                        <Text as='span'>Dark Mode</Text>
                        <Box sx={{ marginLeft: 'auto' }}>
                          <Switch
                            checked={mode === 'dark' ? true : false}
                            onClick={(e) => {
                              const next = mode === 'dark' ? 'light' : 'dark';
                              setMode(next);
                              // console.log(next);
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
                            checked={
                              unitOfMeasure !== 'imperial' ? true : false
                            }
                            onClick={() => {
                              toggleUnit();
                            }}
                          />
                        </Box>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Flex>
        </BlackBox>
      )}
      <Box as='header' sx={{ width: '100vw' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            padding: '10px',
            borderBottomWidth: '1px',
            borderBottomColor: 'divider',
            borderBottomStyle: 'solid',
            backgroundColor: 'background',
            zIndex: 99,
          }}
        >
          <Flex sx={{ gap: '15px' }}>
            <MenuButton
              sx={{ marginY: 'auto', border: '1px solid buttonBorderColor' }}
              aria-label='Toggle Menu'
              onClick={() => {
                setTimeout(() => {
                  setMenuOpen(true);
                  console.log('setmenu open');
                }, 10);
                // setMenuOpen(true);
              }}
            />
            <Flex sx={{ height: '100%' }}>
              <Box sx={{ height: '32px', width: '32px', marginY: 'auto' }}>
                <Logo />
              </Box>
            </Flex>
          </Flex>
          {/* <div style={{ marginLeft: 'auto' }}>
            {user && user.attributes.picture && (
              <Box sx={{ height: '40px', width: '40px', cursor: 'pointer' }}>
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
                  // preserveTransformations
                  underlay={user.attributes.picture}
                  quality={90}
                  sizes='100vw'
                  alt='Description of my image'
                  onClick={() =>
                    setTimeout(() => {
                      setProfileOpen(true);
                    }, 10)
                  }
                />
              </Box>
            )}
            {!user || !user.attributes.picture && (
              <AvatarButton
                onClick={() =>
                  setTimeout(() => {
                    setProfileOpen(true);
                  }, 10)
                }
              />
            )}
          </div> */}
        </Box>
      </Box>
    </>
  );
};

export default HeaderPublic;
