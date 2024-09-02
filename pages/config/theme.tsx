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
      <RaceOverview
        data={{
          elevationGain: 3512.700928,
          distance: 216.2985,
          normalizedPower: 188.703247,
          heartAnalysis: {
            "1": 255,
            "2": 255,
            "3": 255,
            "4": 255,
            "5": 255,
            "6": 255,
            "7": 255,
            "8": 255,
            "9": 255,
            "10": 255,
            "11": 255,
            "12": 255,
            "13": 255,
            "14": 255,
            "15": 255,
            "20": 255,
            "25": 250,
            "30": 234,
            "35": 222,
            "40": 214,
            "45": 207,
            "50": 202,
            "55": 198,
            "60": 195,
            "70": 191,
            "80": 189,
            "90": 187,
            "100": 185,
            "110": 184,
            "120": 183,
            "180": 179,
            "240": 177,
            "300": 176,
            "360": 175,
            "420": 174,
            "480": 173,
            "540": 173,
            "600": 172,
            "660": 171,
            "720": 171,
            "780": 171,
            "840": 170,
            "900": 170,
            "960": 170,
            "1020": 170,
            "1080": 170,
            "1140": 170,
            "1200": 169,
            "1500": 168,
            "1800": 168,
            "2100": 169,
            "2400": 168,
            "2700": 167,
            "3000": 167,
            "3300": 167,
            "3600": 167,
            "5400": 165,
            "7200": 164,
            "10800": 163,
            "14400": 160,
            "18000": 159,
            "21600": 158,
            "25200": 155,
            "28800": 154,
            "32400": 152,
            "32411": 152,
          },
          powerAnalysis: {
            "1": 829,
            "2": 775,
            "3": 706,
            "4": 690,
            "5": 659,
            "6": 635,
            "7": 610,
            "8": 578,
            "9": 557,
            "10": 542,
            "11": 521,
            "12": 482,
            "13": 465,
            "14": 457,
            "15": 462,
            "20": 441,
            "25": 427,
            "30": 397,
            "35": 394,
            "40": 377,
            "45": 366,
            "50": 354,
            "55": 349,
            "60": 350,
            "70": 346,
            "80": 330,
            "90": 314,
            "100": 304,
            "110": 302,
            "120": 301,
            "180": 298,
            "240": 297,
            "300": 297,
            "360": 292,
            "420": 292,
            "480": 291,
            "540": 275,
            "600": 274,
            "660": 254,
            "720": 245,
            "780": 242,
            "840": 239,
            "900": 231,
            "960": 230,
            "1020": 229,
            "1080": 224,
            "1140": 224,
            "1200": 221,
            "1500": 218,
            "1800": 213,
            "2100": 209,
            "2400": 203,
            "2700": 201,
            "3000": 195,
            "3300": 190,
            "3600": 187,
            "5400": 185,
            "7200": 179,
            "10800": 179,
            "14400": 174,
            "18000": 160,
            "21600": 158,
            "25200": 154,
            "28800": 151,
            "32400": 150,
            "32411": 150,
          },
          cadenceAnalysis: {
            "1": 149,
            "2": 130,
            "3": 123,
            "4": 122,
            "5": 120,
            "6": 119,
            "7": 118,
            "8": 117,
            "9": 116,
            "10": 115,
            "11": 114,
            "12": 113,
            "13": 113,
            "14": 112,
            "15": 112,
            "20": 108,
            "25": 107,
            "30": 103,
            "35": 103,
            "40": 102,
            "45": 102,
            "50": 101,
            "55": 100,
            "60": 100,
            "70": 98,
            "80": 96,
            "90": 95,
            "100": 95,
            "110": 95,
            "120": 95,
            "180": 93,
            "240": 92,
            "300": 92,
            "360": 91,
            "420": 91,
            "480": 90,
            "540": 89,
            "600": 88,
            "660": 87,
            "720": 86,
            "780": 85,
            "840": 85,
            "900": 84,
            "960": 84,
            "1020": 83,
            "1080": 83,
            "1140": 83,
            "1200": 83,
            "1500": 82,
            "1800": 82,
            "2100": 81,
            "2400": 80,
            "2700": 79,
            "3000": 79,
            "3300": 79,
            "3600": 79,
            "5400": 75,
            "7200": 74,
            "10800": 72,
            "14400": 69,
            "18000": 65,
            "21600": 65,
            "25200": 65,
            "28800": 65,
            "32400": 63,
            "32411": 63,
          },
          tempAnalysis: {
            "1": 42,
            "2": 42,
            "3": 42,
            "4": 42,
            "5": 42,
            "6": 42,
            "7": 42,
            "8": 42,
            "9": 42,
            "10": 42,
            "11": 42,
            "12": 42,
            "13": 42,
            "14": 42,
            "15": 42,
            "20": 42,
            "25": 42,
            "30": 42,
            "35": 42,
            "40": 42,
            "45": 42,
            "50": 42,
            "55": 42,
            "60": 42,
            "70": 42,
            "80": 41,
            "90": 41,
            "100": 41,
            "110": 41,
            "120": 41,
            "180": 41,
            "240": 41,
            "300": 41,
            "360": 41,
            "420": 41,
            "480": 41,
            "540": 41,
            "600": 41,
            "660": 41,
            "720": 40,
            "780": 40,
            "840": 40,
            "900": 40,
            "960": 40,
            "1020": 40,
            "1080": 40,
            "1140": 40,
            "1200": 40,
            "1500": 39,
            "1800": 39,
            "2100": 38,
            "2400": 38,
            "2700": 38,
            "3000": 37,
            "3300": 37,
            "3600": 37,
            "5400": 36,
            "7200": 35,
            "10800": 34,
            "14400": 33,
            "18000": 32,
            "21600": 31,
            "25200": 30,
            "28800": 29,
            "32400": 28,
            "32411": 28,
          },
          stoppedTime: 4725,
          elapsedTime: { seconds: 36605 },
          // timeInRed: 0,
        }}
        selectedFields={[
          "Normalized Power",
          "Avg Heart Rate",
          "Distance",
          "Elevation Gain",
          "Avg Temperature",
          "Avg Speed",
          "Elapsed Time",
          "Stopped Time",
          "Avg Cadence",
          "Avg Power",
        ]}
      />
    </Flex>
  );
};

export default ThemePreview;
