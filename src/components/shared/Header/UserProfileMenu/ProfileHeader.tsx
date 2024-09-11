import React from "react";
import { Box, Flex, Text, Close, ThemeUIStyleObject, Theme } from "theme-ui";
import { CldImage } from "next-cloudinary";

import AvatarIcon from "../../../icons/AvatarIcon";
// import { IUser } from "../../../../types/common";
import { cloudUrl } from "../../../../utils/cloudinary";
import { UserContext } from "../../../UserContext";

interface ProfileHeaderProps {
  onClose: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ onClose }) => {
  const { user } = React.useContext(UserContext);
  if (!user) {
    return <></>;
  }

  return (
    <Flex
      sx={
        {
          margin: ["10px", 0, 0],
          padding: "10px",
          borderBottomStyle: "solid",
          borderBottomWidth: "1px",
          borderBottomColor: "border",
        } as ThemeUIStyleObject<Theme>
      }
    >
      <Flex sx={{ gap: "10px", width: "100%" } as ThemeUIStyleObject<Theme>}>
        <Box
          sx={{ width: "40px", height: "40px" } as ThemeUIStyleObject<Theme>}
        >
          {user.attributes && user.attributes.picture ? (
            <CldImage
              width="400"
              height="400"
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
              alt="Profile Picture"
              config={{
                cloud: {
                  cloudName: cloudUrl,
                },
              }}
            />
          ) : (
            <AvatarIcon />
          )}
        </Box>
        <Flex sx={{ flexDirection: "column", gap: "5px" }}>
          <Text as="div" variant="profileMenuLink">
            {user.attributes.name}
          </Text>
          <Text
            as="div"
            sx={
              {
                lineHeight: "12px",
                fontWeight: 700,
              } as ThemeUIStyleObject<Theme>
            }
            variant="profileMenuLink"
          >
            {user.attributes.preferred_username}
          </Text>
        </Flex>
      </Flex>
      <Close
        data-testid="close-profile"
        onClick={onClose}
        sx={
          {
            display: ["inherit", "none", "none"],
            backgroundColor: "background",
            marginLeft: "auto",
          } as ThemeUIStyleObject<Theme>
        }
      />
    </Flex>
  );
};

export default ProfileHeader;
