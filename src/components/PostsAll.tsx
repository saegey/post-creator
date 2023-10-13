import { withAuthenticator } from '@aws-amplify/ui-react';
import { Grid, Box, Button, Flex, Text, NavLink } from 'theme-ui';
import { API, Auth } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

import PostCard from './PostCard';
import Header from '../../src/components/Header';
import { PostType } from '../../pages/posts';
import { CreatePostMutation } from '../API';
import { createPost } from '../graphql/mutations';
import CreatePostModal from './CreatePostModal';
import {
  listMyPostsCustom,
  listPostsCustom,
} from '../../src/graphql/customQueries';

const PostsAll = ({
  signOut,
  user,
  // posts,
  view = 'all',
}: // getData,
{
  signOut?: any;
  user?: any;
  // posts: PostType | undefined;
  view: string;
  // getData: (string) => {};
}) => {
  const router = useRouter();

  const [status, setStatus] = React.useState<string | undefined>();
  const [posts, setPosts] = React.useState<PostType>();

  const searchParams = useSearchParams();

  const search = searchParams.get('status');
  if (search && !status) {
    setStatus(search);
  } else if (!search && !status) {
    setStatus('draft');
  }
  // console.log(search, status);
  // const [newPost, setNewPost] = React.useState(false);

  const getDraftPosts = async (type = 'draft') => {
    const response: any = await API.graphql({
      query: listMyPostsCustom,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: {
        filter: {
          // postAuthorId: {
          //   eq: user.attributes.sub,
          // },
          privacyStatus: {
            eq: type,
          },
        },
      },
    });

    setPosts(
      response.data.listPostsByCreatedAt.items.map((d) => {
        return { ...d, imagesObj: JSON.parse(d.images) };
      })
    );
  };

  const getPublishedPost = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const response: any = await API.graphql({
      query: listPostsCustom,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      // variables: {
      //   filter: {
      //     author: {
      //       eq: user.attributes.sub,
      //     },
      //     // privacyStatus: {
      //     //   eq: 'type',
      //     // },
      //   },
      // },
    });

    setPosts(
      response.data.listPublishedPostsByCreatedAt.items.map((d) => {
        return { ...d, imagesObj: JSON.parse(d.images) };
      })
    );
  };

  React.useEffect(() => {
    if (status === 'draft') {
      getDraftPosts();
    }
    if (status === 'published') {
      getPublishedPost();
    }
  }, [status]);

  const createNewPost = async () => {
    const response = (await API.graphql({
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      query: createPost,
      variables: {
        input: {
          title: '',
          type: 'Post',
          components: JSON.stringify([
            { type: 'text', children: [{ text: '' }] },
          ]),
          postAuthorId: user.attributes.sub,
        },
      },
    })) as GraphQLResult<CreatePostMutation>;
    if (!response || !response.data || !response.data.createPost) {
      console.error('failed to create post');
    }
    window.location.href = `/posts/${response?.data?.createPost?.id}/edit`;
    // setNewPost(true);
  };

  return (
    <Box as='main' sx={{ backgroundColor: 'background', height: '100vw' }}>
      <Header user={user} signOut={signOut} title={'My Posts'} />
      <Box
        sx={{
          // marginTop: '60px',
          maxWidth: '900px',
          marginLeft: ['0px', 'auto', 'auto'],
          marginRight: ['0px', 'auto', 'auto'],
          padding: '20px',
          width: '100vw',
        }}
      >
        {/* {posts && posts.length > 0 && ( */}
        <Box sx={{ paddingBottom: '20px' }}>
          <Button onClick={() => createNewPost()} variant='primaryButton'>
            New Post
          </Button>
        </Box>
        {/* )} */}

        <Flex as='nav' sx={{ marginBottom: '10px' }}>
          <NavLink
            href='#!'
            // p={2}
            sx={{
              paddingY: '8px',
              paddingRight: '8px',
              borderBottom:
                status === 'draft' ? '1px solid black' : '1px solid #e8e8e8',
              fontWeight: '500',
            }}
            onClick={(e) => {
              e.preventDefault();
              setPosts(undefined);
              setStatus('draft');
              getDraftPosts();

              // getData;
              router.push('/posts?status=draft');
            }}
          >
            Drafts
          </NavLink>
          <NavLink
            href='#!'
            p={2}
            sx={{
              borderBottom:
                status === 'published'
                  ? '1px solid black'
                  : '1px solid #e8e8e8',
              fontWeight: '500',
            }}
            onClick={(e) => {
              e.preventDefault();
              setPosts(undefined);
              setStatus('published');
              getPublishedPost();
              router.push('/posts?status=published');
            }}
          >
            Published
          </NavLink>
          <NavLink
            href='#!'
            p={2}
            sx={{ borderBottom: '1px solid #e8e8e8', fontWeight: '500' }}
          >
            Unlisted
          </NavLink>
          <Box sx={{ flexGrow: 1, borderBottom: '1px solid #e8e8e8' }}></Box>
        </Flex>

        {!posts && (
          <Grid columns={[1, 2, 3]}>
            <Flex
              sx={{
                height: '240px',
                borderRadius: '5px',
              }}
              className='skeleton'
            ></Flex>
            <Flex
              sx={{
                height: '240px',
                borderRadius: '5px',
              }}
              className='skeleton'
            ></Flex>
            <Flex
              sx={{
                height: '240px',

                borderRadius: '5px',
              }}
              className='skeleton'
            ></Flex>
          </Grid>
        )}

        {posts && posts.length === 0 && (
          <>
            <Flex
              sx={{
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                marginTop: '40px',
              }}
            >
              <Box sx={{ width: '75px', height: 'auto' }}>
                <svg
                  fill='var(--theme-ui-colors-text)'
                  width='100%'
                  height='100%'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M21,1H3A1,1,0,0,0,2,2V22a1,1,0,0,0,1,1H17a1.011,1.011,0,0,0,.383-.077,1,1,0,0,0,.325-.217l4-4A1.131,1.131,0,0,0,22,18V2A1,1,0,0,0,21,1ZM16,18v3H4V3H20V17H17A1,1,0,0,0,16,18Zm1-8a1,1,0,0,1-1,1H8A1,1,0,0,1,8,9h8A1,1,0,0,1,17,10Zm-4,4a1,1,0,0,1-1,1H8a1,1,0,0,1,0-2h4A1,1,0,0,1,13,14Z' />
                </svg>
              </Box>
              <Text sx={{ fontSize: '32px', fontWeight: '700' }}>
                Share Posts
              </Text>
              When you share posts, they will appear on your profile.
              <Box>
                <Button variant='primaryButton' onClick={() => createNewPost()}>
                  Share your first post
                </Button>
              </Box>
            </Flex>
          </>
        )}
        {posts && (
          <>
            <Grid columns={[1, 2, 3]}>
              {posts.map((post, i) => (
                <PostCard post={post} showAuthor={false} key={`post${i}`} />
              ))}
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
};

export default withAuthenticator(PostsAll);
