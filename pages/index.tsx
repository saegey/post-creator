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
    listPosts: {
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
        posts: response.data.listPosts.items.map((d) => {
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

  console.log(posts);
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
          <div
            style={{
              marginTop: '60px',
              maxWidth: '900px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <div>
              <Button onClick={() => setNewPost(true)}>New Post</Button>
            </div>
            <Grid gap={2} columns={[2, 3, 3]}>
              {posts.map((post) => (
                <PostCard post={post} />
              ))}
            </Grid>
          </div>
        </Box>
      </div>
    </>
  );
};

export default withAuthenticator(Home);
