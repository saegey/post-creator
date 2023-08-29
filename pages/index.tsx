import { withAuthenticator } from '@aws-amplify/ui-react';
import { API, withSSRContext, PubSub, Amplify, Auth } from 'aws-amplify';
import Head from 'next/head';
import { Button, Box, Grid, Link as ThemeLink, Flex, Text } from 'theme-ui';
import { useEffect, useState } from 'react';
// import { useViewport } from '@saegey/posts.viewport';
import Link from 'next/link';
import Image from 'next/image';

import { listPosts } from '../src/graphql/queries';
import Header from '../src/components/Header';
import CreatePostModal from '../src/components/CreatePostModal';
import awsExports from '../src/aws-exports';
import { editorUrl } from '../src/components/AddImage';

export async function getServerSideProps({ req }) {
  const SSR = withSSRContext({ req });

  try {
    const response = await SSR.API.graphql({
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
}

function Home({ signOut, user, posts = [] }) {
  const [newPost, setNewPost] = useState(false);
  // const { width } = useViewport();
  console.log(posts);

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
                  {/* <Flex sx={{ height: '100%' }}> */}
                  <ThemeLink
                    as={Link}
                    sx={{ color: 'black', textDecoration: 'none' }}
                    href={`/posts/${post.id}`}
                    // onClick={() => setMenuOpen(false)}
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
                        <Image
                          src={editorUrl(post.imagesObj[0])}
                          width={280}
                          style={{
                            width: '100%',
                            height: 'auto',
                            // borderRadius: '5px',
                            marginTop: 'auto',
                            marginBottom: 'auto',
                            // boxShadow: `${
                            //   selected && focused ? '0 0 0 3px #B4D5FF' : 'none'
                            // }`,
                          }}
                          height={220}
                          alt='fuck eyah'
                          // height='auto'
                        />
                      )}
                      {!post.imagesObj && (
                        <Box
                          sx={{
                            // height: '200px',
                            width: '100%',
                            backgroundColor: '#9b9b9b',
                            // borderRadius: '5px',
                          }}
                        />
                      )}
                    </Flex>
                    <Box
                      sx={{
                        backgroundColor: '#dadada',
                        padding: '10px',
                        // color: 'white',
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
                  {/* </Flex> */}
                </Box>
              ))}
            </Grid>
          </div>
        </main>
      </div>
    </>
  );
}

export default withAuthenticator(Home);
