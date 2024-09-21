import React from "react";
import { Flex, MenuButton } from "theme-ui";

import UserProfileMenu from "./UserProfileMenu/UserProfileMenu";
import { EditorContext } from "../../posts/Editor/EditorContext";

const ProfileSection: React.FC = () => {
  const [profileOpen, setProfileOpen] = React.useState<boolean>(false);
  const { mobileMenu, setMobileMenu } = React.useContext(EditorContext);

  return (
    <Flex
      sx={{
        justifyContent: "end",
        borderRadius: "5px",
        backgroundColor: "backgroundLight",
        padding: "1px 1px 1px 1px",
      }}
      onClick={() => {
        setProfileOpen(true);
        setMobileMenu({ ...mobileMenu, display: false });
      }}
    >
      <MenuButton
        sx={{ marginY: "auto", cursor: "pointer" }}
        aria-label="Toggle Menu"
      />
      <UserProfileMenu
        setProfileOpen={setProfileOpen}
        profileOpen={profileOpen}
      />
    </Flex>
  );
};

export default ProfileSection;
