import React from 'react';
import { MenuButton, Box, Flex } from 'theme-ui';
import { API } from 'aws-amplify';
import { CldImage } from 'next-cloudinary';
import { GraphQLResult } from '@aws-amplify/api';

import { listPostsCustom } from '../graphql/customQueries';
import AvatarIcon from './icons/AvatarIcon';
import { ListPostsByCreatedAtQuery, ListPublishedPostsQuery } from '../API';
import UserProfileMenu from './UserProfileMenu';
import UserMainMenu from './UserMainMenu';

const Header = ({ user, signOut, title = undefined }) => {
  // const [menuOpen, setMenuOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  // const [recentPosts, setRecentPosts] = React.useState<
  //   Array<{ id: string; title: string }>
  // >([]);

  // const listRecentPosts = async () => {
  //   const { data } = (await API.graphql({
  //     query: listPostsCustom,
  //     authMode: 'AMAZON_COGNITO_USER_POOLS',
  //   })) as { data: any };
  //   // as GraphQLResult<ListPublishedPostsQuery>;

  //   return data;
  // };

  // React.useEffect(() => {
  //   listRecentPosts().then((d) => {
  //     if (
  //       !d ||
  //       !d.listPublishedPostsByCreatedAt ||
  //       !d.listPublishedPostsByCreatedAt.items
  //     ) {
  //       console.error('failed to get listPosts');
  //     } else {
  //       setRecentPosts(d?.listPublishedPostsByCreatedAt?.items as any);
  //     }
  //   });
  // }, []);

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
          {/* <UserMainMenu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            recentPosts={recentPosts}
          /> */}
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
          <Flex sx={{ gap: '15px', flexGrow: 1 }}>
            {/* <MenuButton
              sx={{ marginY: 'auto', border: '1px solid buttonBorderColor' }}
              aria-label='Toggle Menu'
              onClick={() => setMenuOpen(true)}
            /> */}
          </Flex>
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
              // onClick={() => setMenuOpen(true)}
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
            {!user || (!user.attributes.picture && <AvatarIcon />)}
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Header;
