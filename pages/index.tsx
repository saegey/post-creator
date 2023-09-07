import { withAuthenticator } from '@aws-amplify/ui-react';
import { withSSRContext, API } from 'aws-amplify';
import Head from 'next/head';
import { Button, Box, Grid, Link as ThemeLink, Flex, Text } from 'theme-ui';
import React from 'react';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

import { listPostsCustom } from '../src/graphql/customQueries';
import Header from '../src/components/Header';
import CreatePostModal from '../src/components/CreatePostModal';
import { CloudinaryImage } from '../src/components/AddImage';
import PostCard from '../src/components/PostCard';

type ListPosts = {
  data: {
    listPostsByCreatedAt: {
      items: Array<{
        id: string;
        title: string;
        images: string;
      }>;
    };
  };
};

export const getServerSideProps = async ({ req }) => {
  const SSR = withSSRContext({ req });

  try {
    const response: ListPosts = await SSR.API.graphql({
      query: listPostsCustom,
      authMode: 'API_KEY',
    });

    return {
      props: {
        posts: response.data.listPostsByCreatedAt.items.map((d) => {
          return { ...d, imagesObj: JSON.parse(d.images) };
        }),
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
};

type HomeProps = {
  signOut: () => {};
  user: object;
  posts: Array<{
    id: string;
    title: string;
    images: string;
    imagesObj: Array<CloudinaryImage>;
  }>;
};

const Home = ({ signOut, user, posts = [] }: HomeProps) => {
  const [newPost, setNewPost] = React.useState(false);

  return (
    <>
      {newPost && <CreatePostModal setMenuOpen={setNewPost} />}
      <div>
        <Head>
          <title>Home</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Box as='main' sx={{ backgroundColor: 'background', height: '100vw' }}>
          <Header user={user} signOut={signOut} title={'Posts'} />
          <Box
            sx={{
              // marginTop: '60px',
              maxWidth: '900px',
              marginLeft: ['10px', 'auto', 'auto'],
              marginRight: ['10px', 'auto', 'auto'],
              padding: '20px',
              width: '100vw',
            }}
          >
            <div>
              <Button onClick={() => setNewPost(true)}>New Post</Button>
            </div>
            <Grid columns={[1, 2, 3]}>
              {posts.map((post) => (
                <PostCard post={post} />
              ))}
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default withAuthenticator(Home);
