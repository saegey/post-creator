import { withAuthenticator } from '@aws-amplify/ui-react';
import Head from 'next/head';
import { Amplify, withSSRContext, API, Auth } from 'aws-amplify';
import { Grid, Box } from 'theme-ui';
import React from 'react';

import Header from '../../src/components/Header';
import { listPostsCustom } from '../../src/graphql/customQueries';
import { GetServerSidePropsContext } from 'next';
import awsconfig from '../../src/aws-exports';
import PostCard from '../../src/components/PostCard';
Amplify.configure({ ...awsconfig, ssr: true });

type PostType = Array<{
  id: string;
  title: string;
  author: {
    fullName: string;
    username: string;
    image: string;
  };
}>;

const MyPosts = ({ signOut, user }) => {
  const [posts, setPosts] = React.useState<PostType>();

  const getData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const response: any = await API.graphql({
      query: listPostsCustom,
      authMode: 'API_KEY',
      variables: {
        filter: {
          postAuthorId: {
            eq: user.attributes.sub,
          },
        },
      },
    });
    console.log('getData', JSON.stringify(response));
    return response.data.listPostsByCreatedAt.items.map((d) => {
      return { ...d, imagesObj: JSON.parse(d.images) };
    });
  };

  React.useEffect(() => {
    getData().then((d) => setPosts(d));
  }, []);

  return (
    <>
      <div>
        <Head>
          <title>My Posts</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Box as='main' sx={{ backgroundColor: 'background', height: '100vw' }}>
          <Header user={user} signOut={signOut} title={'My Posts'} />
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
            <Grid columns={[1, 2, 3]} width={'250px'} repeat={'fit'}>
              {posts &&
                posts.map((post) => (
                  <PostCard post={post} showAuthor={false} />
                ))}
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default withAuthenticator(MyPosts);
