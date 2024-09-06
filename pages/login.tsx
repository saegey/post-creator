import React, { useState, useContext } from "react";
import { Flex, Link as ThemeLink, Text, Label, Box } from "theme-ui";
import Link from "next/link";
import Router from "next/router";

import AuthInput from "../src/components/auth/AuthInput";
import AuthButton from "../src/components/auth/AuthButton";
import { NotificationContext } from "../src/components/NotificationContext";
import { loginUser } from "../src/utils/authActions";
import EyeIcon from "../src/components/icons/EyeIcon";
import EyeHideIcon from "../src/components/icons/EyeHideIcon";
import AuthLink from "../src/components/auth/AuthLink";
import Head from "next/head";
import AuthFormContainer from "../src/components/auth/AuthFormContainer";
import LogoBlock from "../src/components/public/LogoBlock";
import FavIcon from "../src/components/shared/FavIcon";

const LoginPage: React.FC = () => {
  const { setNotification } = useContext(NotificationContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = new FormData(event.target as HTMLFormElement);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      await loginUser(email, password);
      Router.push("/");
    } catch (error: any) {
      handleLoginError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginError = (error: { code: string }) => {
    switch (error.code) {
      case "UserNotFoundException":
        setNotification({ message: "User not found", type: "Error" });
        break;
      case "NotAuthorizedException":
        setNotification({
          message: "Email and/or password invalid.",
          type: "Error",
        });
        break;
      case "NetworkError":
        setNotification({ message: "Network Error", type: "Error" });
        break;
      default:
        console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <FavIcon />
      </Head>
      <Flex
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: ["fit-content", "100dvh", "100dvh"],
          overflow: ["scroll", "", ""],
          backgroundColor: "background",
        }}
      >
        <Flex sx={{ justifyContent: "center" }}>
          <LogoBlock />
        </Flex>
        <AuthFormContainer>
          <form onSubmit={handleSubmit}>
            <Flex
              sx={{
                flexDirection: "column",
                marginBottom: "10px",
                gap: "30px",
              }}
            >
              <AuthInput
                id="email"
                label="Email"
                type="email"
                name="email"
                required
              />
              <Box>
                <AuthInput
                  label="Password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                />
                <Box>
                  <Flex
                    sx={{
                      justifyContent: "right",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <ThemeLink
                      as={Link}
                      href="/reset"
                      sx={{
                        fontSize: "13px",
                        textDecoration: "none",
                        color: "text",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Forgot Password?
                    </ThemeLink>
                  </Flex>
                </Box>
              </Box>
              <Flex sx={{ justifyContent: "right" }}>
                <AuthButton
                  type="submit"
                  disabled={isLoading}
                  id="submit-login"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </AuthButton>
              </Flex>
            </Flex>
          </form>
        </AuthFormContainer>
        <AuthLink
          text={"Need an account?"}
          linkText={"Sign Up"}
          href="/register"
        />
      </Flex>
    </>
  );
};

export default LoginPage;
