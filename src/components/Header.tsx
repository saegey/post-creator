import React from 'react';
import { MenuButton, Box, Flex } from 'theme-ui';
import { API } from 'aws-amplify';
import { CldImage } from 'next-cloudinary';
import { GraphQLResult } from '@aws-amplify/api';

import { listPostsCustom } from '../graphql/customQueries';
import AvatarButton from './AvatarButton';
import { ListPostsByCreatedAtQuery } from '../API';
import UserProfileMenu from './UserProfileMenu';
import UserMainMenu from './UserMainMenu';

const Header = ({ user, signOut, title }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [recentPosts, setRecentPosts] = React.useState<
    Array<{ id: string; title: string }>
  >([]);

  const listRecentPosts = async () => {
    const { data } = (await API.graphql({
      query: listPostsCustom,
      authMode: 'API_KEY',
    })) as GraphQLResult<ListPostsByCreatedAtQuery>;

    return data;
  };

  React.useEffect(() => {
    listRecentPosts().then((d) => {
      if (!d || !d.listPostsByCreatedAt || !d.listPostsByCreatedAt.items) {
        console.error('failed to get listPosts');
      } else {
        setRecentPosts(d?.listPostsByCreatedAt?.items as any);
      }
    });
  }, []);

  return (
    <>
      {user && (
        <>
          <UserProfileMenu
            setProfileOpen={setProfileOpen}
            profileOpen={profileOpen}
            signOut={signOut}
            user={user}
          />
          <UserMainMenu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            recentPosts={recentPosts}
          />
        </>
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
              onClick={() => setMenuOpen(true)}
            />
            {/* <Flex sx={{ height: '100%' }}>
              <Box sx={{ height: '32px', width: '32px', marginY: 'auto' }}>
                <Logo />
              </Box>
            </Flex> */}
            {title && (
              <Flex as='div' sx={{ fontSize: '16px', fontWeight: 500 }}>
                <Box as='span' sx={{ marginY: 'auto' }}>
                  {title}
                </Box>
              </Flex>
            )}
          </Flex>
          <div style={{ marginLeft: 'auto' }}>
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
                  onClick={() => setProfileOpen(true)}
                />
              </Box>
            )}
            {!user ||
              (!user.attributes.picture && (
                <AvatarButton onClick={() => setProfileOpen(true)} />
              ))}
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Header;
