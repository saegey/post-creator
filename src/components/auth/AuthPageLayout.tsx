import React from "react";
import { Box, Flex } from "theme-ui";
import LogoBlock from "../public/LogoBlock";

const AuthPageLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Flex
      sx={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: ["fit-content", "100vh", "100vh"],
        backgroundColor: "loginBackground",
      }}
    >
      <Flex sx={{ justifyContent: "center" }}>
        <LogoBlock />
      </Flex>
      <Box
        sx={{
          borderColor: "loginBorder",
          borderWidth: "1px",
          borderStyle: "solid",
          borderRadius: "5px",
          maxWidth: "400px",
          width: ["calc(100% - 40px)", "400px", "400px"],
          padding: "20px",
        }}
      >
        {children}
      </Box>
    </Flex>
  );
};

export default AuthPageLayout;
