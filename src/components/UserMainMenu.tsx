import React from 'react';
import { Box, Flex, Close, NavLink, Text, Link as ThemeLink } from 'theme-ui';
import Link from 'next/link';

import BlackBox from './layout/BlackBox';
import Logo from './Logo';

const UserMainMenu = ({ menuOpen, setMenuOpen, recentPosts }) => {
  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  if (!menuOpen) {
    return <></>;
  }

  return (
    <BlackBox
      onClick={() => {
        setMenuOpen(false);
      }}
      noModal={true}
    >
      <Flex
        sx={{
          flexDirection: 'column',
          width: '400px',
          height: '100%',
          backgroundColor: 'background',
          animation: 'fadeIn .2s;',
          borderTopRightRadius: '10px',
          borderBottomRightRadius: '10px',
          zIndex: 20,
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Flex
          sx={{
            paddingX: '20px',
            paddingTop: '20px',
            paddingBottom: '0px',
          }}
        >
          <Box>
            <Flex sx={{ gap: '10px' }}>
              <Box sx={{ width: '30px', height: 'auto' }}>
                <Logo />
              </Box>
              <Text
                as='div'
                sx={{ marginY: 'auto', fontSize: '22px', fontWeight: 700 }}
              >
                monopad
              </Text>
            </Flex>
          </Box>
          <Box sx={{ marginLeft: 'auto' }}>
            <Close
              onClick={() => setMenuOpen(false)}
              sx={{ backgroundColor: 'background' }}
            />
          </Box>
        </Flex>
        <Box
          sx={{
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: 'divider',
            margin: '5px',
            paddingY: '10px',
          }}
        >
          <Flex as='nav' sx={{ flexDirection: 'column', paddingX: '10px' }}>
            <NavLink as={Link} href='/' variant='mainMenuItem'>
              All Posts
            </NavLink>
            <NavLink as={Link} href='/posts' variant='mainMenuItem'>
              My Posts
            </NavLink>
          </Flex>
        </Box>
        <Box sx={{ margin: '15px' }}>
          <Text
            as='span'
            sx={{
              fontSize: '15px',
              fontWeight: 700,
              color: 'textMuted',
              marginLeft: '5px',
            }}
          >
            Recent Posts
          </Text>
          {recentPosts && (
            <Box as='ul' sx={{ listStyleType: 'none' }}>
              {recentPosts.map((post, i) => {
                return (
                  <ThemeLink
                    key={`link-${i}`}
                    as={Link}
                    sx={{
                      color: 'text',
                      textDecoration: 'none',
                      fontWeight: 400,
                    }}
                    href={`/posts/${post.id}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <Box as='li' variant='links.mainMenuItem'>
                      {post.title}
                    </Box>
                  </ThemeLink>
                );
              })}
            </Box>
          )}
        </Box>
        <Flex sx={{ flexGrow: 1, marginX: '20px' }}>
          <Box sx={{ marginTop: 'auto', marginBottom: '20px' }}>
            <Text as='span' sx={{ color: 'textMuted', fontSize: '14px' }}>
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
  );
};

export default UserMainMenu;
