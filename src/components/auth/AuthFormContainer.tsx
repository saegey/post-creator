import React from "react";
import { Box, Flex } from "theme-ui";

const AuthFormContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Flex
      sx={{
        borderColor: "border",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "5px",
        // maxWidth: ["calc(100% - 40px)", "400px", "400px"],
        width: ["calc(100%)", "400px", "400px"],
        marginY: "20px",
        padding: "20px",
        backgroundColor: "background",
      }}
    >
      {children}
    </Flex>
  );
};

export default AuthFormContainer;
