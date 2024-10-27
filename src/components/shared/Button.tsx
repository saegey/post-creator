// components/Button.js
/** @jsxImportSource theme-ui */
import { Button as ThemeUIButton, Flex, Spinner, Box, Text } from "theme-ui";

import { ReactNode } from "react";

interface ButtonProps {
  variant?: string;
  size?: string;
  icon?: React.ComponentType;
  loading?: boolean;
  children?: ReactNode;
  sx?: object;
  [key: string]: any;
}

const Button = ({
  variant = "primary",
  size = "m",
  icon: Icon,
  loading = false,
  children,
  sx,
  ...props
}: ButtonProps) => {
  return (
    <ThemeUIButton
      variant={variant}
      sx={{
        ...sx,
        // ...theme.sizes[size],
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      }}
      {...props}
    >
      <Flex sx={{ gap: "4px", alignItems: "center" }}>
        {Icon && (
          <Box sx={{ width: "20px", height: "20px" }}>
            <Icon />
          </Box>
        )}
        <Text sx={{ width: "100%", textDecoration: "none" }}>{children}</Text>
        {loading && <Spinner sx={{ size: "20px", color: "secondary" }} />}
      </Flex>
    </ThemeUIButton>
  );
};

export default Button;
