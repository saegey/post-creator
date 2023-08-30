import { withAuthenticator } from '@aws-amplify/ui-react';
import { withSSRContext } from 'aws-amplify';
import Head from 'next/head';
import { Button, Box, Grid, Link as ThemeLink, Flex, Text } from 'theme-ui';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CldImage } from 'next-cloudinary';

import { listPosts } from '../src/graphql/queries';
import Header from '../src/components/Header';
import CreatePostModal from '../src/components/CreatePostModal';
import { CloudinaryImage } from '../src/components/AddImage';

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
      query: listPosts,
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
  const [newPost, setNewPost] = useState(false);

  return (
    <>
      {newPost && <CreatePostModal setMenuOpen={setNewPost} />}
      <div>
        <Head>
          <title>Home</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <main>
          <Header user={user} signOut={signOut} />
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
                <Box
                  sx={{ paddingTop: '20px', listStyleType: 'none' }}
                  key={`post-${post.id}`}
                >
                  <ThemeLink
                    as={Link}
                    sx={{ color: 'black', textDecoration: 'none' }}
                    href={`/posts/${post.id}`}
                  >
                    <Flex
                      sx={{
                        height: '240px',
                        border: '1px solid #dadada',
                        borderTopLeftRadius: '5px',
                        borderTopRightRadius: '5px',
                      }}
                    >
                      {post.imagesObj && post.imagesObj.length > 0 && (
                        <CldImage
                          width='400'
                          height='300'
                          src={post.imagesObj[0].public_id}
                          style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                            marginTop: 'auto',
                            marginBottom: 'auto',
                            borderTopLeftRadius: '5px',
                            borderTopRightRadius: '5px',
                          }}
                          preserveTransformations
                          underlay={post.imagesObj[0].public_id}
                          quality={90}
                          sizes='100vw'
                          alt='Description of my image'
                        />
                      )}
                      {!post.imagesObj && (
                        <Box
                          sx={{
                            width: '100%',
                            backgroundColor: '#9b9b9b',
                          }}
                        />
                      )}
                    </Flex>
                    <Box
                      sx={{
                        backgroundColor: '#dadada',
                        padding: '10px',
                        borderBottomLeftRadius: '5px',
                        borderBottomRightRadius: '5px',
                      }}
                    >
                      <Text
                        as='span'
                        sx={{ fontWeight: 600, color: '#424242' }}
                      >
                        {post.title}
                      </Text>
                    </Box>
                  </ThemeLink>
                </Box>
              ))}
            </Grid>
          </div>
        </main>
      </div>
    </>
  );
};

export default withAuthenticator(Home);
