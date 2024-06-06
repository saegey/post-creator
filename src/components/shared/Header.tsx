import React from "react";
import {
  MenuButton,
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Spinner,
} from "theme-ui";
// import { CldImage } from "next-cloudinary";
import { API } from "aws-amplify";
import { getCldImageUrl } from "next-cloudinary";
import Image from "next/image";

import AvatarIcon from "../icons/AvatarIcon";
import UserProfileMenu from "./UserProfileMenu";
import { IUser } from "../../types/common";
import { cloudUrl } from "../../utils/cloudinary";
import Logo from "./Logo";
import LogoBlock from "../public/LogoBlock";
import SettingsIcon from "../posts/Editor/PostMenu/buttons/SettingsIcon";
import { EditorContext } from "../posts/Editor/EditorContext";
import PostSettings from "../posts/Editor/PostSettings";
import { PostContext } from "../PostContext";

const Header = ({ user }: { user: IUser }) => {
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [isPublishing, setIsPublishing] = React.useState(false);

  const {
    setIsImageModalOpen,
    setIsSettingsModalOpen,
    isSettingsModalOpen,
    setIsPublishedConfirmationOpen,
    isSavingPost,
    savingStatus,
    setMobileMenu,
    mobileMenu,
  } = React.useContext(EditorContext);
  const { id } = React.useContext(PostContext);
  const imageUrl = getCldImageUrl(
    {
      src: user.attributes.picture,
      width: 100, // Resize the original file to a smaller size
    },
    {
      cloud: {
        cloudName: cloudUrl,
      },
    }
  );

  const publishPost = async () => {
    setIsPublishing(true);

    const response = await API.post("api12660653", "/post/publish", {
      response: true,
      body: {
        postId: id,
        origin: `${origin}/`,
      },
    });
    setIsPublishing(false);
    setIsPublishedConfirmationOpen(true);
  };

  return (
    <>
      {isSettingsModalOpen && <PostSettings />}
      {user && (
        <Box>
          <UserProfileMenu
            setProfileOpen={setProfileOpen}
            profileOpen={profileOpen}
            user={user}
          />
        </Box>
      )}

      <Box
        as="header"
        sx={{ width: "100vw", position: "sticky", top: 0, zIndex: 5 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            padding: "10px",
            borderBottomWidth: "1px",
            borderBottomColor: "divider",
            borderBottomStyle: "solid",
            backgroundColor: "background",
            // zIndex: 99,
          }}
        >
          <Flex
            sx={{
              justifyContent: "end",
              backgroundColor: ["none", "divider", "divider"],
              borderRadius: "100px",
              padding: "3px 10px 3px 10px",
            }}
            onClick={() => {
              setProfileOpen(true);
              setMobileMenu({ ...mobileMenu, display: false });
            }}
          >
            <MenuButton
              sx={{ marginY: "auto", border: "1px solid buttonBorderColor" }}
              aria-label="Toggle Menu"
            />
            {user && user.attributes && user.attributes.picture && (
              <Box
                sx={{
                  height: "35px",
                  width: "35px",
                  cursor: "pointer",
                  display: ["none", "inherit", "inherit"],
                }}
              >
                <Image
                  src={imageUrl}
                  alt="Uploaded"
                  width={400}
                  height={300}
                  // layout="responsive"
                  style={{
                    width: "100%",
                    height: "100%",
                    marginTop: "auto",
                    marginBottom: "auto",
                    borderRadius: "100%",
                  }}
                  priority={true}
                />
                {/* <CldImage
                  priority={true}
                  width="400"
                  height="300"
                  src={user.attributes.picture}
                  // src={
                  //   typeof window !== "undefined"
                  //     ? user.attributes.picture
                  //     : `https://res.cloudinary.com/${cloudUrl}/image/upload/${user.attributes.picture}.jpg`
                  // }
                  style={{
                    width: "100%",
                    height: "100%",
                    marginTop: "auto",
                    marginBottom: "auto",
                    borderRadius: "100%",
                  }}
                  quality={90}
                  sizes="100vw"
                  alt="Description of my image"
                  onClick={() => setProfileOpen(true)}
                  // config={{
                  //   cloud: {
                  //     cloudName: cloudUrl ? cloudUrl : "dprifih4o",
                  //   },
                  // }}
                /> */}
              </Box>
            )}
            {!user || (!user.attributes.picture && <AvatarIcon />)}
          </Flex>
          <Flex
            sx={{
              justifyContent: "end",
              // marginLeft: "10px",
              gap: "10px",
              flexGrow: 1,
              alignItems: "center",
            }}
          >
            {/* <LogoBlock />
            <Text
              sx={{
                fontSize: "18px",
                color: "text",
                paddingLeft: "10px",
                fontWeight: 300,
                letterSpacing: "0px",
                borderLeftColor: "text",
                borderLeftStyle: "solid",
                borderLeftWidth: "1px",
              }}
            >
              Race Journal
            </Text> */}
            {id && (
              <>
                {isSavingPost && (
                  <Box>
                    <Text>{savingStatus}</Text>
                  </Box>
                )}
                {/* <Button
                  variant="primaryButton"
                  type="button"
                  onClick={publishPost}
                  sx={{ height: ["32px", "30px", "30px"], lineHeight: "14px" }}
                >
                  <Flex sx={{ gap: "10px" }}>
                    <Text as="span">Publish</Text>
                    {isPublishing && (
                      <Spinner sx={{ size: "20px", color: "spinnerButton" }} />
                    )}
                  </Flex>
                </Button> */}
                <Box
                  sx={{
                    marginY: "auto",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    setIsImageModalOpen(false);
                    setIsSettingsModalOpen(true);
                    setMobileMenu({
                      display: false,
                      top: 0,
                      left: 0,
                      isFullScreen: false,
                      path: [0, 0],
                    });
                  }}
                >
                  <IconButton
                    aria-label="Open settings"
                    variant="iconButton"
                    type="button"
                    id="settings-button"
                  >
                    <SettingsIcon />
                  </IconButton>
                </Box>
              </>
            )}
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Header;
