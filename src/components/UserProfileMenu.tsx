import {
  Box,
  Flex,
  Close,
  Text,
  Link as ThemeLink,
  useColorMode,
  Switch,
} from "theme-ui";
import Link from "next/link";
import React from "react";
import { CldImage } from "next-cloudinary";

import AvatarIcon from "./icons/AvatarIcon";
import { useUnits } from "./UnitProvider";
import BlackBox from "./layout/BlackBox";
import { useViewport } from "./ViewportProvider";
import { CognitoUserExt } from "../types/common";
import { IUser } from "../../pages/_app";

interface UserProfileMenuType {
  setProfileOpen: (arg: boolean) => void;
  profileOpen: boolean;
  signOut?: () => void;
  user: IUser;
}

const UserProfileMenu = ({
  setProfileOpen,
  profileOpen,
  signOut,
  user,
}: UserProfileMenuType) => {
  const [mode, setMode] = useColorMode();
  const { toggleUnit, unitOfMeasure } = useUnits();
  const { width } = useViewport();

  React.useEffect(() => {
    if (profileOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [profileOpen]);

  if (!profileOpen) {
    return <></>;
  }

  return (
    <BlackBox
      onClick={(e) => {
        setProfileOpen(false);
        e.stopPropagation();
      }}
      noBackground={width > 640 ? true : false}
      noModal={true}
    >
      <Flex
        sx={{
          marginLeft: ["auto", 0, 0],
          position: "relative",
          flexGrow: 1,
          justifyContent: "end",
        }}
      >
        <Box
          sx={{
            flexDirection: "column",
            width: ["400px", "300px", "300px"],
            height: ["100%", "fit-content", "fit-content"],
            position: "relative",
            top: ["", "53px", "53px"],
            right: ["", "10px", "10px"],
            backgroundColor: "background",
            animation: "fadeIn .2s;",
            borderTopLeftRadius: [0, "10px", "10px"],
            borderBottomLeftRadius: [0, "10px", "10px"],
            borderTopRightRadius: [0, "10px", "10px"],
            borderBottomRightRadius: [0, "10px", "10px"],
            borderStyle: ["none", "solid", "solid"],
            borderColor: "divider",
            borderWidth: [0, "1px", "1px"],
            boxShadow:
              "0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)",
          }}
        >
          <Box sx={{ marginLeft: "auto" }}>
            <Flex
              sx={{
                // width: '100%',
                margin: ["10px", 0, 0],
                padding: "10px",
                borderBottomStyle: "solid",
                borderBottomWidth: "1px",
                borderBottomColor: "divider",
              }}
            >
              <Flex sx={{ gap: "10px", width: "100%" }}>
                <Flex
                  sx={{
                    height: ["100%", "fit-content", "fit-content"],
                    flexDirection: "column",
                  }}
                >
                  {user.attributes.picture && (
                    <Box sx={{ width: "40px", height: "40px" }}>
                      <CldImage
                        width="400"
                        height="300"
                        src={user.attributes.picture}
                        style={{
                          width: "100%",
                          height: "auto",
                          marginTop: "auto",
                          marginBottom: "auto",
                          borderRadius: "100%",
                        }}
                        quality={90}
                        sizes="(max-width: 480px) 100vw, 50vw"
                        alt="Description of my image"
                      />
                    </Box>
                  )}
                  {!user.attributes.picture && <AvatarIcon />}
                </Flex>
                <Box>
                  <Text
                    as="div"
                    sx={{ color: "text", fontSize: ["17px", "15px", "15px"] }}
                  >
                    {user.attributes.name}
                  </Text>
                  <Text
                    as="div"
                    sx={{
                      lineHeight: "12px",
                      fontWeight: 700,
                      color: "text",
                      fontSize: ["17px", "15px", "15px"],
                    }}
                  >
                    {user.attributes.preferred_username}
                  </Text>
                </Box>
              </Flex>
              <Close
                onClick={() => setProfileOpen(false)}
                sx={{
                  display: ["inherit", "none", "none"],
                  backgroundColor: "background",
                  marginLeft: "auto",
                }}
              />
            </Flex>
            <Box sx={{ padding: ["10px", 0, 0] }}>
              <Box
                as="ul"
                sx={{
                  listStyleType: "none",
                  li: {
                    padding: "5px",
                    margin: "5px",
                    fontWeight: 500,
                    fontSize: ["17px", "15px", "15px"],
                  },
                }}
              >
                <Flex as="li">
                  <ThemeLink
                    as={Link}
                    sx={{
                      "&:hover": {
                        backgroundColor: "menuItemBackgroundHoverColor",
                        borderRadius: "5px",
                      },
                      textDecoration: "none",
                      color: "text",
                      padding: "5px",
                      width: "100%",
                      fontSize: ["17px", "15px", "15px"],
                    }}
                    href={`/profile`}
                  >
                    Your Profile
                  </ThemeLink>
                </Flex>
                <Flex as="li">
                  <ThemeLink
                    as={Link}
                    sx={{
                      "&:hover": {
                        backgroundColor: "menuItemBackgroundHoverColor",
                        borderRadius: "5px",
                      },
                      textDecoration: "none",
                      color: "text",
                      padding: "5px",
                      width: "100%",
                      fontSize: ["17px", "15px", "15px"],
                    }}
                    href={`/posts`}
                  >
                    Your Posts
                  </ThemeLink>
                </Flex>
                <Flex as="li">
                  <ThemeLink
                    as={Link}
                    sx={{
                      "&:hover": {
                        backgroundColor: "menuItemBackgroundHoverColor",
                        borderRadius: "5px",
                      },
                      textDecoration: "none",
                      color: "text",
                      padding: "5px",
                      width: "100%",
                      fontSize: ["17px", "15px", "15px"],
                    }}
                    href={`/`}
                  >
                    Explore
                  </ThemeLink>
                </Flex>
                <Flex
                  as="li"
                  sx={{
                    borderTopColor: "divider",
                    borderTopStyle: "solid",
                    borderTopWidth: "1px",
                  }}
                >
                  <Flex
                    sx={{ width: "100%", padding: "5px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Text as="span" sx={{ fontSize: ["17px", "15px", "15px"] }}>
                      Dark Mode
                    </Text>
                    <Box sx={{ marginLeft: "auto" }}>
                      <Switch
                        checked={mode === "dark" ? true : false}
                        onChange={(e) => {
                          const next = mode === "dark" ? "light" : "dark";
                          setMode(next);
                        }}
                      />
                    </Box>
                  </Flex>
                </Flex>
                <Flex as="li">
                  <Flex
                    sx={{ width: "100%", padding: "5px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Text as="span" sx={{ fontSize: ["17px", "15px", "15px"] }}>
                      Units{" "}
                      <Text as="span" sx={{ color: "textMuted" }}>
                        imperial/metric
                      </Text>
                    </Text>
                    <Box sx={{ marginLeft: "auto" }}>
                      <Switch
                        checked={unitOfMeasure !== "imperial" ? true : false}
                        onChange={(e) => {
                          toggleUnit();
                        }}
                      />
                    </Box>
                  </Flex>
                </Flex>
                <Flex
                  as="li"
                  sx={{
                    borderTopColor: "divider",
                    borderTopStyle: "solid",
                    borderTopWidth: "1px",
                  }}
                >
                  <Text variant={"menuItem"}>Docs</Text>
                </Flex>
                <Flex as="li">
                  <Text as="span" variant={"menuItem"}>
                    Support
                  </Text>
                </Flex>
                <Flex
                  as="li"
                  sx={{
                    borderTopColor: "divider",
                    borderTopStyle: "solid",
                    borderTopWidth: "1px",
                  }}
                >
                  <ThemeLink
                    as={Link}
                    sx={{
                      "&:hover": {
                        backgroundColor: "menuItemBackgroundHoverColor",
                        borderRadius: "5px",
                      },
                      textDecoration: "none",
                      color: "text",
                      padding: "5px",
                      width: "100%",
                      fontSize: ["17px", "15px", "15px"],
                    }}
                    href={`/logout`}
                  >
                    Sign Out
                  </ThemeLink>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </BlackBox>
  );
};

export default UserProfileMenu;
