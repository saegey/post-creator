import { darken, lighten } from "@theme-ui/color";
import React from "react";
import {
  Flex,
  Box,
  Text,
  Switch,
  ThemeUIStyleObject,
  Theme,
  IconButton,
} from "theme-ui";

interface ToggleSwitchProps {
  label: string;
  isChecked: boolean;
  onChange: () => void;
  // mutedText?: string;
  icon?: React.ReactNode;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  isChecked,
  onChange,
  // mutedText,
  icon,
}) => (
  <Flex
    data-testid="toggle-switch"
    as="li"
    sx={{
      fontWeight: 500,
      fontSize: "16px",
      paddingY: "5px",
      marginX: "5px",
      marginY: "10px",
    }}
    onClick={(e) => e.stopPropagation()}
  >
    <Flex sx={{ gap: "15px", height: "100%" }}>
      {icon ? (
        <IconButton
          sx={{
            padding: "0",
            width: "16px",
            height: "16px",
            color: "textLight",
          }}
        >
          {icon}
        </IconButton>
      ) : null}
      <Flex sx={{ alignItems: "center" }}>
        <Text
          as="span"
          sx={{ color: "textLight", fontSize: ["16px", "14px", "14px"] }}
        >
          {label}
        </Text>
      </Flex>
    </Flex>
    <Box sx={{ marginLeft: "auto" }}>
      <Switch
        checked={isChecked}
        onChange={onChange}
        sx={{
          backgroundColor: "surface",
          "input:checked ~ &": {
            backgroundColor: darken("surface", 0.4),
          },
        }}
      />
    </Box>
  </Flex>
);

export default ToggleSwitch;
