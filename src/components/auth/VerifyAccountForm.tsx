import React from "react";
import { Flex, Button, Input, Label } from "theme-ui";

type VerifyAccountFormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

const VerifyAccountForm: React.FC<VerifyAccountFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  return (
    <form onSubmit={onSubmit} style={{ width: "100%" }}>
      <Flex sx={{ flexDirection: "column", gap: "15px" }}>
        <Flex sx={{ flexDirection: "column" }}>
          <Label htmlFor="email" variant="defaultLabel">
            Email Verify Code
          </Label>
          <Input id="code" variant="defaultInput" name="code" required />
        </Flex>
        <Flex sx={{ justifyContent: "end" }}>
          <Button type="submit" variant="primaryButton">
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default VerifyAccountForm;
