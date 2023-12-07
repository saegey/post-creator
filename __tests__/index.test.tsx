import { expect, jest, test } from "@jest/globals";
import { NextApiRequest } from "next";

import { getServerSideProps } from "../pages/index";
import User from "../src/actions/User";
import Post from "../src/actions/PostExplore";

describe("renders a heading", () => {
  test("redirect if no current user", async () => {
    User.getUser = jest.fn<typeof User.getUser>().mockImplementation(() => {
      return Promise.resolve(null);
    });
    const req: NextApiRequest = {
      url: "/",
    } as NextApiRequest;
    expect(await getServerSideProps({ req })).toEqual({
      redirect: {
        destination: "/login",
        permanent: false,
      },
    });
  });

  test("return valid props", async () => {
    User.getUser = jest.fn<typeof User.getUser>().mockImplementation(() => {
      return Promise.resolve({
        userId: "fsdafs",
        email: "sfdf",
        email_verified: true,
        attributes: {
          name: "bob doe",
          zoneinfo: "metric",
          preferred_username: "bobjoe",
          picture: "fasfds",
          sub: "sfsd32432434",
          profile: "safsdfsdfsd",
        },
      });
    });

    const req: NextApiRequest = {
      url: "/",
    } as NextApiRequest;

    const props = {
      props: {
        user: {
          userId: "fsdafs",
          email: "sfdf",
          email_verified: true,
          attributes: {
            name: "bob doe",
            zoneinfo: "metric",
            preferred_username: "bobjoe",
            picture: "fasfds",
            sub: "sfsd32432434",
            profile: "safsdfsdfsd",
          },
        },
        posts: [
          {
            id: "1234",
            title: "this is a tittle",
            images: "",
            imagesObj: undefined,
            author: {
              fullName: "author fullname",
              username: "useername",
              image: "safsdfsd",
            },
            privacyStatus: "private",
          },
        ],
      },
    };
    Post.explore = jest.fn<any>().mockImplementation(() => {
      return Promise.resolve(props);
    });

    expect(await getServerSideProps({ req })).toEqual(props);
  });
});
