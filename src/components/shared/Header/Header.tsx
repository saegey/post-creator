import React from "react";
import { Box, Flex, ThemeUIStyleObject, Theme } from "theme-ui";

import { IUser } from "../../../types/common";
import ProfileSection from "./ProfileSection";
import SettingsSection from "./SettingsSection";
import { usePost } from "../../PostContext";

type HeaderLayoutProps = {
  user: IUser;
};

const Header: React.FC<HeaderLayoutProps> = ({ user }) => {
  // useStickyHeader();
  const { id } = usePost();

  return (
    <Box
      id="header"
      as="header"
      sx={
        {
          width: "100vw",
          // width: "100%",
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
        <ProfileSection user={user} />

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
          <SettingsSection />
        </Flex>

        {/* <pre>hola</pre> */}
      </Box>
    </Box>
  );
};

export default Header;
