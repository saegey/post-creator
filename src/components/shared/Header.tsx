import React from "react";
import { MenuButton, Box, Flex, Text } from "theme-ui";
import { CldImage } from "next-cloudinary";

import AvatarIcon from "../icons/AvatarIcon";
import UserProfileMenu from "./UserProfileMenu";
import { IUser } from "../../types/common";
import { cloudUrl } from "../../utils/cloudinary";
import Logo from "./Logo";
import LogoBlock from "../public/LogoBlock";

const Header = ({ user }: { user: IUser }) => {
  const [profileOpen, setProfileOpen] = React.useState(false);

  return (
    <>
      {user && (
        <Box>
          <UserProfileMenu
            setProfileOpen={setProfileOpen}
            profileOpen={profileOpen}
            user={user}
          />
        </Box>
      )}

      <Box as="header" sx={{ width: "100vw" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            padding: "10px",
            borderBottomWidth: "1px",
            borderBottomColor: "divider",
            borderBottomStyle: "solid",
            backgroundColor: "background",
            zIndex: 99,
          }}
        >
          <Flex
            sx={{
              marginLeft: "10px",
              gap: "10px",
              flexGrow: 1,
              alignItems: "center",
            }}
          >
            <LogoBlock />
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
            </Text>
          </Flex>
          <Flex
            sx={{
              justifyContent: "end",
              backgroundColor: ["none", "divider", "divider"],
              borderRadius: "100px",
              padding: "3px 10px 3px 10px",
            }}
            onClick={() => setProfileOpen(true)}
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
                <CldImage
                  priority={true}
                  width="400"
                  height="300"
                  src={user.attributes.picture}
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
                  config={{
                    cloud: {
                      cloudName: cloudUrl ? cloudUrl : "dprifih4o",
                    },
                  }}
                />
              </Box>
            )}
            {!user || (!user.attributes.picture && <AvatarIcon />)}
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Header;
