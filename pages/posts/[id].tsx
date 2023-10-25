import { withSSRContext, Storage } from "aws-amplify";
import React from "react";
import Head from "next/head";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { GraphQLResult } from "@aws-amplify/api";

import { getPublishedPost } from "../../src/graphql/customQueries";
import { getActivity } from "../../src/actions/PostGet";
import AuthCustom from "../../src/components/AuthCustom";
import PostView from "../../src/components/PostView";
import SlatePublish from "../../src/components/SlatePublish";
import { getPost } from "../../src/graphql/queries";
import { PostContext } from "../../src/components/PostContext";
import { generate as generateMetaTags } from "../../src/utils/metaTags";
import { GetPublishedPostQuery } from "../../src/API";
import {
  ActivityItem,
  CognitoUserExt,
  CustomElement,
  PostViewType,
} from "../../src/types/common";

type ServerSideProps = {
  req: object;
  params: {
    id: string;
  };
};

export const getServerSideProps = async ({ req, params }: ServerSideProps) => {
  const { API } = withSSRContext({ req });

  let post;

  const { data } = (await API.graphql({
    query: getPublishedPost,
    authMode: "API_KEY",
    variables: {
      id: params.id,
    },
  })) as GraphQLResult<GetPublishedPostQuery>;

  if (!data || !data.getPublishedPost) {
    const { data } = await API.graphql({
      query: getPost,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        id: params.id,
      },
    });
    post = data.getPost;
  } else {
    post = data.getPublishedPost;
  }

  post.author =
    post.__typename === "PublishedPost" ? JSON.parse(post.author) : post.author;

  return {
    props: {
      post: post,
      metaTags: generateMetaTags({ post }),
    },
  };
};

const Publish = ({
  post,
  user,
}: {
  post: PostViewType;
  user: CognitoUserExt;
}): JSX.Element => {
  const config = SlatePublish();
  const components = post.components
    ? (JSON.parse(post.components) as CustomElement[])
    : undefined;

  const [activity, setActivity] = React.useState<ActivityItem[] | undefined>();
  const [powerAnalysis, setPowerAnalysis] = React.useState<
    Array<Record<number | string, number>> | undefined
  >();

  const getTimeSeriesFile = async (timeSeriesFile: string) => {
    const result = await Storage.get(timeSeriesFile, {
      download: true,
      level: post.__typename === "PublishedPost" ? "public" : "private",
    });
    const timeSeriesData = await new Response(result.Body).json();
    setPowerAnalysis(timeSeriesData.powerAnalysis);

    const activityString = await getActivity(timeSeriesData);
    const activity =
      activityString &&
      activityString.map((a, i) => {
        return {
          t: a?.t,
          c: a?.c,
          g: a?.g !== null ? a?.g : 0,
          e: a?.e === null ? 0 : a?.e,
          d:
            a?.d === 0
              ? activityString[i - 1]
                ? activityString[i - 1]?.d
                : 0
              : a?.d,
        };
      });

    return activity;
  };

  React.useEffect(() => {
    if (!post.gpxFile || !post.timeSeriesFile) {
      console.log("no gpx file", post);
      return;
    }
    getTimeSeriesFile(post.timeSeriesFile).then((e) => {
      setActivity(e);
    });
  }, []);

  return (
    <AuthCustom>
      <PostContext.Provider
        value={{ activity, setActivity, powerAnalysis, setPowerAnalysis }}
      >
        <Head>
          <title>{post.title}</title>
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>M</text></svg>"
          />
        </Head>
        <PostView
          components={components}
          config={config}
          post={post}
          user={user}
        />
      </PostContext.Provider>
    </AuthCustom>
  );
};

export default withAuthenticator(Publish);
