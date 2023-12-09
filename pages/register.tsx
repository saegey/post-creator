import React from "react";
import { Auth } from "aws-amplify";
import { Box, Button, Flex, Input, Label, Text } from "theme-ui";
import Router from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
import { useThemeUI } from "theme-ui";
import Head from "next/head";

type User = {
  email: string;
  password: string;
  name: string;
};

const RegisterPage: React.FC = () => {
  const [username, setUsername] = React.useState<string>();
  const [isRobot, setIsRobot] = React.useState<boolean>(true);
  const { colorMode } = useThemeUI();
  // console.log(context.colorMode);

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setUser({ ...user, [event.target.name]: event.target.value });
  // };

  const verifyUser = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!username) {
      return;
    }
    const form = new FormData(event.target as HTMLFormElement);
    const code = form.get("code") as string;

    try {
      const result = await Auth.confirmSignUp(username, code);
      Router.push("/login");
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = new FormData(event.target as HTMLFormElement);
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const username = form.get("username") as string;
    const name = form.get("name") as string;

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
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerUser(event).then(() => console.log("done"));
  };

  const verifyAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    verifyUser(event).then(() => console.log("done"));
  };

  return (
    <>
      <Head>
        <title>Register</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>M</text></svg>"
        />
      </Head>
      <Flex
        sx={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Box sx={{ maxWidth: "400px", width: "400px", margin: "20px" }}>
          {!username && (
            <form onSubmit={handleSubmit}>
              <Flex sx={{ flexDirection: "column", gap: "15px" }}>
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
                    monopad
                  </Text>
                </Flex>
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
                <ReCAPTCHA
                  sitekey="6LdW_CUpAAAAAOC--lA01wOnW1UA3RlZyc_LgX_0"
                  onChange={() => setIsRobot(false)}
                  theme={colorMode === "dark" ? "dark" : "light"}
                />

                <Button
                  type="submit"
                  variant="primaryButton"
                  disabled={isRobot}
                >
                  Register
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
                  Verify
                </Button>
              </Flex>
            </form>
          )}
        </Box>
      </Flex>
    </>
  );
};
export default RegisterPage;
