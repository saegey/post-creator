import React from "react";
import { Auth } from "aws-amplify";
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Label,
  Text,
  Link as ThemeLink,
} from "theme-ui";
import Link from "next/link";
import Router from "next/router";
import { NotificationContext } from "../src/components/NotificationContext";
import Logo from "../src/components/shared/Logo";
import EyeIcon from "../src/components/icons/EyeIcon";
import EyeHideIcon from "../src/components/icons/EyeHideIcon";

const LoginPage: React.FC = () => {
  const { setNotification } = React.useContext(NotificationContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = new FormData(event.target as HTMLFormElement);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const authUser = await Auth.signIn(email, password);
    console.log("User logged in:", JSON.stringify(authUser));
    Router.push("/");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    loginUser(event)
      .catch((err: { code: string; name: string }) => {
        if (err.code === "UserNotFoundException") {
          setNotification({ message: "User not found", type: "Error" });
        }
        if (err.code === "NotAuthorizedException") {
          setNotification({
            message: "Email and/or password invalid.",
            type: "Error",
          });
        }

        if (err.code === "NetworkError") {
          setNotification({
            message: "Network Error",
            type: "Error",
          });
        }

        console.log(JSON.stringify(err));
      })
      .then(() => setIsLoading(false));
  };

  return (
    <Flex sx={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ maxWidth: "400px", width: "400px", margin: "20px" }}>
        <form onSubmit={handleSubmit}>
          <Flex sx={{ flexDirection: "column", gap: "15px" }}>
            <Flex sx={{ justifyContent: "center" }}>
              <Box sx={{ width: "80px", height: "80px" }}>
                <Logo />
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
                Sign in to Monopad
              </Text>
            </Flex>
            <Box
              sx={{
                borderColor: "inputBackgroundColor",
                borderWidth: "1px",
                borderStyle: "solid",
                borderRadius: "5px",
                padding: "20px",
              }}
            >
              <Flex sx={{ flexDirection: "column", marginBottom: "20px" }}>
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
              <Flex sx={{ flexDirection: "column", marginBottom: "20px" }}>
                <Flex>
                  <Label htmlFor="password" variant="defaultLabel">
                    Password
                  </Label>
                  <Flex sx={{ flexGrow: 1, justifyContent: "right" }}>
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
                </Flex>
                <Flex>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    variant="defaultInput"
                    name="password"
                    sx={{
                      borderTopRightRadius: "0px",
                      borderBottomRightRadius: "0px",
                    }}
                    // value={user.password}
                    // onChange={handleInputChange}
                    required
                  />
                  <Flex
                    sx={{
                      paddingX: "10px",
                      backgroundColor: "inputBackgroundColor",
                      borderTopRightRadius: "5px",
                      borderBottomRightRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Box
                      sx={{
                        width: "24px",
                        height: "100%",
                        alignSelf: "center",
                        placeSelf: "end",
                        // gridArea: "1/1",
                        // marginRight: "10px",
                      }}
                    >
                      {showPassword ? <EyeHideIcon /> : <EyeIcon />}
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
              <Flex>
                <Button
                  id="submit-login"
                  type="submit"
                  variant="primaryButton"
                  sx={{ width: "100%" }}
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in ..." : "Login"}
                </Button>
              </Flex>
            </Box>
            <Box
              sx={{
                borderColor: "inputBackgroundColor",
                borderWidth: "1px",
                borderStyle: "solid",
                // border: "1px solid red",
                padding: "20px",
                borderRadius: "5px",
              }}
            >
              {/* <Flex sx={{ gap: "20px" }}> */}
              <Text>New to Monopad? </Text>
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
              {/* </Flex> */}
            </Box>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};
export default LoginPage;
