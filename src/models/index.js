// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Blog, PublishedPost, Post } = initSchema(schema);

export {
  User,
  Blog,
  PublishedPost,
  Post
};