import React from "react";
import { Box, Flex, Grid } from "theme-ui";

import LogoBlock from "../LogoBlock";
import DesktopNav from "./DesktopNav";
import SignInSignUp from "./SignInSignUp";
import MenuToggle from "./MenuToggle";
import MobileNav from "./MobileNav";

const PublicHeader = () => {
  const [isProductMenuOpen, setIsProductMenuOpen] = React.useState(false);
  const [isResourcesMenuOpen, setIsResourcesMenuOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  return (
    <Box sx={{ zIndex: 10, position: "sticky", top: 0 }}>
      {/* Desktop Navigation */}
      <Flex
        sx={{
          width: "100%",
          justifyContent: "center",
          display: ["none", "none", "flex"],
          borderBottomColor: "border",
          borderBottomStyle: "solid",
          borderBottomWidth: "1px",
          backgroundColor: "background",
        }}
      >
        <Grid
          gap={2}
          columns={"1fr auto 1fr"}
          sx={{
            gridAutoColumns: "1fr",
            alignContent: "center",
            justifyContent: "space-between",
            alignItems: "center",
            // marginTop: "5px",
            marginX: "20px",
            width: "calc(100% - 40px)",
            maxWidth: "1280px",
          }}
        >
          <LogoBlock />
          <DesktopNav />
          <SignInSignUp />
        </Grid>
      </Flex>

      {/* Mobile Navigation */}
      <Flex
        sx={{
          paddingX: "16px",
          paddingY: "8px",
          position: "sticky",
          top: 0,
          backgroundColor: "background",
          zIndex: 99,
          display: ["flex", "flex", "none"],
        }}
      >
        <LogoBlock />
        <MenuToggle isMenuOpen={isMenuOpen} toggleMenu={setIsMenuOpen} />
      </Flex>

      <MobileNav
        isMenuOpen={isMenuOpen}
        isProductMenuOpen={isProductMenuOpen}
        isResourcesMenuOpen={isResourcesMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setIsProductMenuOpen={setIsProductMenuOpen}
        setIsResourcesMenuOpen={setIsResourcesMenuOpen}
      />
    </Box>
  );
};

export default PublicHeader;
