import React from "react";
import { Flex, Button, Link as ThemeLink } from "theme-ui";

const SignInSignUp = () => {
  const handleExternalLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ): void => {
    e.preventDefault();
    window.open(
      location.protocol +
        "//platform." +
        (location.host.split(".")[1]
          ? location.host
              .split(".")
              .slice(1, location.host.split(".").length)
              .join(".")
          : location.host) +
        `${path}`
    );
  };

  return (
    <Flex sx={{ alignItems: "center", justifyContent: "right", gap: "10px" }}>
      <ThemeLink
        onClick={(e) => handleExternalLink(e, "/login")}
        href={`/login`}
        sx={{
          "&:hover": {
            color: "accent",
          },
          textDecoration: "none",
          color: "text",
        }}
      >
        <Button
          variant="primaryButton"
          sx={{
            backgroundColor: "unset",
            color: "text",
            "&:hover": { backgroundColor: "surface" },
            width: "fit-content",
            fontSize: ["17px", "14px", "14px"],
          }}
        >
          Sign In
        </Button>
      </ThemeLink>
      <ThemeLink
        href={`/register`}
        onClick={(e) => handleExternalLink(e, "/register")}
        sx={{
          textDecoration: "none",
        }}
      >
        <Button
          variant="primaryButton"
          sx={{
            // color: "red",
            // "&:hover": { backgroundColor: "surface" },
            width: "fit-content",
            // paddingX: "50px",
            fontSize: ["17px", "14px", "14px"],
          }}
        >
          Sign Up
        </Button>
      </ThemeLink>
    </Flex>
  );
};

export default SignInSignUp;
