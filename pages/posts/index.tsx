import { withAuthenticator } from '@aws-amplify/ui-react';
import Head from 'next/head';
import { Amplify, withSSRContext, API, Auth } from 'aws-amplify';
import { Grid } from 'theme-ui';
import React from 'react';

import Header from '../../src/components/Header';
import { listPostsCustom } from '../../src/graphql/customQueries';
import { GetServerSidePropsContext } from 'next';
import awsconfig from '../../src/aws-exports';
import PostCard from '../../src/components/PostCard';
Amplify.configure({ ...awsconfig, ssr: true });

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

// export const getServerSideProps = async ({ req }) => {
//   const { Auth, API } = withSSRContext({ req });
//   const user = await Auth.currentAuthenticatedUser();

//   try {
//     const response: ListPosts = await API.graphql({
//       query: listPostsCustom,
//       authMode: 'API_KEY',
//       variables: {
//         filter: {
//           postAuthorId: {
//             eq: user.attributes.sub,
//           },
//         },
//       },
//     });

//     return {
//       props: {
//         posts: response.data.listPosts.items.map((d) => {
//           return { ...d, imagesObj: JSON.parse(d.images) };
//         }),
//       },
//     };
//   } catch (err) {
//     console.log(err);
//     return {
//       props: {},
//     };
//   }
// };

const MyPosts = ({ signOut, user }) => {
  const [posts, setPosts] = React.useState();
  const getData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const response: ListPosts = await API.graphql({
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
    return response.data.listPosts.items.map((d) => {
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
        <main>
          <Header user={user} signOut={signOut} title={'My Posts'} />
          <div
            style={{
              marginTop: '60px',
              maxWidth: '900px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Grid gap={2} columns={[2, 3, 3]}>
              {posts &&
                posts.map((post) => (
                  <PostCard post={post} showAuthor={false} />
                ))}
            </Grid>
          </div>
        </main>
      </div>
    </>
  );
};

export default withAuthenticator(MyPosts);
