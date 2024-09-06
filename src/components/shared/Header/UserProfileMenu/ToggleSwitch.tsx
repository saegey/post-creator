import { darken, lighten } from "@theme-ui/color";
import React from "react";
import { Flex, Box, Text, Switch, ThemeUIStyleObject, Theme } from "theme-ui";

interface ToggleSwitchProps {
  label: string;
  isChecked: boolean;
  onChange: () => void;
  mutedText?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  isChecked,
  onChange,
  mutedText,
}) => (
  <Flex
    data-testid="toggle-switch"
    as="li"
    sx={
      {
        // paddingLeft: "10px",
        fontWeight: 500,
        fontSize: "15px",
        paddingY: "5px",
        margin: "5px",
      } as ThemeUIStyleObject<Theme>
    }
    onClick={(e) => e.stopPropagation()}
  >
    <Text as="span" variant="profileMenuText">
      {label}{" "}
      {mutedText && (
        <Text
          as="span"
          sx={{ color: lighten("muted", 0.2) } as ThemeUIStyleObject<Theme>}
        >
          {mutedText}
        </Text>
      )}
    </Text>
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
