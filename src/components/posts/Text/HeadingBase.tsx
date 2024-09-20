import { Text } from "theme-ui";

import { ReactNode } from "react";

interface HeadingBaseProps {
  children: ReactNode;
}

const HeadingBase = ({ children }: HeadingBaseProps) => (
  <Text
    as="h1"
    sx={{
      fontWeight: 700,
      maxWidth: "690px",
      fontSize: ["24px", "24px", "24px"],
      width: ["100%", "690px", "690px"],
      marginLeft: "auto",
      marginRight: "auto",
      paddingX: ["10px", "0px", "0px"],
    }}
  >
    {children}
  </Text>
);

export default HeadingBase;
