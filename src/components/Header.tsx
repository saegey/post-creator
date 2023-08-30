import React from 'react';
import {
  MenuButton,
  Box,
  Flex,
  Close,
  NavLink,
  Button,
  Text,
  Link as ThemeLink,
} from 'theme-ui';
import Link from 'next/link';
import { API } from 'aws-amplify';

import BlackBox from './BlackBox';
import { listPosts } from '../graphql/customQueries';
import AvatarButton from './AvatarButton';
import { GraphQLResult } from '@aws-amplify/api';
import { ListPostsQuery } from '../API';

const Header = ({ user, signOut }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [recentPosts, setRecentPosts] = React.useState<
    Array<{ id: string; title: string }>
  >([]);

  const listRecentPosts = async () => {
    const { data } = (await API.graphql({
      query: listPosts,
      authMode: 'API_KEY',
    })) as GraphQLResult<ListPostsQuery>;

    return data;
  };

  React.useEffect(() => {
    listRecentPosts().then((d) => {
      if (!d || !d.listPosts || !d.listPosts.items) {
        console.error('failed to get listPosts');
      } else {
        setRecentPosts(d?.listPosts?.items as any);
      }
    });
  }, []);

  return (
    <>
      {profileOpen && (
        <BlackBox>
          <Flex sx={{ marginLeft: 'auto' }}>
            <Box
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
                <Flex sx={{ width: '100%', padding: '10px' }}>
                  <span>saegey</span>
                  <Close
                    onClick={() => setProfileOpen(false)}
                    sx={{ backgroundColor: '#eeeeee', marginLeft: 'auto' }}
                  />
                </Flex>
                <Box sx={{ padding: '10px' }}>
                  <p>Logged in as {user.username}.</p>
                  <Button onClick={signOut}>Sign out</Button>
                </Box>
              </Box>
            </Box>
          </Flex>
        </BlackBox>
      )}
      {menuOpen && (
        <BlackBox>
          <Flex
            sx={{
              flexDirection: 'column',
              width: '400px',
              height: '100%',
              backgroundColor: 'white',
              animation: 'fadeIn .2s;',
              borderTopRightRadius: '10px',
              borderBottomRightRadius: '10px',
            }}
          >
            <Flex
              sx={{
                paddingX: '20px',
                paddingTop: '20px',
                paddingBottom: '0px',
              }}
            >
              <div>
                <Flex sx={{ gap: '10px' }}>
                  <Box sx={{ width: '40px', height: 'auto' }}>
                    <svg
                      width='100%'
                      height='100%'
                      viewBox='0 0 204 204'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle
                        cx='102'
                        cy='102'
                        r='96'
                        stroke='black'
                        strokeWidth='12'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M101.5 178C143.198 178 177 144.197 177 102.5C177 60.8025 143.198 27 101.5 27C59.8025 27 26 60.8025 26 102.5C26 144.197 59.8025 178 101.5 178ZM89 74H74V128H89V74ZM115 74H130V128H115V74ZM112.392 74.25L102 93L91.6077 74.25H112.392Z'
                        fill='black'
                      />
                    </svg>
                  </Box>
                  <Text as='h2' sx={{ marginY: 'auto' }}>
                    monopad
                  </Text>
                </Flex>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <Close
                  onClick={() => setMenuOpen(false)}
                  sx={{ backgroundColor: '#eeeeee' }}
                />
              </div>
            </Flex>
            <Box
              sx={{
                borderBottom: '1px solid #e3e3e3',
                margin: '5px',
                paddingY: '10px',
              }}
            >
              <Flex as='nav' sx={{ flexDirection: 'column', paddingX: '10px' }}>
                <NavLink
                  as={Link}
                  href='/'
                  p={0}
                  sx={{
                    fontWeight: 600,
                    padding: '5px',
                    '&:hover': {
                      backgroundColor: '#ececec',
                      borderRadius: '5px',
                    },
                  }}
                >
                  Home
                </NavLink>
                <NavLink
                  as={Link}
                  href='/'
                  p={0}
                  sx={{
                    fontWeight: 600,
                    padding: '5px',
                    '&:hover': {
                      backgroundColor: '#ececec',
                      borderRadius: '5px',
                    },
                  }}
                >
                  Posts
                </NavLink>
              </Flex>
            </Box>
            <Box sx={{ margin: '15px' }}>
              <Text
                as='span'
                sx={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#5a5a5a',
                  marginLeft: '5px',
                }}
              >
                Recent Posts
              </Text>
              {recentPosts && (
                <Box as='ul' sx={{ listStyleType: 'none' }}>
                  {recentPosts.map((post, i) => {
                    return (
                      <Box
                        as='li'
                        key={`post-${i}`}
                        sx={{
                          padding: '5px',
                          '&:hover': {
                            backgroundColor: '#ececec',
                            borderRadius: '5px',
                          },
                        }}
                      >
                        <ThemeLink
                          as={Link}
                          sx={{ color: 'black', textDecoration: 'none' }}
                          href={`/posts/${post.id}`}
                          onClick={() => setMenuOpen(false)}
                        >
                          {post.title}
                        </ThemeLink>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
            <Flex sx={{ flexGrow: 1, marginX: '20px' }}>
              <Box sx={{ marginTop: 'auto', marginBottom: '20px' }}>
                <Text as='span' sx={{ color: 'gray', fontSize: '14px' }}>
                  © 2023 Monopad, LLC.
                </Text>
                <Flex sx={{ gap: '10px', fontSize: '14px' }}>
                  <span>About</span>
                  <span>Blog</span>
                  <span>Terms</span>
                  <span>Status</span>
                  <span>Privacy</span>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </BlackBox>
      )}
      <header>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '10px',
            borderBottomWidth: '2px',
            borderBottomColor: '#f0f0f0',
            borderBottomStyle: 'solid',
            background: 'white',
          }}
        >
          <Flex>
            <MenuButton
              sx={{ marginY: 'auto', border: '1px solid #d4d4d4' }}
              aria-label='Toggle Menu'
              onClick={() => {
                setMenuOpen(true);
              }}
            />
          </Flex>
          <div style={{ marginLeft: 'auto' }}>
            <AvatarButton onClick={() => setProfileOpen(true)} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
