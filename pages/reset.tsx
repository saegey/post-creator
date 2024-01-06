import {
  Box,
  Button,
  Flex,
  Input,
  Label,
  Text,
  useThemeUI,
  Link as ThemeLink,
} from "theme-ui";
import { Auth } from "aws-amplify";
import React from "react";
import Router from "next/router";
import ReCAPTCHA from "react-google-recaptcha";

import Logo from "../src/components/shared/Logo";
import Link from "next/link";

const Reset: React.FC = () => {
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false);
  const [isRobot, setIsRobot] = React.useState<boolean>(true);
  const { colorMode } = useThemeUI();

  const resetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = new FormData(event.target as HTMLFormElement);
    const email = form.get("email") as string;
    const code = form.get("code") as string;
    const newPassword = form.get("password") as string;

    try {
      const res = await Auth.forgotPasswordSubmit(email, code, newPassword);
      console.log("User reset:", JSON.stringify(res));
      Router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const requestReset = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = new FormData(event.target as HTMLFormElement);
    const email = form.get("email") as string;

    try {
      const res = await Auth.forgotPassword(email);
      console.log("User request:", JSON.stringify(res));
      setIsSubmit(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetPassword(event).then(() => console.log("done"));
  };

  const handleRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    requestReset(event).then(() => console.log("done"));
  };

  return (
    <Flex sx={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
      <Box
        sx={{
          maxWidth: "400px",
          width: ["", "400px", "400px"],
          margin: "20px",
        }}
      >
        {!isSubmit && (
          <>
            <Flex sx={{ justifyContent: "center" }}>
              <Box
                sx={{
                  width: ["40px", "50px", "80px"],
                  height: ["40px", "50px", "80px"],
                }}
              >
                <Logo />
              </Box>
            </Flex>
            <Flex
              sx={{
                justifyContent: "center",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Text
                as="div"
                sx={{
                  display: "flex",
                  alignSelf: "center",
                  // justifyContent: "center",
                  fontSize: "30px",
                  fontWeight: 500,
                }}
              >
                Reset Password
              </Text>
              <Text sx={{ display: "flex", textAlign: "center" }}>
                Enter the email address you used when you joined and we’ll send
                you instructions to reset your password.
              </Text>
            </Flex>
            <form onSubmit={handleRequest}>
              <Box
                sx={{
                  borderColor: "inputBackgroundColor",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderRadius: "5px",
                  padding: "20px",
                  marginY: "20px",
                }}
              >
                <Flex sx={{ flexDirection: "column", gap: "15px" }}>
                  <Flex sx={{ flexDirection: "column" }}>
                    <Label htmlFor="email" variant="defaultLabel">
                      Email
                    </Label>

                    <Input
                      id="email"
                      variant="defaultInput"
                      type="email"
                      name="email"
                      required
                    />
                  </Flex>
                  <Flex sx={{ justifyContent: "center" }}>
                    <ReCAPTCHA
                      sitekey="6LdW_CUpAAAAAOC--lA01wOnW1UA3RlZyc_LgX_0"
                      onChange={() => setIsRobot(false)}
                      theme={colorMode === "dark" ? "dark" : "light"}
                    />
                  </Flex>
                  <Button
                    id="submit-login"
                    type="submit"
                    variant="primaryButton"
                    disabled={isRobot}
                  >
                    Submit
                  </Button>
                </Flex>
              </Box>
              <Flex sx={{ justifyContent: "center" }}>
                <Text>
                  Back to{" "}
                  <ThemeLink
                    as={Link}
                    href="/login"
                    sx={{
                      // fontSize: "13px",
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
          </>
        )}
        {isSubmit && (
          <form onSubmit={handleSubmit}>
            <Flex sx={{ flexDirection: "column", gap: "15px" }}>
              <Flex sx={{ justifyContent: "center" }}>
                <Box
                  sx={{
                    width: ["50px", "50px", "80px"],
                    height: ["50px", "50px", "80px"],
                  }}
                >
                  <Logo />1
                </Box>
              </Flex>
              <Flex
                sx={{
                  justifyContent: "center",
                }}
              >
                <Text
                  as="div"
                  sx={{
                    // justifyContent: "center",
                    fontSize: "30px",
                    fontWeight: 500,
                  }}
                >
                  Set New Password
                </Text>
              </Flex>
              <Box
                sx={{
                  borderColor: "inputBackgroundColor",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderRadius: "5px",
                  maxWidth: "400px",
                  width: ["", "400px", "400px"],
                  margin: "20px",
                  padding: "20px",
                }}
              >
                <Flex sx={{ flexDirection: "column", gap: "15px" }}>
                  <Flex sx={{ flexDirection: "column" }}>
                    <Label htmlFor="email" variant="defaultLabel">
                      Email
                    </Label>

                    <Input
                      id="email"
                      variant="defaultInput"
                      type="email"
                      name="email"
                      required
                    />
                  </Flex>
                  <Flex sx={{ flexDirection: "column" }}>
                    <Label htmlFor="code" variant="defaultLabel">
                      Code
                    </Label>
                    <Input
                      id="code"
                      // type="code"
                      variant="defaultInput"
                      name="code"
                      required
                    />
                  </Flex>
                  <Flex sx={{ flexDirection: "column" }}>
                    <Label htmlFor="password" variant="defaultLabel">
                      New Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      variant="defaultInput"
                      name="password"
                      required
                    />
                  </Flex>
                  <Flex sx={{ flexDirection: "column" }}>
                    <Label htmlFor="password2" variant="defaultLabel">
                      Confirm New Password
                    </Label>
                    <Input
                      id="password2"
                      type="password"
                      variant="defaultInput"
                      name="password2"
                      required
                    />
                  </Flex>
                  <Button
                    id="submit-login"
                    type="submit"
                    variant="primaryButton"
                  >
                    Submit
                  </Button>
                </Flex>
              </Box>
              <Box>
                <Text>
                  Back to
                  <ThemeLink
                    as={Link}
                    href="/login"
                    sx={{
                      // fontSize: "13px",
                      textDecoration: "none",
                      color: "text",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Sign in →
                  </ThemeLink>
                </Text>
              </Box>
            </Flex>
          </form>
        )}
      </Box>
    </Flex>
  );
};

export default Reset;
