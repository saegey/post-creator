import { Box, Button, Flex, Input, Label, Text } from "theme-ui";
import { Auth } from "aws-amplify";
import React from "react";
import Router from "next/router";

const Reset: React.FC = () => {
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false);

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
      <Box sx={{ maxWidth: "400px", width: "400px", margin: "20px" }}>
        {!isSubmit && (
          <form onSubmit={handleRequest}>
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
                  Reset Password
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
                  required
                />
              </Flex>
              <Button id="submit-login" type="submit" variant="primaryButton">
                Submit
              </Button>
            </Flex>
          </form>
        )}
        {isSubmit && (
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
                  Reset Password
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
              <Button id="submit-login" type="submit" variant="primaryButton">
                Submit
              </Button>
            </Flex>
          </form>
        )}
      </Box>
    </Flex>
  );
};

export default Reset;
