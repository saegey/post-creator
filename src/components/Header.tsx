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
import { CldImage } from 'next-cloudinary';

import BlackBox from './BlackBox';
import { listPostsCustom } from '../graphql/customQueries';
import AvatarButton from './AvatarButton';
import { GraphQLResult } from '@aws-amplify/api';
import { ListPostsQuery } from '../API';
import Logo from './Logo';
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

  // React.useEffect(() => {
  //   document.body.style.overflow = 'hidden';
  //   return () => {
  //     document.body.style.overflow = 'auto';
  //   };
  // }, []);

  return (
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
          <Flex sx={{ gap: '10px' }}>
            <MenuButton
              sx={{ marginY: 'auto', border: '1px solid #d4d4d4' }}
              aria-label='Toggle Menu'
              onClick={() => {
                setTimeout(() => {
                  setMenuOpen(true);
                  console.log('setmenu open');
                }, 10);
                // setMenuOpen(true);
              }}
            />
            {title && (
              <Flex as='div' sx={{ fontSize: '17px', fontWeight: 600 }}>
                <Box as='span' sx={{ marginY: 'auto' }}>
                  {title}
                </Box>
              </Flex>
            )}
          </Flex>
          <div style={{ marginLeft: 'auto' }}>
            {user.attributes.picture && (
              <Box sx={{ height: '40px', cursor: 'pointer' }}>
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
            {!user.attributes.picture && (
              <AvatarButton onClick={() => setProfileOpen(true)} />
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
