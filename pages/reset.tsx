import React, { useState } from "react";
import { Text, Flex, Link as ThemeLink } from "theme-ui";
import Link from "next/link";
import Router from "next/router";

import AuthInput from "../src/components/auth/AuthInput";
import AuthButton from "../src/components/auth/AuthButton";
import { resetPassword, requestPasswordReset } from "../src/utils/authActions";
import ReCAPTCHAComponent from "../src/components/auth/ReCAPTCHAComponent";
import Head from "next/head";
import LogoBlock from "../src/components/public/LogoBlock";
import AuthFormContainer from "../src/components/auth/AuthFormContainer";
import AuthLink from "../src/components/auth/AuthLink";

const Reset: React.FC = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isRobot, setIsRobot] = useState(true);

  const handleRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const email = form.get("email") as string;

    try {
      await requestPasswordReset(email);
      setIsSubmit(true);
    } catch (error) {
      console.error("Error requesting password reset:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const email = form.get("email") as string;
    const code = form.get("code") as string;
    const newPassword = form.get("password") as string;

    try {
      await resetPassword(email, code, newPassword);
      Router.push("/");
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Forgot Password?</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>M</text></svg>"
        />
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
          {!isSubmit ? (
            <form onSubmit={handleRequest}>
              <Flex sx={{ flexDirection: "column" }}>
                <Flex sx={{ flexDirection: "column", gap: "15px" }}>
                  <Text as="h1" sx={{ fontSize: "16px" }}>
                    Forgot Password?
                  </Text>
                  <AuthInput
                    id="email"
                    label="Email"
                    type="email"
                    name="email"
                    required
                  />
                  <ReCAPTCHAComponent setIsRobot={setIsRobot} />
                  <AuthButton type="submit" disabled={isRobot}>
                    Submit
                  </AuthButton>
                </Flex>
              </Flex>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <Text
                as="h1"
                sx={{
                  textAlign: "center",
                  fontSize: "24px",
                  marginBottom: "20px",
                }}
              >
                Set New Password
              </Text>
              <AuthInput
                id="email"
                label="Email"
                type="email"
                name="email"
                required
              />
              <AuthInput
                id="code"
                label="Code"
                type="text"
                name="code"
                required
              />
              <AuthInput
                id="password"
                label="New Password"
                type="password"
                name="password"
                required
              />
              <AuthInput
                id="password2"
                label="Confirm New Password"
                type="password"
                name="password2"
                required
              />
              <AuthButton type="submit">Submit</AuthButton>
              <Flex
                sx={{
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Text>
                  Back to{" "}
                  <ThemeLink
                    as={Link}
                    href="/login"
                    sx={{
                      textDecoration: "none",
                      color: "text",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Sign in →
                  </ThemeLink>
                </Text>
              </Flex>
            </form>
          )}
        </AuthFormContainer>
        <AuthLink
          text={"Need to sign in?"}
          linkText={"Sign In"}
          href="/login"
        />
      </Flex>
    </>
  );
};

export default Reset;
