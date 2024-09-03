import React from "react";
import { Flex, Button, Input, Label } from "theme-ui";

import ReCAPTCHAComponent from "./ReCAPTCHAComponent";

type RegisterFormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isRobot: boolean;
  setIsRobot: (value: boolean) => void;
};

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  isLoading,
  isRobot,
  setIsRobot,
}) => {
  return (
    <form onSubmit={onSubmit}>
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
          <Label htmlFor="password" variant="defaultLabel">
            Password
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
          <Input id="name" variant="defaultInput" name="name" required />
        </Flex>
        <Flex sx={{ flexDirection: "column" }}>
          <Label htmlFor="username" variant="defaultLabel">
            Username
          </Label>
          <Input
            id="username"
            variant="defaultInput"
            name="username"
            required
          />
        </Flex>
        <ReCAPTCHAComponent setIsRobot={setIsRobot} />
        <Button
          type="submit"
          variant="primaryButton"
          disabled={isRobot || isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </Flex>
    </form>
  );
};

export default RegisterForm;
