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
    return (
      <>
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
      </>
    );
  }

  return (
    <Flex
      sx={{
        marginY: ["10px", 0, 0],
        paddingY: "10px",
        borderBottomStyle: "solid",
        borderBottomWidth: "1px",
        borderBottomColor: "border",
      }}
    >
      <Flex sx={{ gap: "10px", width: "100%" }}>
        <Box sx={{ width: "32px", height: "32px" }}>
          {user.attributes && user.attributes.picture ? (
            <CldImage
              width="200"
              height="200"
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
            <AvatarIcon sx={{ width: "100%", height: "100%", padding: 0 }} />
          )}
        </Box>
        <Flex sx={{ flexDirection: "column", gap: "5px" }}>
          <Text
            as="div"
            variant="profileMenuLink"
            sx={{ fontSize: ["16px", "14px", "14px"] }}
          >
            {user.attributes.name}
          </Text>
          <Text
            as="div"
            sx={{
              lineHeight: "12px",
              fontWeight: 700,
              fontSize: ["16px", "14px", "14px"],
            }}
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
