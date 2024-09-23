import React from "react";
import { Box, Flex, ThemeUIStyleObject, Theme, MenuButton } from "theme-ui";

import { IUser } from "../../../types/common";
import ProfileSection from "./ProfileSection";

type HeaderLayoutProps = {
  user?: IUser;
  right?: React.ReactNode;
};

const Header: React.FC<HeaderLayoutProps> = ({ user, right }) => {
  return (
    <Box
      id="header"
      as="header"
      sx={
        {
          width: "100vw",
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "background",
        } as ThemeUIStyleObject<Theme>
      }
    >
      <Box
        sx={
          {
            display: "flex",
            flexDirection: "row",
            padding: "10px",
            borderBottomWidth: "1px",
            borderBottomColor: "border",
            borderBottomStyle: "solid",
          } as ThemeUIStyleObject<Theme>
        }
      >
        {user ? (
          <ProfileSection />
        ) : (
          <MenuButton
            sx={{ marginY: "auto", cursor: "pointer" }}
            aria-label="Toggle Menu"
          />
        )}

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
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
