import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth, API } from "aws-amplify";
import Head from "next/head";
import { Label, Input, Box, Flex, Button, Spinner, Text } from "theme-ui";
import React from "react";
import { CldImage, CldUploadButton } from "next-cloudinary";

import { updateUser } from "../src/graphql/mutations";
import Header from "../src/components/Header";
import { CloudinaryImage } from "../src/components/AddImage";
import { CognitoUserExt } from "../src/types/common";

async function updateAvatar({ picture }: { picture: string }) {
  const user: CognitoUserExt = await Auth.currentAuthenticatedUser();
  await Auth.updateUserAttributes(user, {
    picture,
  });

  await API.graphql({
    authMode: "AMAZON_COGNITO_USER_POOLS",
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
  return (
    <Box
      sx={{
        ".cloudBtn": {
          backgroundColor: "unset",
          fontSize: "15px",
          fontWeight: "500",
          color: "text",
          paddingY: "4px",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      }}
    >
      <CldUploadButton
        className="cloudBtn"
        uploadPreset="kippntej"
        options={{
          sources: [
            "local",
            "url",
            "camera",
            "image_search",
            // 'google_drive',
            // 'facebook',
            // 'dropbox',
            // 'instagram',
            // 'shutterstock',
            // 'getty',
            // 'istock',
            // 'unsplash',
          ],
          cropping: true,
          styles: {
            frame: {
              background: "black",
            },
            palette: {
              window: "#FFF",
              windowBorder: "black",
              tabIcon: "black",
              menuIcons: "black",
              textDark: "#000000",
              textLight: "#FFFFFF",
              link: "black",
              action: "black",
              inactiveTabIcon: "#888888",
              error: "#F44235",
              inProgress: "#0078FF",
              complete: "#20B832",
              sourceBg: "#e4e4e4",
            },
            fonts: {
              "SF Pro Display": "",
            },
          },
        }}
        onSuccess={async (d) => {
          const image = d.info as CloudinaryImage;
          console.log("Done! Here is the image info: ", d.info);
          if (image && image.public_id) {
            updateAvatar({ picture: image.public_id });
          }
        }}
      >
        Change profile image
      </CldUploadButton>
    </Box>
  );
};

const Profile = ({
  signOut,
  user,
}: {
  signOut: () => void;
  user: CognitoUserExt;
}) => {
  const [isSaving, setIsSaving] = React.useState(false);
  const [_wasSaved, setWasSaved] = React.useState(false);

  async function updateUserData({
    username,
    fullName,
    profile,
  }: {
    username: string;
    fullName: string;
    profile: string;
  }) {
    setIsSaving(true);

    const user: CognitoUserExt = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
      profile: profile,
      name: fullName,
      preferred_username: username,
    });

    await API.graphql({
      authMode: "AMAZON_COGNITO_USER_POOLS",
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
  }

  return (
    <>
      <Box
        sx={{ width: "100%", height: "100vw", backgroundColor: "background" }}
      >
        <Head>
          <title>Profile</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Header user={user} signOut={signOut} />
          <div
            style={{
              paddingTop: "40px",
              maxWidth: "900px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Flex
              sx={{
                margin: "20px",
                flexDirection: ["column-reverse", "row", "row"],
                gap: "20px",
              }}
            >
              <Box sx={{ width: ["100%", "50%", "50%"] }}>
                <form
                  onSubmit={(event: any) => {
                    event.preventDefault();
                    const form = new FormData(event.target);

                    updateUserData({
                      username: form.get("username") as string,
                      profile: form.get("location") as string,
                      fullName: form.get("fullName") as string,
                    });
                    setWasSaved(true);
                  }}
                >
                  <Flex sx={{ flexDirection: "column", gap: "10px" }}>
                    <Box>
                      <Label htmlFor="fullName" variant="defaultLabel">
                        Name
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="Name"
                        defaultValue={user.attributes.name}
                        variant={"defaultInput"}
                      />
                    </Box>
                    <Box>
                      <Label htmlFor="username" variant="defaultLabel">
                        Username
                      </Label>
                      <Input
                        id="username"
                        name="username"
                        placeholder="Username"
                        defaultValue={user.attributes.preferred_username}
                        variant={"defaultInput"}
                      />
                    </Box>
                    <Box>
                      <Label htmlFor="location" variant="defaultLabel">
                        Location
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="Location"
                        defaultValue={user.attributes.profile}
                        variant={"defaultInput"}
                      />
                    </Box>
                    <Box sx={{ marginTop: "10px" }}>
                      <Button variant="primaryButton">
                        <Flex sx={{ gap: "10px" }}>
                          <Text as="span">Save</Text>
                          {isSaving && (
                            <Spinner
                              sx={{ size: "20px", color: "spinnerButton" }}
                            />
                          )}
                        </Flex>
                      </Button>
                    </Box>
                  </Flex>
                </form>
              </Box>
              <Box sx={{ width: ["100%", "50%", "50%"] }}>
                <Box
                  sx={{
                    marginX: "auto",
                    width: "200px",
                    height: "auto",
                    position: "relative",
                  }}
                >
                  {user.attributes.picture && (
                    <CldImage
                      width="400"
                      height="300"
                      src={user.attributes.picture}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        marginTop: "auto",
                        marginBottom: "auto",
                        borderRadius: "100%",
                      }}
                      // preserveTransformations
                      underlay={user.attributes.picture}
                      quality={90}
                      sizes="100vw"
                      alt="Description of my image"
                    />
                  )}
                  {!user.attributes.picture && (
                    <svg
                      fill="#8d8d8d"
                      width="100%"
                      height="100%"
                      viewBox="0 0 512 512"
                      id="_x30_1"
                    >
                      <path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M256,90  " />
                    </svg>
                  )}
                  <Flex sx={{ justifyContent: "center" }}>
                    <EditAvatar />
                  </Flex>
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
