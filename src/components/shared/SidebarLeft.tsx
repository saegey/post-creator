import { Flex, Text, Box, Close } from "theme-ui";
import React, { ReactNode } from "react";

const SidebarLeft = ({
  closeOnclick,
  children,
  title,
}: {
  closeOnclick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
  ) => void;
  children: ReactNode;
  title: string;
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "sideMenuBackground",
        minWidth: "300px",
        borderRightColor: "sideMenuRightBorder",
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        position: ["absolute", "sticky", "sticky"],
        display: ["absolute", null, null],
        top: 0,
        marginTop: [0, 0, 0],
        width: ["100%", "300px", "300px"],
        height: "100vh",
        zIndex: 20,
      }}
    >
      <Box sx={{ height: "100vh" }}>
        <Flex
          sx={{
            padding: "15px",
            borderBottomColor: "divider",
            borderBottomStyle: "solid",
            borderBottomWidth: "1px",
          }}
        >
          <Text
            as="span"
            sx={{
              lineHeight: "30px",
              fontSize: "16px",
              fontWeight: "600",
              marginLeft: "10px",
            }}
          >
            {title}
          </Text>
          <Close
            onClick={(e) => closeOnclick(e)}
            sx={{ marginLeft: "auto" }}
            id="close-sidebar-menu"
          />
        </Flex>
        {children}
      </Box>
    </Box>
  );
};

export default SidebarLeft;
