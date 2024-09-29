import React from "react";
import { Box, Flex, ThemeUIStyleObject, Theme, MenuButton } from "theme-ui";

import { IUser } from "../../../types/common";
import ProfileSection from "./ProfileSection";
import Logo from "../../icons/Logo";
import PublicMenu from "./PublicMenu";

type HeaderLayoutProps = {
  user?: IUser;
  right?: React.ReactNode;
};

const Header: React.FC<HeaderLayoutProps> = ({ user, right }) => {
  return (
    <Box
      id="header"
      as="header"
      sx={{
        width: "100vw",
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: "background",
      }}
    >
      <Flex
        sx={{
          flexDirection: "row",
          padding: "10px",
          borderBottomWidth: "1px",
          borderBottomColor: "border",
          borderBottomStyle: "solid",
          justifyContent: "center",
        }}
      >
        <Flex
          sx={{
            display: "inline-block",
            width: "fit-content",
            height: "fit-content",
            justifyContent: "center",
            paddingTop: "5px",
          }}
        >
          <Logo
            sx={{
              width: ["100px", "120px", "120px"],
            }}
          />
        </Flex>
        <Flex
          sx={
            {
              justifyContent: "end",
              gap: "10px",
              flexGrow: 1,
              alignItems: "center",
            } as ThemeUIStyleObject<Theme>
          }
        >
          {right}
          {user ? <ProfileSection /> : <PublicMenu />}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
