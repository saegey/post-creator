"use client"; // This is a client component 👈🏽

import { useState } from 'react';
import { MenuButton, Box, Flex, Close, NavLink, Button } from 'theme-ui';
import Link from 'next/link';
import BlackBox from './BlackBox';

const Header = ({ user, signOut }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {menuOpen && (
        <BlackBox>
          <Box sx={{ width: '400px', backgroundColor: 'white' }}>
            <Flex sx={{ padding: '20px' }}>
              <div>
                <h2>SÆGE</h2>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <Close onClick={() => setMenuOpen(false)} />
              </div>
            </Flex>
            <Flex as='nav' sx={{ flexDirection: 'column', padding: '20px' }}>
              <NavLink as={Link} href='/' p={2}>
                Home
              </NavLink>
            </Flex>
          </Box>
        </BlackBox>
      )}
      <header style={{ marginBottom: '20px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '20px',
            borderBottomWidth: '1px',
            borderBottomColor: 'black',
            borderBottomStyle: 'solid',
          }}
        >
          <MenuButton
            aria-label='Toggle Menu'
            onClick={() => {
              setMenuOpen(true);
            }}
          />
          <div style={{ marginLeft: 'auto' }}>
            <p>Logged in as {user.username}.</p>
            <Button onClick={signOut}>Sign out</Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
