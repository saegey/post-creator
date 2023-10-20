import PostAuthor from './PostAuthor';
import { PostContext } from './PostContext';
import React from 'react';

const PostAuthorWrapper = () => {
  const post = React.useContext(PostContext);
  return <PostAuthor post={post} />;
};

export default PostAuthorWrapper;
