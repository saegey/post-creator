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
import Link from "next/link";
import Router from "next/router";

const LoginPage: React.FC = () => {
  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = new FormData(event.target as HTMLFormElement);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      const authUser = await Auth.signIn(email, password);
      console.log("User logged in:", JSON.stringify(authUser));
      // window.location.href = `/`;
      Router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginUser(event).then(() => console.log("done"));
  };

  return (
    <Flex sx={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ maxWidth: "400px", width: "400px", margin: "20px" }}>
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
            <Button type="submit" variant="primaryButton">
              Login
            </Button>
            <ThemeLink
              as={Link}
              href="/register"
              sx={{
                textDecoration: "none",
                color: "text",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Create an account
            </ThemeLink>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};
export default LoginPage;
