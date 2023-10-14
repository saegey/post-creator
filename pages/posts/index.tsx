import Head from 'next/head';
import { Amplify, API, Auth } from 'aws-amplify';
import React from 'react';

import { listMyPostsCustom } from '../../src/graphql/customQueries';
import awsconfig from '../../src/aws-exports';
import PostsAll from '../../src/components/PostsAll';
import AuthCustom from '../../src/components/AuthCustom';

Amplify.configure({ ...awsconfig, ssr: true });

export type PostType = Array<{
  id: string;
  title: string;
  author: {
    fullName: string;
    username: string;
    image: string;
  };
}>;

const MyPosts = () => {
  // const [posts, setPosts] = React.useState<PostType>();

  // const getData = async (type = 'draft') => {
  //   const user = await Auth.currentAuthenticatedUser();
  //   const response: any = await API.graphql({
  //     query: listMyPostsCustom,
  //     authMode: 'AMAZON_COGNITO_USER_POOLS',
  //     variables: {
  //       filter: {
  //         // postAuthorId: {
  //         //   eq: user.attributes.sub,
  //         // },
  //         privacyStatus: {
  //           eq: type,
  //         },
  //       },
  //     },
  //   });

  //   response.data.listPostsByCreatedAt.items.map((d) => {
  //     return { ...d, imagesObj: JSON.parse(d.images) };
  //   });

  //   setPosts(response.data.listPostsByCreatedAt);
  // };

  // React.useEffect(() => {
  //   getData();
  // }, []);

  return (
    <AuthCustom>
      <div>
        <Head>
          <title>My Posts</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <PostsAll view='my' />
      </div>
    </AuthCustom>
  );
};

export default MyPosts;
