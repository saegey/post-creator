import { API, withSSRContext, PubSub, Amplify, Auth } from 'aws-amplify';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Slate, withReact, Editable, ReactEditor } from 'slate-react';
import { useState, useEffect } from 'react';
import { createEditor, Descendant, Transforms } from 'slate';
import { Button, Flex, Box, Alert } from 'theme-ui';
import { GraphQLResult } from '@aws-amplify/api';
import zlib from 'zlib';
import { AWSIoTProvider } from '@aws-amplify/pubsub';
import AWS from 'aws-sdk';

import { deletePost } from '../../src/graphql/mutations';
import { getPost } from '../../src/graphql/queries';
import styles from '../../styles/Home.module.css';
import renderElement from '../../src/utils/RenderElement';
import { updatePost } from '../../src/graphql/mutations';
import { UpdatePostMutation } from '../../src/API';
import Header from '../../src/components/Header';
import UploadGpxModal from '../../src/components/UploadGpxModal';
import { MyContext } from '../../src/MyContext';
import AddImage from '../../src/components/AddImage';
import awsExports from '../../src/aws-exports';
import BlackBox from '../../src/components/BlackBox';

export async function getServerSideProps({ req, params }) {
  const SSR = withSSRContext({ req });

  const { data } = await SSR.API.graphql({
    query: getPost,
    authMode: 'API_KEY',
    variables: {
      id: params.id,
    },
  });

  const post = data.getPost;
  // console.log('coordinates', post.coordinates ? true : false)
  const powersRaw = post.power
    ? ((await uncompress(post.powers)) as string)
    : '{}';
  const coordinatesRaw = post.coordinates
    ? ((await uncompress(post.coordinates)) as string)
    : '{}';
  const elevationRaw = post.elevation
    ? ((await uncompress(post.elevation)) as string)
    : '{}';

  const powers = JSON.parse(powersRaw);
  const coordinates = JSON.parse(coordinatesRaw);
  const elevation = JSON.parse(elevationRaw);

  // console.log({
  //   post,
  //   powerAnalysis: post.powerAnalysis ? JSON.parse(post.powerAnalysis) : {},
  //   elevation: elevation ? elevation : [],
  //   coordinates: coordinates,
  // });

  return {
    props: {
      post,
      powerAnalysis: post.powerAnalysis ? JSON.parse(post.powerAnalysis) : {},
      elevation: elevation ? elevation : [],
      coordinates: coordinates,
    },
  };
}

const uncompress = async (input: any) => {
  return new Promise((resolve, reject) => {
    return zlib.gunzip(
      Buffer.from(input, 'base64'),
      (err: any, buffer: any) => {
        if (!err) {
          const widgetString = buffer.toString('utf-8');
          resolve(widgetString);
        } else {
          reject(err);
        }
      }
    );
  });
};

const Post = ({
  signOut,
  user,
  renderedAt,
  post,
  powerAnalysis,
  elevation,
  coordinates,
}) => {
  const router = useRouter();
  const [editor] = useState(() => withReact(createEditor()));

  const [isSaving, setIsSaving] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [addImageModal, setAddImageModal] = useState(false);
  const [processingGpxStatus, setProcessingGpxStatus] = useState('');

  const [iotProviderConfigured, setIotProviderConfigured] = useState(false);
  const [iotEndpoint, setIotEndpoint] = useState();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [text, setText] = useState('');
  const [title, setTitle] = useState(post.title);

  const initialState = JSON.parse(post.components);

  if (router.isFallback) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Loading&hellip;</h1>
      </div>
    );
  }

  const upload = (editor) => {
    setUploadModal(true);
  };

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

    if (processingGpxStatus === 'update-data') {
      setTimeout(() => {
        setProcessingGpxStatus('');
        console.log('Delayed for 5 second.');
      }, 5000);
    }

    getEndpoint().catch(console.error);
    configurePubSub().catch(console.error);

    // if (!isSubscribed) {
    // console.log('subscribed to newpost');
    const sub1 = PubSub.subscribe('newpost').subscribe({
      next: (data) => {
        console.log(data.value.phase);
        setProcessingGpxStatus(data.value.phase);
      },
      error: (error) => console.error(error),
      close: () => console.log('Done'),
    });

    return () => {
      sub1.unsubscribe();
      console.log('cleaned up');
    };
    // setIsSubscribed(true);

    // }

    // }
  });

  async function handleDelete() {
    try {
      await API.graphql({
        authMode: 'AMAZON_COGNITO_USER_POOLS',
        query: deletePost,
        variables: {
          input: { id: post.id },
        },
      });

      window.location.href = '/';
    } catch ({ errors }) {
      console.error(...errors);
      throw new Error(errors[0].message);
    }
  }

  const addMap = (editor: ReactEditor) => {
    Transforms.insertNodes(editor, [
      { type: 'visualOverview', children: [{ text: '' }] } as Descendant,
    ]);
  };

  const addGraph = (editor: ReactEditor) => {
    Transforms.insertNodes(editor, [
      {
        type: 'powergraph',
        children: [{ text: '' }],
        void: true,
      } as Descendant,
      { type: 'text', children: [{ text: '' }] } as Descendant,
    ]);
  };

  const save = async (editor: any) => {
    setIsSaving(true);
    event.preventDefault();
    // console.log(post);

    try {
      const response = (await API.graphql({
        authMode: 'AMAZON_COGNITO_USER_POOLS',
        query: updatePost,
        variables: {
          input: {
            id: post.id,
            title: title,
            // content: form.get('content'),
            components: JSON.stringify(editor.children),
          },
        },
      })) as GraphQLResult<UpdatePostMutation>;
      console.log('saved');
      setIsSaving(false);
    } catch ({ errors }) {
      console.error(...errors);
      throw new Error(errors[0].message);
      setIsSaving(false);
    }
  };

  return (
    <MyContext.Provider value={{ powerAnalysis, elevation, coordinates }}>
      <div>
        <Head>
          <title>{post.title}</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <main>
          {isSaving && (
            <BlackBox>
              <p>saving</p>
            </BlackBox>
          )}
          {uploadModal && (
            <UploadGpxModal
              openModal={setUploadModal}
              post={post}
              setProcess={setProcessingGpxStatus}
            />
          )}
          {addImageModal && (
            <AddImage isOpen={setAddImageModal} post={post} editor={editor} />
          )}
          <Header user={user} signOut={signOut} />
          <div
            style={{
              marginTop: '60px',
              maxWidth: '900px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {processingGpxStatus !== '' && <Alert>{processingGpxStatus}</Alert>}
            <h1
              style={{ marginBottom: '20px' }}
              contentEditable='true'
              onBlur={(event) => {
                setTitle(event.target.textContent);
              }}
            >
              {post.title}
            </h1>
            <Flex sx={{ marginBottom: '20px', gap: '10px' }}>
              <Button onClick={() => addGraph(editor)} disabled={!post.gpxFile}>
                + Power Graph
              </Button>
              <Button onClick={() => setAddImageModal(true)}>+ Image </Button>
              <Button onClick={() => save(editor)}>Save</Button>
              <Button onClick={handleDelete}>Delete</Button>
              <Button onClick={() => upload(editor)}>Upload GPX</Button>
              <Button onClick={() => addMap(editor)}>Add Map</Button>
            </Flex>

            <Slate editor={editor} initialValue={initialState}>
              <Editable
                spellCheck
                autoFocus
                renderElement={renderElement}
                style={{ padding: '2px' }}
              />
            </Slate>
          </div>
        </main>
        <footer className={styles.footer}></footer>
      </div>
    </MyContext.Provider>
  );
};

export default withAuthenticator(Post);
