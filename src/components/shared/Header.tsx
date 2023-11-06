import React from "react";
import { MenuButton, Box, Flex } from "theme-ui";
import { CldImage } from "next-cloudinary";

import AvatarIcon from "../icons/AvatarIcon";
import UserProfileMenu from "./UserProfileMenu";
import { IUser } from "../../types/common";

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
              gap: "15px",
              flexGrow: 1,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "32px",
                height: "32px",
                backgroundColor: "black",
                padding: "5px",
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 37 32"
                fill="none"
                xmlns="http://www.w3x.org/2000/svg"
              >
                <path
                  d="M0.96 32V31.52L1.92 31.184C3.008 30.832 3.552 29.92 3.552 28.448V3.872C3.552 3.232 3.472 2.72 3.312 2.336C3.184 1.952 2.816 1.632 2.208 1.376L0.96 0.799998V0.319999H10.224L19.104 23.552L27.456 0.319999H36.912V0.799998L36.144 1.088C35.536 1.312 35.12 1.632 34.896 2.048C34.672 2.432 34.56 2.944 34.56 3.584V28.688C34.56 29.328 34.64 29.824 34.8 30.176C34.96 30.528 35.344 30.832 35.952 31.088L36.912 31.52V32H24.96V31.52L25.968 31.088C26.576 30.832 26.96 30.528 27.12 30.176C27.28 29.824 27.36 29.328 27.36 28.688V17.888L27.456 4.16L17.424 32H15.024L4.56 4.496L4.704 16.448V28.544C4.704 29.248 4.8 29.824 4.992 30.272C5.216 30.688 5.632 30.992 6.24 31.184L7.296 31.52V32H0.96Z"
                  fill="white"
                />
              </svg>
            </Box>
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
