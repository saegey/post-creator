import Head from "next/head";
import React from "react";

import { PostContext } from "../../../src/components/PostContext";
import EditUserPost from "../../../src/components/posts/Editor/EditUserPost";
import { PostType, PostContextType } from "../../../src/types/common";
import { fetchUserAndPost } from "../../../src/utils/fetchUserAndPost";
import FavIcon from "../../../src/components/shared/FavIcon";

type ServerSideProps = {
  req: object;
  params: {
    id: string;
  };
};

export const getServerSideProps = async ({ req, params }: ServerSideProps) => {
  return fetchUserAndPost(req, params.id);
};

const Post = ({ user, postRaw, errorCode }: PostType) => {
  if (errorCode) {
    return <div>Error: {errorCode}</div>; // You could handle errors more gracefully here
  }
  if (!user || !postRaw) {
    return <div>404</div>;
  }

  const [post, setPostState] = React.useState<PostContextType>({
    ...postRaw,
    setPost: (updates: Partial<PostContextType>) => {
      setPostState((prevState) => ({
        ...prevState,
        ...updates,
      }));
    },
    activity: [],
    elevations: [],
  });

  return (
    <PostContext.Provider value={post}>
      <Head>
        <title>{post.title}</title>
        <FavIcon />
      </Head>
      <EditUserPost user={user} />
    </PostContext.Provider>
  );
};

export default Post;
