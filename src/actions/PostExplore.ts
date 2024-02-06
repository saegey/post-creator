import { withSSRContext } from "aws-amplify";
import { NextApiRequest } from "next";
import { GraphQLResult } from "@aws-amplify/api";

import { listPostsCustom } from "../graphql/customQueries";
import { IUser, ListPostsCustom } from "../types/common";

class Post {
  static explore = async ({
    req,
    user,
  }: {
    req: NextApiRequest;
    user: IUser | null;
  }) => {
    const SSR = withSSRContext({ req });
    try {
      const response = (await SSR.API.graphql({
        query: listPostsCustom,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as GraphQLResult<ListPostsCustom>;

      return {
        props: {
          user,
          posts: response?.data?.listPublishedPostsByCreatedAt?.items.map(
            (d) => {
              return {
                ...d,
                imagesObj: JSON.parse(d.images ? d.images : ""),
                author: JSON.parse(d.author ? d.author : "") as {
                  __typename: "User";
                  id: string;
                  fullName: string;
                  email: string;
                  image?: string | null;
                  username?: string | null;
                  createdAt: string;
                  updatedAt: string;
                  owner?: string | null;
                },
              };
            }
          ),
        },
      };
    } catch (err) {
      console.log(err);
      return {
        props: {},
      };
    }
  };
}

export default Post;
