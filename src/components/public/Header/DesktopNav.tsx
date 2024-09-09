import React from "react";
import { Flex, NavLink } from "theme-ui";

import CaretDown from "../../icons/CaretDown";
import MenuDropdown from "./MenuDropdown";

const DesktopNav = () => {
  const [isProductMenuOpen, setIsProductMenuOpen] = React.useState(false);
  const [isResourcesMenuOpen, setIsResourcesMenuOpen] = React.useState(false);

  const productMenuItems = [
    {
      title: "Journal",
      description: "Capture the experience of your competition",
      href: "/journal",
    },
    {
      title: "Race Calendar",
      description: "Publish your schedule and coordinate with fellow racers",
      soon: true,
      disabled: true,
    },
  ];

  const resourcesMenuItems = [
    {
      title: "Blog",
      description: "Posts by the Monopad team",
      href: "/blog",
    },
    {
      title: "Changelog",
      description: "Updates and new features",
      href: "https://monopad.productlane.com/changelog",
    },
    {
      title: "Docs",
      description: "Become a Monopad expert",
      href: "https://monopad.gitbook.io/docs-1/v/1/",
    },
    {
      title: "API",
      description: "Build custom workflows",
      disabled: true,
      soon: true,
    },
  ];

  return (
    <Flex as="nav" sx={{ gap: "10px" }}>
      <NavLink
        sx={{
          fontWeight: "400",
          cursor: "pointer",
          justifyContent: "center",
          alignContent: "center",
        }}
        p={2}
        onMouseEnter={() => setIsProductMenuOpen(true)}
        onMouseLeave={() => setIsProductMenuOpen(false)}
      >
        <Flex sx={{ gap: "2px", alignItems: "center" }}>
          Product
          <CaretDown
            sx={{
              width: "30px",
              transform: isProductMenuOpen ? "rotate(180deg)" : "none",
              transitionDuration: isProductMenuOpen ? "500ms" : "unset",
            }}
          />
        </Flex>
        <MenuDropdown
          isOpen={isProductMenuOpen}
          items={productMenuItems}
          onItemClick={() => setIsProductMenuOpen(false)}
        />
      </NavLink>
      <NavLink
        sx={{
          fontWeight: "400",
          cursor: "pointer",
          justifyContent: "center",
          alignContent: "center",
        }}
        p={2}
        onMouseEnter={() => setIsResourcesMenuOpen(true)}
        onMouseLeave={() => setIsResourcesMenuOpen(false)}
      >
        <Flex sx={{ gap: "2px", alignItems: "center" }}>
          Resources
          <CaretDown
            sx={{
              width: "30px",
              transform: isResourcesMenuOpen ? "rotate(180deg)" : "none",
              transitionDuration: isResourcesMenuOpen ? "500ms" : "unset",
            }}
          />
        </Flex>
        <MenuDropdown
          isOpen={isResourcesMenuOpen}
          items={resourcesMenuItems}
          onItemClick={() => setIsResourcesMenuOpen(false)}
        />
      </NavLink>
    </Flex>
  );
};

export default DesktopNav;
