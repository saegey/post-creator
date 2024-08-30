import React from "react";
import { Auth } from "aws-amplify";
import {
  Box,
  Button,
  Flex,
  Input,
  Label,
  Text,
  Link as ThemeLink,
} from "theme-ui";
import Router from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
import { useThemeUI } from "theme-ui";
import Head from "next/head";
import Logo from "../src/components/shared/Logo";
import Link from "next/link";
import { NotificationContext } from "../src/components/NotificationContext";
import LogoBlock from "../src/components/public/LogoBlock";

export interface ErrorType {
  message: string;
  code: string;
}
const RegisterPage: React.FC = () => {
  const [username, setUsername] = React.useState<string>();
  const [isRobot, setIsRobot] = React.useState<boolean>(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const { colorMode } = useThemeUI();
  const { setNotification } = React.useContext(NotificationContext);

  const verifyUser = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!username) {
      return;
    }
    const form = new FormData(event.target as HTMLFormElement);
    const code = form.get("code") as string;

    const result = await Auth.confirmSignUp(username, code);
    Router.push("/login");
  };

  const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    const form = new FormData(event.target as HTMLFormElement);
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const password2 = form.get("password2") as string;
    const username = form.get("username") as string;
    const name = form.get("name") as string;

    if (password !== password2) {
      setNotification({ type: "Error", message: "Passwords don't match" });
    }

    try {
      const result = await Auth.signUp({
        username: email,
        password: password,
        // email: email,
        // if custom attribute is added
        attributes: {
          // "custom:role": "user",
          name: name,
          preferred_username: username,
          zoneinfo: "imperial",
        },
      });

      // Auth.confirmSignUp()
      console.log("User registered:", result);
      setUsername(email);
      return result;
    } catch (error: any) {
      if (error.code === "InvalidPasswordException") {
        setNotification({ type: "Error", message: error.message });
        console.log("Invaid password");
      }
      if (error.code === "Network error") {
        setNotification({ type: "Error", message: "Network Error" });
      }
      if (error.code === "UsernameExistsException") {
        setNotification({ type: "Error", message: error.message });
      }
      console.error("Error registering user:", error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerUser(event)
      .catch((err) => JSON.stringify(err))
      .then(() => {
        console.log("done");
        setIsLoading(false);
      });
  };

  const verifyAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    verifyUser(event)
      .catch((err) => {
        if (err.code === "CodeMismatchException") {
          setNotification({ type: "Error", message: "Code is not valid" });
        }
        console.log(JSON.stringify(err));
      })
      .then(() => {
        console.log("done");
        setIsLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>Create account</title>
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
        }}
      >
        <Flex sx={{ justifyContent: "center" }}>
          <Flex sx={{ justifyContent: "center" }}>
            <LogoBlock />
          </Flex>
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
          {!username && (
            <form onSubmit={handleSubmit}>
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
                    // value={user.email}
                    // onChange={handleInputChange}
                    required
                  />
                </Flex>
                <Flex sx={{ flexDirection: "column" }}>
                  <Label htmlFor="password" variant="defaultLabel">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    variant="defaultInput"
                    name="password"
                    // value={user.password}
                    // onChange={handleInputChange}
                    required
                  />
                </Flex>
                <Flex sx={{ flexDirection: "column" }}>
                  <Label htmlFor="password" variant="defaultLabel">
                    Confirm Password
                  </Label>
                  <Input
                    id="password2"
                    type="password"
                    variant="defaultInput"
                    name="password2"
                    required
                  />
                </Flex>
                <Flex sx={{ flexDirection: "column" }}>
                  <Label htmlFor="name" variant="defaultLabel">
                    Name
                  </Label>
                  <Input
                    id="name"
                    variant="defaultInput"
                    name="name"
                    // value={user.name}
                    // onChange={handleInputChange}
                    required
                  />
                </Flex>
                <Flex sx={{ flexDirection: "column" }}>
                  <Label htmlFor="username" variant="defaultLabel">
                    Username
                  </Label>
                  <Input
                    id="username"
                    variant="defaultInput"
                    name="username"
                    // value={user.name}
                    // onChange={handleInputChange}
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
                  type="submit"
                  variant="primaryButton"
                  disabled={isRobot || isLoading}
                >
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </Flex>
            </form>
          )}
          {username && (
            <form onSubmit={verifyAccount}>
              <Flex sx={{ flexDirection: "column", gap: "15px" }}>
                <Flex sx={{ flexDirection: "column" }}>
                  <Label htmlFor="email" variant="defaultLabel">
                    Email Verify Code
                  </Label>

                  <Input
                    id="code"
                    variant="defaultInput"
                    // type="code"/
                    name="code"
                    // value={user.email}
                    // onChange={handleInputChange}
                    required
                  />
                </Flex>
                <Button type="submit" variant="primaryButton">
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>
              </Flex>
            </form>
          )}
        </Box>
        <Box
          sx={{
            borderColor: "inputBackgroundColor",
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "5px",
            maxWidth: "400px",
            width: ["calc(100% - 40px)", "400px", "400px"],
            margin: "20px",
            padding: "20px",
          }}
        >
          Already have an account?{" "}
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
        </Box>
      </Flex>
    </>
  );
};
export default RegisterPage;
