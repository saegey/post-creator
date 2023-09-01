import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth, API } from 'aws-amplify';
import Head from 'next/head';
import { Label, Input, Box, Flex, Button, Spinner, Text } from 'theme-ui';
import { CldImage } from 'next-cloudinary';
import { updateUser } from '../src/graphql/mutations';
import React from 'react';

import Header from '../src/components/Header';

const uploadSettings = {
  cloudName: 'dprifih4o',
  uploadPreset: 'kippntej',
  cropping: true, //add a cropping step
  // showAdvancedOptions: true,  //add advanced options (public_id and tag)
  sources: ['local', 'url'], // restrict the upload sources to URL and local files
  multiple: false, //restrict upload to a single file
  folder: 'profile', //upload files to the specified folder
  tags: ['users', 'profile'], //add the given tags to the uploaded files
  context: { alt: 'user_uploaded' }, //add the given context data to the uploaded files
  clientAllowedFormats: ['jpg', 'png', 'jpeg'], //restrict uploading to image files only
  // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
  // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
  // theme: "purple", //change to a purple theme
};

async function updateAvatar({ picture }) {
  const user = await Auth.currentAuthenticatedUser();
  await Auth.updateUserAttributes(user, {
    picture,
  });

  await API.graphql({
    authMode: 'AMAZON_COGNITO_USER_POOLS',
    query: updateUser,
    variables: {
      input: {
        id: user.attributes.sub,
        image: picture,
      },
    },
  });
}

const EditAvatar = () => {
  const uploadWidget = window.cloudinary.createUploadWidget(
    uploadSettings,
    (error, result) => {
      if (!error && result && result.event === 'success') {
        console.log('Done! Here is the image info: ', result.info);
        updateAvatar({ picture: result.info.public_id });
      }
    }
  );
  return (
    <Button
      onClick={() => uploadWidget.open()}
      sx={{
        backgroundColor: '#eaeaea',
        border: '1px solid #9d9d9d',
        fontSize: '13px',
        color: 'black',
        paddingY: '4px',
        '&:hover': {
          backgroundColor: '#d9d9d9',
        },
      }}
    >
      Edit
    </Button>
  );
};

const Profile = ({ signOut, user }) => {
  const [isSaving, setIsSaving] = React.useState(false);

  async function updateUserData({ username, fullName, profile }) {
    setIsSaving(true);
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
      profile: profile,
      name: fullName,
      preferred_username: username,
    });

    const response = await API.graphql({
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      query: updateUser,
      variables: {
        input: {
          id: user.attributes.sub,
          fullName: fullName,
          username: username,
        },
      },
    });
    setIsSaving(false);
    // console.log(fullName, response);
  }
  // console.log(user);
  return (
    <>
      <Box sx={{ width: '100%', height: '100vw', backgroundColor: 'white' }}>
        <Head>
          <title>Profile</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <main>
          <Header user={user} signOut={signOut} title={'Profile'} />
          <div
            style={{
              // marginTop: '60px',
              paddingTop: '40px',
              maxWidth: '900px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Flex sx={{ margin: '20px' }}>
              <Box sx={{ gap: '20px', flexDirection: 'column', width: '50%' }}>
                <form
                  onSubmit={(event: any) => {
                    event.preventDefault();
                    const form = new FormData(event.target);
                    updateUserData({
                      username: form.get('username'),
                      profile: form.get('location'),
                      fullName: form.get('fullName'),
                    });

                    console.log('submitform');
                  }}
                >
                  <Flex sx={{ flexDirection: 'column', gap: '10px' }}>
                    <Box>
                      <Label htmlFor='fullName'>Name</Label>
                      <Input
                        id='fullName'
                        name='fullName'
                        placeholder='Name'
                        defaultValue={user.attributes.name}
                      />
                    </Box>
                    <Box>
                      <Label htmlFor='username'>Username</Label>
                      <Input
                        id='username'
                        name='username'
                        placeholder='Username'
                        defaultValue={user.attributes.preferred_username}
                      />
                    </Box>
                    <Box>
                      <Label htmlFor='location'>Location</Label>
                      <Input
                        id='location'
                        name='location'
                        placeholder='Location'
                        defaultValue={user.attributes.profile}
                      />
                    </Box>
                    <Box sx={{ marginTop: '10px' }}>
                      <Button
                        sx={{ '&:hover': { backgroundColor: '#515151' } }}
                      >
                        <Flex sx={{ gap: '10px' }}>
                          <Text as='span'>Save</Text>
                          {isSaving && (
                            <Spinner sx={{ size: '20px', color: 'white' }} />
                          )}
                        </Flex>
                      </Button>
                    </Box>
                  </Flex>
                </form>
              </Box>
              <Box sx={{ width: '50%' }}>
                <Box
                  sx={{
                    marginLeft: 'auto',
                    width: '200px',
                    height: 'auto',
                    position: 'relative',
                  }}
                >
                  {user.attributes.picture && (
                    <CldImage
                      width='400'
                      height='300'
                      src={user.attributes.picture}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        borderRadius: '100%',
                      }}
                      // preserveTransformations
                      underlay={user.attributes.picture}
                      quality={90}
                      sizes='100vw'
                      alt='Description of my image'
                    />
                  )}
                  {!user.attributes.picture && (
                    <svg
                      fill='#8d8d8d'
                      width='100%'
                      height='100%'
                      viewBox='0 0 512 512'
                      id='_x30_1'
                    >
                      <path d='M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M256,90  ' />
                    </svg>
                  )}
                  <Box
                    sx={{ position: 'absolute', bottom: '12px', left: '-3px' }}
                  >
                    <EditAvatar />
                  </Box>
                </Box>
              </Box>
            </Flex>
          </div>
        </main>
      </Box>
    </>
  );
};

export default withAuthenticator(Profile);
