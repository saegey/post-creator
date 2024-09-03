import React from "react";
import { Button } from "theme-ui";

type AuthButtonProps = {
  children: React.ReactNode;
  id?: string;
  [x: string]: any;
};

const AuthButton: React.FC<AuthButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      sx={{ width: "100%", fontSize: "15px", fontWeight: "500" }}
      variant="primaryButton"
      {...props}
    >
      {children}
    </Button>
  );
};

export default AuthButton;
