import { Box, Flex, Grid, Text } from "theme-ui";
import React from "react";

import CaretDown from "../../icons/CaretDown";
// import AddTimeZones from "./AddTimeZones";
import AddImage from "./AddImage";
import { EditorContext } from "./EditorContext";
import AddText from "./AddText";
import AddPowerCurve from "./AddPowerCurve";
import AddActivityOverview from "./AddActivityOverview";
import AddStravaLink from "./AddStravaLink";
import AddRWGPS from "./AddRWGPS";
import AddRaceResults from "./AddRaceResults";
import AddRouteOverview from "./AddRouteOverview";

const MobileMenu = () => {
  const { mobileMenu, setMobileMenu } = React.useContext(EditorContext);

  React.useEffect(() => {
    if (mobileMenu.isFullScreen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenu.isFullScreen]);

  if (!mobileMenu.display) {
    return <></>;
  }

  return (
    <>
      {mobileMenu.isFullScreen && (
        <Flex
          sx={{
            position: "fixed",
            top: `0px`,
            left: "0px",
            backgroundColor: "background",
            width: "100%",
            height: "100dvh",
            zIndex: "301",
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.3)",
            flexDirection: "column",
          }}
        >
          <Grid
            columns={3}
            sx={{
              width: "calc(100vw)",
              paddingX: "15px",
              paddingY: "15px",
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
              borderBottomColor: "border",
              position: "sticky",
            }}
          >
            <Box></Box>
            <Flex sx={{ justifyContent: "center" }}>
              <Text sx={{ fontWeight: "700" }}>Insert Block</Text>
            </Flex>
            <Flex sx={{ justifyContent: "right" }}>
              <Text
                onClick={() =>
                  setMobileMenu({ ...mobileMenu, isFullScreen: false })
                }
              >
                Cancel
              </Text>
            </Flex>
          </Grid>
          <Flex sx={{ flexDirection: "column" }}>
            <Box
              sx={{
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                borderBottomColor: "border",
              }}
            >
              <AddText />
            </Box>
            <Box
              sx={{
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                borderBottomColor: "border",
              }}
            >
              <AddImage />
            </Box>
            <Box
              sx={{
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                borderBottomColor: "border",
              }}
            >
              <AddPowerCurve />
            </Box>
            <Box
              sx={{
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                borderBottomColor: "border",
              }}
            >
              <AddActivityOverview />
            </Box>
            {/* <Box
              sx={{
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                borderBottomColor: "border",
              }}
            >
              <AddTimeZones path={mobileMenu.path} />
            </Box> */}
            <Box
              sx={{
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                borderBottomColor: "border",
              }}
            >
              <AddStravaLink />
            </Box>
            <Box
              sx={{
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                borderBottomColor: "border",
              }}
            >
              <AddRWGPS />
            </Box>
            <Box
              sx={{
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                borderBottomColor: "border",
              }}
            >
              <AddRouteOverview />
            </Box>
            <Box
              sx={{
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                borderBottomColor: "border",
              }}
            >
              <AddRaceResults />
            </Box>
          </Flex>
        </Flex>
      )}
      <Flex
        sx={{
          position: "absolute",
          top: `${mobileMenu.top - 60}px`,
          left: "10px",
          border: "1px solid #ccc",
          backgroundColor: "background",
          // width: "calc(100% - 20px)",
          zIndex: "300",
          borderRadius: "5px",
          boxShadow: "0 3px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Flex
          sx={{
            alignItems: "center",
            borderRightWidth: "1px",
            borderRightColor: "border",
            borderRightStyle: "solid",
            padding: "8px",
          }}
          onClick={() => {
            setMobileMenu({ ...mobileMenu, isFullScreen: true });
          }}
        >
          <Text sx={{ fontSize: "24px", lineHeight: "24px" }}>+</Text>
          <Box sx={{ width: "20px", height: "20px" }}>
            <CaretDown />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default MobileMenu;
