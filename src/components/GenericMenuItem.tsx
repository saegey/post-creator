import React from "react";
import { Box, Flex, Text } from "theme-ui";

interface MenuItemProps {
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  label: string;
  icon?: React.ReactNode;
  isDisabled?: boolean;
}

const GenericMenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label,
  icon,
  isDisabled = false,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    if (isDisabled || !onClick) return;
    onClick(event);
  };

  return (
    <Flex
      sx={{
        gap: "10px",
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.6 : 1,
        width: "100%",
      }}
      onClick={handleClick}
      onMouseDown={(e) => e.preventDefault()} // Prevents the editor from losing focus
    >
      {icon && <Box>{icon}</Box>}
      <Text
        as="span"
        sx={{
          color: "text",
          fontSize: "13px",
          alignContent: "center",
        }}
      >
        {label}
      </Text>
    </Flex>
  );
};

export default GenericMenuItem;
