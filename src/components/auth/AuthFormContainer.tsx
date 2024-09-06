import React from "react";
import { Box, Flex } from "theme-ui";

const AuthFormContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        borderColor: "border",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "5px",
        maxWidth: "400px",
        width: ["", "400px", "400px"],
        margin: "20px",
        padding: "20px",
      }}
    >
      {children}
    </Box>
  );
};

export default AuthFormContainer;
