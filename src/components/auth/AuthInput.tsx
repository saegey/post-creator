import React from "react";
import { Box, Input, Label } from "theme-ui";

type AuthInputProps = {
  id: string;
  label: string;
  type: string;
  name: string;
  [x: string]: any;
};

const AuthInput: React.FC<AuthInputProps> = ({
  id,
  label,
  type,
  name,
  ...props
}) => {
  return (
    <Box sx={{ marginBottom: "20px" }}>
      <Label htmlFor={id} variant="defaultLabel">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        name={name}
        variant="defaultInput"
        {...props}
      />
    </Box>
  );
};

export default AuthInput;
