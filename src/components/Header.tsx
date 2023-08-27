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
                <h2>monopad</h2>
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
      <header>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '10px',
            // borderBottomWidth: '2px',
            // borderBottomColor: 'black',
            // borderBottomStyle: 'solid',
            background: '#eaeaea',
          }}
        >
          <Flex>
            <MenuButton
              sx={{ marginY: 'auto' }}
              aria-label='Toggle Menu'
              onClick={() => {
                setMenuOpen(true);
              }}
            />
          </Flex>
          <div style={{ marginLeft: 'auto' }}>
            {/* <p>Logged in as {user.username}.</p> */}
            <Button onClick={signOut}>Sign out</Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
