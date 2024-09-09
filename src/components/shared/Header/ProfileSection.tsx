import React from "react";
import { Box, Flex, MenuButton, ThemeUIStyleObject, Theme } from "theme-ui";
import Image from "next/image";
import { getCldImageUrl } from "next-cloudinary";

import AvatarIcon from "../../icons/AvatarIcon";
import UserProfileMenu from "./UserProfileMenu/UserProfileMenu";
import { IUser } from "../../../types/common";
import { cloudUrl } from "../../../utils/cloudinary";
import { EditorContext } from "../../posts/Editor/EditorContext";
import { lighten } from "@theme-ui/color";

type ProfileSectionProps = {
  user: IUser;
};

const ProfileSection: React.FC<ProfileSectionProps> = ({
  user,
}: {
  user: IUser;
}) => {
  const [profileOpen, setProfileOpen] = React.useState<boolean>(false);
  const { mobileMenu, setMobileMenu } = React.useContext(EditorContext);
  // const imageUrl = getCldImageUrl(
  //   {
  //     src: user.attributes.picture,
  //     width: 100,
  //   },
  //   {
  //     cloud: {
  //       cloudName: cloudUrl,
  //     },
  //   }
  // );

  return (
    <Flex
      sx={
        {
          justifyContent: "end",
          borderRadius: "5px",
          backgroundColor: lighten("background", 0.05),
          padding: "1px 1px 1px 1px",
        } as ThemeUIStyleObject<Theme>
      }
      onClick={() => {
        setProfileOpen(true);
        setMobileMenu({ ...mobileMenu, display: false });
      }}
    >
      <MenuButton
        sx={{ marginY: "auto", cursor: "pointer" } as ThemeUIStyleObject<Theme>}
        aria-label="Toggle Menu"
      />
      {/* {user.attributes.picture ? (
        <Box
          sx={
            {
              height: "35px",
              width: "35px",
              cursor: "pointer",
              display: ["none", "inherit", "inherit"],
            } as ThemeUIStyleObject<Theme>
          }
        >
          <Image
            src={imageUrl}
            alt="Uploaded"
            width={400}
            height={300}
            style={{
              width: "100%",
              height: "100%",
              marginTop: "auto",
              marginBottom: "auto",
              borderRadius: "100%",
            }}
            priority
          />
        </Box>
      ) : (
        <AvatarIcon />
      )} */}
      <UserProfileMenu
        setProfileOpen={setProfileOpen}
        profileOpen={profileOpen}
        user={user}
      />
    </Flex>
  );
};

export default ProfileSection;
