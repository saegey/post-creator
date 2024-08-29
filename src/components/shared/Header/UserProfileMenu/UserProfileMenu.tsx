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
import { IUser } from "../../../../types/common";
import ToggleSwitch from "./ToggleSwitch";
import ProfileHeader from "./ProfileHeader";
import MenuItem from "./MenuItem";

interface UserProfileMenuProps {
  setProfileOpen: (arg: boolean) => void;
  profileOpen: boolean;
  user: IUser;
}

const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  setProfileOpen,
  profileOpen,
  user,
}) => {
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
              width: ["400px", "300px", "300px"],
              height: ["100%", "fit-content", "fit-content"],
              position: "relative",
              top: ["", "53px", "53px"],
              left: ["", "10px", "10px"],
              backgroundColor: "background",
              animation: "fadeIn .2s;",
              borderRadius: [0, "10px", "10px"],
              borderStyle: ["none", "solid", "solid"],
              borderColor: "divider",
              borderWidth: [0, "1px", "1px"],
              boxShadow:
                "0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)",
            } as ThemeUIStyleObject<Theme>
          }
        >
          <ProfileHeader user={user} onClose={() => setProfileOpen(false)} />
          <Box sx={{ padding: ["10px", 0, 0] } as ThemeUIStyleObject<Theme>}>
            <Box
              as="ul"
              sx={
                {
                  listStyleType: "none",
                } as ThemeUIStyleObject<Theme>
              }
            >
              <MenuItem href="/profile">Profile</MenuItem>
              <MenuItem href="/posts">My Posts</MenuItem>
              <MenuItem href="/">Explore</MenuItem>
              <Divider sx={{ color: "divider" } as ThemeUIStyleObject<Theme>} />
              <ToggleSwitch
                label="Dark Mode"
                isChecked={mode === "dark"}
                onChange={() => setMode(mode === "dark" ? "light" : "dark")}
              />
              <ToggleSwitch
                label="Units"
                mutedText="imperial/metric"
                isChecked={unitOfMeasure !== "imperial"}
                onChange={toggleUnit}
              />
              <Divider sx={{ color: "divider" } as ThemeUIStyleObject<Theme>} />
              <MenuItem href="https://monopad.gitbook.io/docs/">Docs</MenuItem>
              <MenuItem href="http://monopad.app/support">Support</MenuItem>
              <MenuItem href="https://monopad.productlane.com/roadmap">
                Roadmap
              </MenuItem>
              <MenuItem href="/logout">Sign Out</MenuItem>
            </Box>
          </Box>
        </Box>
      </Flex>
    </BlackBox>
  );
};

export default UserProfileMenu;
