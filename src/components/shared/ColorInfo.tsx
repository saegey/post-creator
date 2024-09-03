import {
  Box,
  useThemeUI,
  Text,
  Flex,
  useColorMode,
  Switch,
  ThemeUIStyleObject,
  Theme,
  Grid,
  // Link,
} from "theme-ui";
import { ThemeUIColor } from "../../types/common";

const ColorInfo = ({
  name,
  color,
  rawColor,
}: {
  name: string;
  color: ThemeUIColor;
  rawColor: string;
}) => {
  return (
    <Box
      // as="li"
      key={color}
      sx={
        {
          display: "flex",
          width: "100%",
          paddingY: "5px",
          gap: "10px",
        } as ThemeUIStyleObject<Theme>
      }
    >
      <Box
        sx={
          {
            backgroundColor: color,
            width: "30px",
            borderWidth: "1px",
            borderColor: "text",
            borderStyle: "solid",
            height: "30px",
            alignItems: "center",
            justifyItems: "center",
          } as ThemeUIStyleObject<Theme>
        }
      />
      <Flex
        sx={
          {
            gap: "10px",
            justifyItems: "center",
            flexDirection: "column",
          } as ThemeUIStyleObject<Theme>
        }
      >
        <Box>
          <Text as="span" sx={{ fontSize: "14px" }}>
            {name}
          </Text>
        </Box>
        <Box>
          <Text as="pre">{JSON.stringify(rawColor)}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default ColorInfo;
