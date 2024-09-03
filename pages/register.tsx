import React from "react";
import { Flex } from "theme-ui";
import Router from "next/router";
import Head from "next/head";
import { Auth } from "aws-amplify";

import { NotificationContext } from "../src/components/NotificationContext";
import LogoBlock from "../src/components/public/LogoBlock";
import AuthFormContainer from "../src/components/auth/AuthFormContainer";
import RegisterForm from "../src/components/auth/RegisterForm";
import VerifyAccountForm from "../src/components/auth/VerifyAccountForm";
import AuthLink from "../src/components/auth/AuthLink";

export interface ErrorType {
  message: string;
  code: string;
}

const RegisterPage: React.FC = () => {
  const [username, setUsername] = React.useState<string>();
  const [isRobot, setIsRobot] = React.useState<boolean>(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const { setNotification } = React.useContext(NotificationContext);

  const verifyUser = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!username) return;
    const form = new FormData(event.target as HTMLFormElement);
    const code = form.get("code") as string;

    try {
      const result = await Auth.confirmSignUp(username, code);
      Router.push("/login");
    } catch (error) {
      handleError(error);
    }
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
      setIsLoading(false);
      return;
    }

    try {
      const result = await Auth.signUp({
        username: email,
        password,
        attributes: {
          name,
          preferred_username: username,
          zoneinfo: "imperial",
        },
      });

      setUsername(email);
      setNotification({ type: "Success", message: "Registered successfully!" });
      return result;
    } catch (error: any) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (error: ErrorType) => {
    if (error.code === "InvalidPasswordException") {
      setNotification({ type: "Error", message: error.message });
    }
    if (error.code === "Network error") {
      setNotification({ type: "Error", message: "Network Error" });
    }
    if (error.code === "UsernameExistsException") {
      setNotification({ type: "Error", message: error.message });
    }
    console.error("Error:", error);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerUser(event);
  };

  const verifyAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    verifyUser(event);
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
          backgroundColor: "loginBackground",
        }}
      >
        <Flex sx={{ justifyContent: "center" }}>
          <LogoBlock />
        </Flex>
        <AuthFormContainer>
          {!username ? (
            <RegisterForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              isRobot={isRobot}
              setIsRobot={setIsRobot}
            />
          ) : (
            <VerifyAccountForm onSubmit={verifyAccount} isLoading={isLoading} />
          )}
        </AuthFormContainer>
        <AuthLink />
      </Flex>
    </>
  );
};

export default RegisterPage;
