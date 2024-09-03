import React from "react";
import { Button } from "theme-ui";

type AuthButtonProps = {
  children: React.ReactNode;
  [x: string]: any;
};

const AuthButton: React.FC<AuthButtonProps> = ({ children, ...props }) => {
  return (
    <Button variant="primaryButton" sx={{ width: "100%" }} {...props}>
      {children}
    </Button>
  );
};

export default AuthButton;
