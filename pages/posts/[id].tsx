import { Amplify, API, withSSRContext, Storage } from 'aws-amplify';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Slate, withReact, Editable, ReactEditor } from 'slate-react';
import { useState } from 'react';
import { createEditor, Descendant, Transforms } from 'slate';
import { Button, Flex, Box } from 'theme-ui';
import { GraphQLResult } from '@aws-amplify/api';
import { gpx } from '@tmcw/togeojson';
import { DOMParser } from '@xmldom/xmldom';

import { deletePost } from '../../src/graphql/mutations';
import { getPost } from '../../src/graphql/queries';
import styles from '../../styles/Home.module.css';
import renderElement from '../../src/utils/RenderElement';
import { updatePost } from '../../src/graphql/mutations';
import { UpdatePostMutation } from '../../src/API';
import Header from '../../src/components/Header';
import UploadGpxModal from '../../src/components/UploadGpxModal';
import { MyContext } from '../../src/MyContext';
import { calcBestPowers, downsampleElevation } from '../../src/utils/gpxHelper';
import AddImage from '../../src/components/AddImage';

const timeIntervals = (end: number) => [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 25, 30, 35, 40, 45, 50,
  55, 60, 70, 80, 90, 100, 110, 120, 180, 240, 300, 360, 420, 480, 540, 600,
  660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1500, 1800, 2100, 2400,
  2700, 3000, 3300, 3600, 4200, 4800, 5400, 6000, 6600, 7200, 7800, 8400, 9000,
  9600, 10200, 10800, 12000, 13200, 14400, 15600, 16800, 18000, 19200, 20400,
  21600,
];

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
  let powers, powerAnalysis: Record<number | string, number>, result, elevation, coordinates;

  try {
    result = await Storage.get(`${post.gpxFile}`, {
      download: true,
    });
  } catch (e) {
    console.log(e);
  }
  if (!result) {
    return {
      props: {
        post,
        powers: [],
        powerAnalysis: {},
      },
    };
  }

  const body = await result.Body.text();
  const xmlDoc = new DOMParser().parseFromString(body);
  const gpxData = gpx(xmlDoc);

  gpxData.features.forEach((feature) => {
    // const { powers, heart, times, atemps, cads } =
    //   feature.properties.coordinateProperties;
    coordinates = feature.geometry.coordinates
    powers = feature.properties.coordinateProperties.powers;
    powerAnalysis = calcBestPowers(timeIntervals(powers.length), powers);
    elevation = downsampleElevation(coordinates);
  });

  return {
    props: {
      post,
      powerAnalysis: powerAnalysis ? powerAnalysis : {},
      elevation: elevation ? elevation : [],
      coordinates: coordinates,
    },
  };
}

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
  // const [addMap, setAddMap] = useState(false)

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
    console.log(post);

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
            <Box
              sx={{
                position: 'fixed',
                top: '0',
                height: '100%',
                width: '100%',
                left: '0',
                backgroundColor: 'rgba(0,0,0,0.8)',
                zIndex: 10000,
                display: 'flex',
              }}
            ></Box>
          )}
          {uploadModal && (
            <UploadGpxModal openModal={setUploadModal} post={post} />
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
