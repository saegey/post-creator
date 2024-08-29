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
        paddingLeft: "10px",
        paddingY: "10px",
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
          sx={{ color: "textMuted" } as ThemeUIStyleObject<Theme>}
        >
          {mutedText}
        </Text>
      )}
    </Text>
    <Box sx={{ marginLeft: "auto" } as ThemeUIStyleObject<Theme>}>
      <Switch checked={isChecked} onChange={onChange} />
    </Box>
  </Flex>
);

export default ToggleSwitch;
