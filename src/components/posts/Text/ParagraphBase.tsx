import { Text } from "theme-ui";

import { ReactNode } from "react";

interface ParagraphBaseProps {
  children: ReactNode;
}

const ParagraphBase = ({ children }: ParagraphBaseProps) => (
  <Text
    as="div"
    sx={{
      fontSize: ["16px", "19px", "19px"],
      marginX: ["10px", "0px", "0px"],
      lineHeight: "1.5",
    }}
  >
    {children}
  </Text>
);

export default ParagraphBase;
