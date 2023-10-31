import React from "react";
import {
  MenuButton,
  Box,
  Flex,
  Text,
  Switch,
  useColorMode,
  Close,
  Link,
} from "theme-ui";

import Logo from "./Logo";
import BlackBox from "../layout/BlackBox";
import { useUnits } from "../UnitProvider";

const HeaderPublic = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const ref = React.useRef<any>();
  const [mode, setMode] = useColorMode();
  const { toggleUnit, unitOfMeasure } = useUnits();

  return (
    <>
      {menuOpen && (
        <BlackBox noModal={true}>
          <Flex sx={{ marginRight: "auto" }}>
            <Box
              ref={ref}
              sx={{
                flexDirection: "column",
                width: "400px",
                height: "100%",
                backgroundColor: "background",
                animation: "fadeIn .2s;",
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              <Box sx={{ marginLeft: "auto" }}>
                <Flex
                  sx={{
                    width: "100%",
                    marginTop: "10px",
                    padding: "10px",
                    borderBottomStyle: "solid",
                    borderBottomWidth: "1px",
                    borderBottomColor: "divider",
                  }}
                >
                  <Box>
                    <Flex
                      sx={{
                        gap: "10px",
                        paddingLeft: "5px",
                        marginLeft: "5px",
                      }}
                    >
                      <Box sx={{ width: "30px", height: "auto" }}>
                        <Logo />
                      </Box>
                      <Link href="/" sx={{ textDecoration: "none" }}>
                        <Text
                          as="div"
                          sx={{
                            marginY: "auto",
                            fontSize: "22px",
                            fontWeight: 700,
                            color: "text",
                          }}
                        >
                          monopad
                        </Text>
                      </Link>
                    </Flex>
                  </Box>
                  <Close
                    onClick={() => setMenuOpen(false)}
                    sx={{ backgroundColor: "background", marginLeft: "auto" }}
                  />
                </Flex>
                <Box sx={{ padding: "10px" }}>
                  <Box
                    as="ul"
                    sx={{
                      listStyleType: "none",
                      li: {
                        padding: "5px",
                        margin: "5px",
                        fontWeight: 500,
                        fontSize: "16px",
                      },
                    }}
                  >
                    <Flex as="li">
                      <Flex sx={{ width: "100%", padding: "5px" }}>
                        <Text as="span">Dark Mode</Text>
                        <Box sx={{ marginLeft: "auto" }}>
                          <Switch
                            checked={mode === "dark" ? true : false}
                            onClick={(e) => {
                              const next = mode === "dark" ? "light" : "dark";
                              setMode(next);
                            }}
                          />
                        </Box>
                      </Flex>
                    </Flex>
                    <Flex as="li">
                      <Flex sx={{ width: "100%", padding: "5px" }}>
                        <Text as="span">
                          Units{" "}
                          <Text as="span" sx={{ color: "textMuted" }}>
                            imperial/metric
                          </Text>
                        </Text>
                        <Box sx={{ marginLeft: "auto" }}>
                          <Switch
                            checked={
                              unitOfMeasure !== "imperial" ? true : false
                            }
                            onClick={() => {
                              toggleUnit();
                            }}
                          />
                        </Box>
                      </Flex>
                    </Flex>
                    <Flex as="li">
                      <Link href="/login" sx={{ textDecoration: "none" }}>
                        <Text
                          as="div"
                          sx={{
                            marginY: "auto",
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "text",
                          }}
                        >
                          Sign In
                        </Text>
                      </Link>
                    </Flex>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Flex>
        </BlackBox>
      )}
      <Box as="header" sx={{ width: "100vw" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            padding: "10px",
            borderBottomWidth: "1px",
            borderBottomColor: "divider",
            borderBottomStyle: "solid",
            backgroundColor: "background",
            zIndex: 99,
          }}
        >
          <Flex sx={{ gap: "15px" }}>
            <MenuButton
              sx={{ marginY: "auto", border: "1px solid buttonBorderColor" }}
              aria-label="Toggle Menu"
              onClick={() => setMenuOpen(true)}
            />
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default HeaderPublic;
