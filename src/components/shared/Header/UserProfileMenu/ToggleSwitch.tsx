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
    sx={
      {
        // paddingLeft: "10px",
        // backgroundColor: "red",
        fontWeight: 500,
        fontSize: "14px",
        paddingY: "5px",
        marginX: "5px",
        marginY: "10px",
      } as ThemeUIStyleObject<Theme>
    }
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
        <Text as="span" variant="profileMenuText" sx={{ color: "textLight" }}>
          {label}
        </Text>
      </Flex>
    </Flex>
    <Box sx={{ marginLeft: "auto" } as ThemeUIStyleObject<Theme>}>
      <Switch
        checked={isChecked}
        onChange={onChange}
        sx={{
          backgroundColor: "surface",
          // This will not be visible since the input is hidden
          // '&:checked': {
          //   backgroundColor: 'primary'
          // },
          // This will be visible
          "input:checked ~ &": {
            backgroundColor: darken("surface", 0.4),
          },
        }}
      />
    </Box>
  </Flex>
);

export default ToggleSwitch;
