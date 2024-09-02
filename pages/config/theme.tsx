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
import RaceOverview from "../../src/components/posts/ActivityOverview/ActivityOverview";
import Link from "next/link";
import { palette } from "../../src/utils/theme";
import ColorInfo from "../../src/components/shared/ColorInfo";

const ThemePreview = () => {
  const { theme } = useThemeUI();
  const [mode, setMode] = useColorMode();

  return (
    <Flex
      sx={
        {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: 4,
          height: "fit-content",
          width: "100%",
          backgroundColor: "background",
        } as ThemeUIStyleObject<Theme>
      }
    >
      <Box sx={{ width: "900px", padding: 4 } as ThemeUIStyleObject<Theme>}>
        <Link href="/config/icons">Icons</Link>
        <h2>Colors</h2>
        <Text as="pre">{JSON.stringify(palette, null, 2)}</Text>
        <Flex
          sx={
            {
              width: "fit-content",
              gap: "10px",
              // padding: "5px",
              alignItems: "center",
              paddingY: "10px",
            } as ThemeUIStyleObject<Theme>
          }
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Text as="span" sx={{ fontSize: ["15px", "15px", "15px"] }}>
            Dark Mode
          </Text>
          <Box sx={{ marginLeft: "auto" } as ThemeUIStyleObject<Theme>}>
            <Switch
              checked={mode === "dark" ? true : false}
              onChange={(e) => {
                const next = mode === "dark" ? "light" : "dark";
                setMode(next);
              }}
            />
          </Box>
        </Flex>
        <h2>Colors</h2>
        <Grid gap={2} columns={[2, 2, 3]}>
          {Object.keys(palette).map((color) => {
            if (!palette) return null;
            return (
              <ColorInfo
                name={color}
                color={palette[color]}
                rawColor={palette[color]}
              />
            );
          })}
        </Grid>

        <h2>Config</h2>
        <Grid gap={2} columns={[2, 2, 3]}>
          {Object.keys(theme.colors ?? {}).map((color) => {
            if (!theme.colors || !theme.rawColors) return null;
            return (
              <ColorInfo
                name={color}
                color={theme.colors[color] as string}
                rawColor={theme.rawColors[color] as string}
              />
            );
          })}
        </Grid>

        <h2>Fonts</h2>
        <pre>{JSON.stringify(theme.fonts, null, 2)}</pre>
        {Object.keys(theme.fonts ?? {}).map((font) => (
          <Box
            as="li"
            key={font}
            sx={{ display: "flex" } as ThemeUIStyleObject<Theme>}
          >
            <Box
              sx={
                {
                  fontFamily: font,
                  fontSize: "20px",
                  marginBottom: "10px",
                } as ThemeUIStyleObject<Theme>
              }
            >
              {font}
            </Box>
          </Box>
        ))}

        <h2>Font Sizes</h2>
        <pre>{JSON.stringify(theme.fontSizes, null, 2)}</pre>
        {/* Repeat for other theme properties */}
      </Box>
    </Flex>
  );
};

export default ThemePreview;
