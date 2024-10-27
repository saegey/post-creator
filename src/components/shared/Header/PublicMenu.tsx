import React from "react";
import {
  Divider,
  Flex,
  MenuButton,
  useColorMode,
  Link as ThemeLink,
} from "theme-ui";
import Link from "next/link";

import { EditorContext } from "../../posts/Editor/EditorContext";
import DropdownMenu from "./UserProfileMenu/DropdownMenu";
import ToggleSwitch from "./UserProfileMenu/ToggleSwitch";
import DarkModeIcon from "../../icons/DarkModeIcon";
import RulerIcon from "../../icons/RulerIcon";
import { useUnits } from "../../UnitProvider";
import MenuItem from "./UserProfileMenu/MenuItem";
import RoadIcon from "../../icons/RoadIcon";
import SupportIcon from "../../icons/SupportIcon";
import LogIcon from "../../icons/LogIcon";
import DocsIcon from "../../icons/DocsIcon";
import Button from "../Button";

const PublicMenu: React.FC = () => {
  const [profileOpen, setProfileOpen] = React.useState<boolean>(false);
  const { mobileMenu, setMobileMenu } = React.useContext(EditorContext);
  const [mode, setMode] = useColorMode();
  const { toggleUnit, unitOfMeasure } = useUnits();

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
      <DropdownMenu setProfileOpen={setProfileOpen} profileOpen={profileOpen}>
        <Flex sx={{ gap: "10px", paddingBottom: "5px" }}>
          <ThemeLink
            as={Link}
            href="/login"
            sx={{ width: "50%", textDecoration: "none", height: "100%" }}
          >
            <Button variant="primaryButton" sx={{ width: "100%" }}>
              Sign In
            </Button>
          </ThemeLink>
          <ThemeLink
            as={Link}
            href="/register"
            sx={{ width: "50%", textDecoration: "none" }}
          >
            <Button
              variant="secondaryButton"
              sx={{ width: "100%", height: "100%" }}
            >
              Sign Up
            </Button>
          </ThemeLink>
        </Flex>
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
        <Divider sx={{ color: "border" }} />
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
      </DropdownMenu>
    </Flex>
  );
};

export default PublicMenu;
