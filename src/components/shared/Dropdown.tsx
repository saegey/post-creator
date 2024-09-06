import { Box, Flex } from "theme-ui";
import { ReactNode } from "react";

const Dropdown = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: ReactNode;
}) => {
  return (
    <Box
      sx={{
        display: isOpen ? "absolute" : "none",
        position: "absolute",
        minWidth: "190px",
        zIndex: 1,
        left: "-158px",
        top: "-20px",
      }}
      variant="boxes.menuItem"
      className={"dropdown-content"}
    >
      <Flex sx={{ flexDirection: "column", margin: "0px" }}>{children}</Flex>
    </Box>
  );
};

export default Dropdown;
