import { Auth, API } from "aws-amplify";
import { Box } from "theme-ui";
import React from "react";
import { CldUploadButton } from "next-cloudinary";

import { updateUser } from "../graphql/mutations";
import { CloudinaryImage } from "./AddImage";
import { CognitoUserExt } from "../types/common";

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

export default EditAvatar;
