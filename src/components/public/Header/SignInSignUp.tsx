import React from "react";
import { Flex, Button, Link as ThemeLink } from "theme-ui";

const SignInSignUp = () => {
  const handleExternalLink = (e, path) => {
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
        "/register"
    );
  };

  return (
    <Flex sx={{ alignItems: "center", justifyContent: "right", gap: "10px" }}>
      <ThemeLink
        onClick={(e) => handleExternalLink(e, "/login")}
        href={`/login`}
        sx={{
          "&:hover": {
            color: "gray",
          },
          textDecoration: "none",
          color: "text",
          fontSize: ["17px", "15px", "15px"],
        }}
      >
        Sign In
      </ThemeLink>
      <ThemeLink
        href={`/register`}
        onClick={(e) => handleExternalLink(e, "/register")}
      >
        <Button variant="primaryButton">Sign Up</Button>
      </ThemeLink>
    </Flex>
  );
};

export default SignInSignUp;
