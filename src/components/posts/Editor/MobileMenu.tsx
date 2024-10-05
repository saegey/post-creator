import React, { useContext, useEffect, ReactNode } from "react";
import { Box, Flex, Text } from "theme-ui";

import CaretDown from "../../icons/CaretDown";
import AddImage from "./AddImage";
import AddText from "./AddText";
import AddPowerCurve from "./AddPowerCurve";
import AddActivityOverview from "./AddActivityOverview";
import AddRWGPS from "./AddRWGPS";
import AddRaceResults from "./AddRaceResults";
import AddRouteOverview from "./AddRouteOverview";
import { EditorContext } from "./EditorContext";
import AddVideo from "./AddVideo";

// Reusable Menu Item Component
const MenuItem = ({ children }: { children: ReactNode }) => (
  <Box
    sx={{
      borderBottom: "1px solid",
      borderBottomColor: "border",
      paddingY: "5px",
      paddingX: "5px",
    }}
  >
    {children}
  </Box>
);

// Array of Menu Components
const menuItems = [
  { component: <AddText />, key: "add-text" },
  { component: <AddImage />, key: "add-image" },
  { component: <AddVideo />, key: "add-video" },
  { component: <AddPowerCurve />, key: "add-power-curve" },
  { component: <AddActivityOverview />, key: "add-activity-overview" },
  { component: <AddRWGPS />, key: "add-rw-gps" },
  { component: <AddRouteOverview />, key: "add-route-overview" },
  { component: <AddRaceResults />, key: "add-race-results" },
];

const MobileMenu = () => {
  const { mobileMenu, setMobileMenu } = useContext(EditorContext);

  const wrapperRef = React.useRef<HTMLElement | undefined>(undefined);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      setMobileMenu({ ...mobileMenu, display: false });
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenu.isFullScreen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenu.isFullScreen]);

  if (!mobileMenu.display) {
    return null;
  }

  return (
    <Box className="activity-menu" ref={wrapperRef}>
      {mobileMenu.isFullScreen && (
        <Flex
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            backgroundColor: "background",
            width: "100%",
            height: "100dvh",
            zIndex: 301,
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.3)",
            flexDirection: "column",
          }}
        >
          <Flex
            sx={{
              paddingX: "10px",
              paddingY: "15px",
              borderBottom: "1px solid",
              borderBottomColor: "border",
              backgroundColor: "background",
              alignItems: "center",
            }}
          >
            {/* Left side (empty for spacing) */}
            <Box sx={{ flex: 1 }} />

            {/* Center section (fits content) */}
            <Box sx={{ flexShrink: 0 }}>
              <Text sx={{ fontWeight: "bold", fontSize: "15px" }}>
                Insert Block
              </Text>
            </Box>

            {/* Right side (cancel button) */}
            <Box sx={{ flex: 1, textAlign: "right" }}>
              <Text
                onClick={() =>
                  setMobileMenu({
                    ...mobileMenu,
                    isFullScreen: false,
                    display: false,
                  })
                }
                sx={{ cursor: "pointer", fontSize: "15px" }}
              >
                Cancel
              </Text>
            </Box>
          </Flex>
          <Flex sx={{ flexDirection: "column", overflowY: "auto", flex: 1 }}>
            {menuItems.map(({ component, key }) => (
              <MenuItem key={key}>{component}</MenuItem>
            ))}
          </Flex>
        </Flex>
      )}
      <Flex
        sx={{
          position: "absolute",
          top: `${mobileMenu.top - 120}px`,
          left: 10,
          border: "1px solid #ccc",
          backgroundColor: "background",
          zIndex: 60,
          borderRadius: 5,
          boxShadow: "0 3px 8px rgba(0, 0, 0, 0.3)",
        }}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setMobileMenu({ ...mobileMenu, isFullScreen: true });
        }}
      >
        <Flex
          sx={{
            alignItems: "center",
            borderRight: "1px solid",
            borderRightColor: "border",
            padding: 2,
            cursor: "pointer",
            justifyItems: "center",
          }}
        >
          <Text sx={{ fontSize: "24px", lineHeight: "24px" }}>+</Text>
          <Box sx={{ width: "20px", height: "20px" }}>
            <CaretDown />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default MobileMenu;
