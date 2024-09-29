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
import ProfileIcon from "../../../icons/ProfileIcon";
import JournalIcon from "../../../icons/JournalIcon";
import DarkModeIcon from "../../../icons/DarkModeIcon";
import RulerIcon from "../../../icons/RulerIcon";
import DocsIcon from "../../../icons/DocsIcon";
import LogIcon from "../../../icons/LogIcon";
import SupportIcon from "../../../icons/SupportIcon";
import RoadIcon from "../../../icons/RoadIcon";
import LogoutIcon from "../../../icons/LogoutIcon";
import DropdownMenu from "./DropdownMenu";

interface UserProfileMenuProps {
  setProfileOpen: (arg: boolean) => void;
  profileOpen: boolean;
}

const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  setProfileOpen,
  profileOpen,
}) => {
  const [mode, setMode] = useColorMode();
  const { toggleUnit, unitOfMeasure } = useUnits();

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
    <DropdownMenu setProfileOpen={setProfileOpen} profileOpen={profileOpen}>
      <MenuItem href="/profile" icon={<ProfileIcon />}>
        Profile
      </MenuItem>
      <MenuItem href="/posts" icon={<JournalIcon />}>
        Posts
      </MenuItem>
      <Divider
        sx={{
          color: "border",
          marginY: "5px",
        }}
      />
      <ToggleSwitch
        label="Dark Mode"
        isChecked={mode === "dark"}
        onChange={() => setMode(mode === "dark" ? "light" : "dark")}
        icon={<DarkModeIcon />}
      />
      <ToggleSwitch
        label="Metric Units"
        // mutedText="imperial/metric"
        isChecked={unitOfMeasure !== "imperial"}
        onChange={toggleUnit}
        icon={<RulerIcon />}
      />
      <Divider sx={{ color: "border" } as ThemeUIStyleObject<Theme>} />
      <MenuItem
        icon={<DocsIcon />}
        href="https://monopad.mintlify.app"
        openNewWindow={true}
      >
        Docs
      </MenuItem>
      <MenuItem
        href="https://monopad.productlane.com/changelog"
        icon={<LogIcon />}
        openNewWindow={true}
      >
        Changelog
      </MenuItem>
      <MenuItem
        href="https://monopad.productlane.com/roadmap"
        icon={<SupportIcon />}
        openNewWindow={true}
      >
        Support
      </MenuItem>
      <MenuItem
        href="https://monopad.productlane.com/roadmap"
        icon={<RoadIcon />}
        openNewWindow={true}
      >
        Roadmap
      </MenuItem>
      <Divider sx={{ color: "border" } as ThemeUIStyleObject<Theme>} />
      <MenuItem href="/logout" icon={<LogoutIcon />}>
        Sign Out
      </MenuItem>
    </DropdownMenu>
  );
};

export default UserProfileMenu;
