import { Label, Input, Box, Flex, Button, Spinner, Text } from "theme-ui";
import React from "react";
import { CldImage } from "next-cloudinary";
import Router from "next/router";
import { Auth, API } from "aws-amplify";

import Header from "../components/Header";
import EditAvatar from "./EditAvatar";
import { IUser } from "../../pages/_app";
import { updateUser } from "../graphql/mutations";

const EditProfile = ({ user }: { user?: IUser }) => {
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

    const cUser: IUser = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(cUser, {
      profile: profile,
      name: fullName,
      preferred_username: username,
    });

    await API.graphql({
      authMode: "AMAZON_COGNITO_USER_POOLS",
      query: updateUser,
      variables: {
        input: {
          id: cUser.attributes.sub,
          fullName: fullName,
          username: username,
        },
      },
    });

    setIsSaving(false);
  }

  React.useEffect(() => {
    if (!user) {
      Router.push("/login");
    }
  }, [user]);

  if (!user) {
    return <></>;
  }

  return (
    <main>
      <Header user={user} />
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
  );
};

export default EditProfile;
