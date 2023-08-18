import { withAuthenticator } from '@aws-amplify/ui-react';
import { API, withSSRContext, PubSub, Amplify, Auth } from 'aws-amplify';
import Head from 'next/head';
import { Button } from 'theme-ui';
import { useEffect, useState } from 'react';
import { useViewport } from '@saegey/posts.viewport';
import { AWSIoTProvider } from '@aws-amplify/pubsub';
import AWS from 'aws-sdk';

import { listPosts } from '../src/graphql/queries';
import Header from '../src/components/Header';
import CreatePostModal from '../src/components/CreatePostModal';
import awsExports from '../src/aws-exports';

export async function getServerSideProps({ req }) {
  const SSR = withSSRContext({ req });

  try {
    const response = await SSR.API.graphql({
      query: listPosts,
      authMode: 'API_KEY',
    });
    return {
      props: {
        posts: response.data.listPosts.items,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
}

function Home({ signOut, user, posts = [] }) {
  const [newPost, setNewPost] = useState(false);
  const [iotProviderConfigured, setIotProviderConfigured] = useState(false);
  const [iotEndpoint, setIotEndpoint] = useState();
  const { width } = useViewport();

  async function configurePubSub() {
    if (!iotProviderConfigured && iotEndpoint) {
      console.log(
        `Configuring Amplify PubSub, region = ${awsExports.aws_project_region}, endpoint = ${iotEndpoint}`
      );
      Amplify.addPluggable(
        new AWSIoTProvider({
          aws_pubsub_region: awsExports.aws_project_region,
          aws_pubsub_endpoint: iotEndpoint,
        })
      );
      setIotProviderConfigured(true);
      // } else {
      //   console.log('Amplify IoT provider already configured.');
    }
  }

  const getEndpoint = async () => {
    console.log('Getting IoT Endpoint...');
    const credentials = await Auth.currentCredentials();
    const iot = new AWS.Iot({
      region: awsExports.aws_project_region,
      credentials: Auth.essentialCredentials(credentials),
    });
    const response = await iot
      .describeEndpoint({ endpointType: 'iot:Data-ATS' })
      .promise();
    const endpoint = `wss://${response.endpointAddress}/mqtt`;
    setIotEndpoint(endpoint);
    console.log(`Your IoT Endpoint is:\n ${endpoint}`);
  };

  async function attachIoTPolicyToUser() {
    // This should be the custom cognito attribute that tells us whether the user's
    // federated identity already has the necessary IoT policy attached:
    const IOT_ATTRIBUTE_FLAG = 'custom:iotPolicyIsAttached';

    var userInfo = await Auth.currentUserInfo({ bypassCache: true });
    var iotPolicyIsAttached =
      userInfo.attributes[IOT_ATTRIBUTE_FLAG] === 'true';
    console.log(userInfo);

    if (!iotPolicyIsAttached) {
      const apiName = 'api12660653';
      const path = '/attachIoTPolicyToFederatedUser';
      const myInit = {
        response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      };

      console.log(
        `Calling API GET ${path} to attach IoT policy to federated user...`
      );
      var response = await API.get(apiName, path, myInit);
      console.log(
        `GET ${path} ${response.status} response:\n ${JSON.stringify(
          response.data,
          null,
          2
        )}`
      );
      console.log(`Attached IoT Policy to federated user.`);
    } else {
      console.log(`Federated user ID already attached to IoT Policy.`);
    }
  }

  useEffect(() => {
    // Update the document title using the browser API
    // console.log('use eeffect');
    // PubSub.subscribe('myTopic').subscribe({
    //   next: (data) => console.log('Message received', data),
    //   error: (error) => console.error(error),
    //   complete: () => console.log('Done'),
    // });

    getEndpoint().catch(console.error);
    configurePubSub().catch(console.error);
    attachIoTPolicyToUser().catch(console.error);
    // attachIoTPolicyToUser.catch(console.error);

    // if (iotEndpoint && iotProviderConfigured) {
    //   console.log('subscribed...');
    //   try {
    //     PubSub.publish('test', { msg: 'hi there' });
    //   } catch (err) {
    //     console.log(err);
    //   }

    PubSub.subscribe('newpost').subscribe({
      next: (data) => console.log(data.value.phase),
      error: (error) => console.error(error),
      close: () => console.log('Done'),
    });
    // }
  });

  return (
    <>
      {newPost && <CreatePostModal setMenuOpen={setNewPost} />}
      <div>
        <Head>
          <title>Home</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <main>
          <Header user={user} signOut={signOut} />
          <div
            style={{
              marginTop: '60px',
              maxWidth: '900px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <p>Width: {width}</p>
            <div>
              <Button onClick={() => setNewPost(true)}>New Post</Button>
            </div>
            <ul>
              {posts.map((post) => (
                <li
                  style={{ paddingTop: '20px', listStyleType: 'none' }}
                  key={`post-${post.id}`}
                >
                  <a href={`/posts/${post.id}`} key={post.id}>
                    <p>{post.title}</p>
                    <p>{post.content}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}

export default withAuthenticator(Home);
