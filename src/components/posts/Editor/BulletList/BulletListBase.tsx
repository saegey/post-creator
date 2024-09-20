import { Box } from "theme-ui";

import { ReactNode } from "react";

interface BulletListBaseProps {
  children: ReactNode;
}

const BulletListBase = ({ children }: BulletListBaseProps) => (
  <Box
    as="ul"
    sx={{
      lineHeight: "30px",
      paddingTop: ["0px", "0px", "0px"],
      paddingBottom: ["0px", "0px", "0px"],
      paddingLeft: ["40px", "25px", "28px"],
      paddingRight: ["20px", "20px", "20px"],
      marginX: "auto",
      marginTop: "10px",
      maxWidth: "690px",
      fontSize: "19px",
      li: {
        paddingRight: "5px",
        paddingLeft: "15px",
        marginBottom: "10px",
        paddingY: "5px",
      },
    }}
  >
    {children}
  </Box>
);

export default BulletListBase;
