import React from 'react';
import { MenuButton, Box, Flex } from 'theme-ui';
import { CldImage } from 'next-cloudinary';

import AvatarIcon from './icons/AvatarIcon';
import UserProfileMenu from './UserProfileMenu';

const Header = ({ user, signOut, title = undefined }) => {
  const [profileOpen, setProfileOpen] = React.useState(false);

  return (
    <>
      {user && (
        <Box>
          <UserProfileMenu
            setProfileOpen={setProfileOpen}
            profileOpen={profileOpen}
            signOut={signOut}
            user={user}
          />
        </Box>
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
          <Flex sx={{ gap: '15px', flexGrow: 1 }}></Flex>
          <Flex
            sx={{
              justifyContent: 'end',
              backgroundColor: ['none', 'divider', 'divider'],
              borderRadius: '100px',
              padding: '2px 10px 2px 10px',
            }}
            onClick={() => setProfileOpen(true)}
          >
            <MenuButton
              sx={{ marginY: 'auto', border: '1px solid buttonBorderColor' }}
              aria-label='Toggle Menu'
            />
            {user && user.attributes.picture && (
              <Box
                sx={{
                  height: '38px',
                  width: '38px',
                  cursor: 'pointer',
                  display: ['none', 'inherit', 'inherit'],
                }}
              >
                <CldImage
                  width='400'
                  height='300'
                  src={user.attributes.picture}
                  style={{
                    width: '100%',
                    height: '100%',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    borderRadius: '100%',
                  }}
                  quality={90}
                  sizes='100vw'
                  alt='Description of my image'
                  onClick={() => setProfileOpen(true)}
                />
              </Box>
            )}
            {!user || (!user.attributes.picture && <AvatarIcon />)}
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Header;
