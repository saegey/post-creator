import Head from 'next/head';
import { Amplify, API, Auth } from 'aws-amplify';
import React from 'react';

import { listPostsCustom } from '../../src/graphql/customQueries';
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
  const [posts, setPosts] = React.useState<PostType>();

  const getData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const response: any = await API.graphql({
      query: listPostsCustom,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: {
        filter: {
          postAuthorId: {
            eq: user.attributes.sub,
          },
        },
      },
    });

    return response.data.listPostsByCreatedAt.items.map((d) => {
      return { ...d, imagesObj: JSON.parse(d.images) };
    });
  };

  React.useEffect(() => {
    getData().then((d) => setPosts(d));
  }, []);

  return (
    <AuthCustom>
      <div>
        <Head>
          <title>My Posts</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <PostsAll posts={posts} />
      </div>
    </AuthCustom>
  );
};

export default MyPosts;
