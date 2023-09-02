import React from 'react';
import { Box, Flex, Close, NavLink, Text, Link as ThemeLink } from 'theme-ui';
import Link from 'next/link';

import BlackBox from './BlackBox';
import Logo from './Logo';

const UserMainMenu = ({ menuOpen, setMenuOpen, recentPosts }) => {
  const menuRef = React.useRef<any>();

  React.useEffect(() => {
    const checkIfClickedOutside1 = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', checkIfClickedOutside1);
    return () => {
      document.removeEventListener('click', checkIfClickedOutside1);
    };
  }, [menuOpen]);

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
    <BlackBox>
      <Flex
        sx={{
          flexDirection: 'column',
          width: '400px',
          height: '100%',
          backgroundColor: 'background',
          animation: 'fadeIn .2s;',
          borderTopRightRadius: '10px',
          borderBottomRightRadius: '10px',
        }}
        ref={menuRef}
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
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Close
              onClick={() => setMenuOpen(false)}
              sx={{ backgroundColor: 'background' }}
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
            <NavLink as={Link} href='/' variant='mainMenuItem'>
              Home
            </NavLink>
            <NavLink as={Link} href='/' variant='mainMenuItem'>
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
                  <Box as='li' key={`post-${i}`} variant='links.mainMenuItem'>
                    <ThemeLink
                      as={Link}
                      sx={{ color: 'text', textDecoration: 'none' }}
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
  );
};

export default UserMainMenu;
