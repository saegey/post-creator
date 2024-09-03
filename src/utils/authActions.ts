import { Auth } from "aws-amplify";

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await Auth.signIn(email, password);
    return user;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (
  email: string,
  password: string,
  attributes: object
) => {
  try {
    const result = await Auth.signUp({
      username: email,
      password,
      attributes,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const verifyUser = async (username: string, code: string) => {
  try {
    const result = await Auth.confirmSignUp(username, code);
    return result;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (
  email: string,
  code: string,
  newPassword: string
) => {
  try {
    const result = await Auth.forgotPasswordSubmit(email, code, newPassword);
    return result;
  } catch (error) {
    throw error;
  }
};

export const requestPasswordReset = async (email: string) => {
  try {
    const result = await Auth.forgotPassword(email);
    return result;
  } catch (error) {
    throw error;
  }
};
