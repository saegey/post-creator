import React from "react";
import {
  Box,
  Flex,
  ThemeUIStyleObject,
  Theme,
  useColorMode,
  Divider,
} from "theme-ui";

import BlackBox from "../../../layout/BlackBox";
import { useUnits } from "../../../UnitProvider";
import { useViewport } from "../../../ViewportProvider";
import ToggleSwitch from "./ToggleSwitch";
import ProfileHeader from "./ProfileHeader";
import MenuItem from "./MenuItem";

interface UserProfileMenuProps {
  setProfileOpen: (arg: boolean) => void;
  profileOpen: boolean;
  children: React.ReactNode;
}

const DropdownMenu: React.FC<UserProfileMenuProps> = ({
  setProfileOpen,
  profileOpen,
  children,
}) => {
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
    return null;
  }

  return (
    <BlackBox
      onClick={(e) => {
        setProfileOpen(false);
        e.stopPropagation();
      }}
      noBackground={width > 640}
      noModal
    >
      <Flex
        sx={
          {
            marginLeft: ["auto", 0, 0],
            position: "relative",
            flexGrow: 1,
          } as ThemeUIStyleObject<Theme>
        }
      >
        <Box
          sx={
            {
              flexDirection: "column",
              width: ["100%", "300px", "300px"],
              height: ["100%", "fit-content", "fit-content"],
              position: "absolute",
              top: ["", "53px", "53px"],
              right: ["", "10px", "10px"],
            } as ThemeUIStyleObject<Theme>
          }
          variant="boxes.menuItem"
        >
          <ProfileHeader onClose={() => setProfileOpen(false)} />
          <Box sx={{ paddingY: ["10px", 0, 0] } as ThemeUIStyleObject<Theme>}>
            <Box
              as="ul"
              sx={
                {
                  marginTop: "5px",
                  listStyleType: "none",
                  li: {
                    paddingY: "1px",
                  },
                } as ThemeUIStyleObject<Theme>
              }
            >
              {children}
            </Box>
          </Box>
        </Box>
      </Flex>
    </BlackBox>
  );
};

export default DropdownMenu;
