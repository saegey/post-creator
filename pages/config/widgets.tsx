import Link from "next/link";
import {
  Box,
  useThemeUI,
  Flex,
  useColorMode,
  ThemeUIStyleObject,
  Theme,
  Grid,
  Switch,
  Text,
  Link as ThemeUILink,
} from "theme-ui";
import ActivityOverview from "../../src/components/posts/ActivityOverview/ActivityOverview";
import CloudImage from "../../src/components/posts/Image/CloudImage";
import { CloudinaryImage } from "../../src/types/common";
import PowerCurveGraph from "../../src/components/posts/PowerGraph/PowerCurveChart";

const ThemePreview = () => {
  // const { theme } = useThemeUI();
  const [mode, setMode] = useColorMode();
  const imageMeta = {
    signature: "2fcf62c060cf6203d47a9683aa3bda21fc0dd0eb",
    predominant: {
      google: [
        ["white", 40.8],
        ["black", 29],
        ["gray", 25.5],
      ],
      cloudinary: [
        ["white", 40.8],
        ["black", 29],
        ["gray", 25.5],
      ],
    },
    created_at: "2024-08-31T20:50:32Z",
    asset_id: "d1ea7c9e84c42b2af3e11c3015f66d9a",
    batchId: "uw-batch2",
    type: "upload",
    thumbnail_url:
      "https://res.cloudinary.com/dprifih4o/image/upload/c_limit,h_60,w_90/v1725137432/dxrbs3nzmvodmn9xbyxl.jpg",
    semi_transparent: false,
    colors: [
      ["#FBFBFB", 29.9],
      ["#060605", 24.9],
      ["#868584", 21.4],
      ["#F3F3F1", 5.3],
      ["#F2F4F3", 3.9],
      ["#848482", 3.5],
      ["#020001", 1.1],
      ["#FDFEFE", 1.1],
      ["#000100", 0.9],
      ["#010000", 0.7],
      ["#272928", 0.7],
      ["#F3F2F3", 0.7],
      ["#7D7F7E", 0.7],
      ["#020200", 0.6],
    ],
    public_id: "dxrbs3nzmvodmn9xbyxl",
    grayscale: false,
    path: "v1725137432/dxrbs3nzmvodmn9xbyxl.jpg",
    pages: 1,
    quality_analysis: {
      focus: 1,
    },
    id: "uw-file3",
    placeholder: false,
    height: 1024,
    format: "jpg",
    resource_type: "image",
    secure_url:
      "https://res.cloudinary.com/dprifih4o/image/upload/v1725137432/dxrbs3nzmvodmn9xbyxl.jpg",
    version_id: "f540224ff3fcc7082ba73c8e8c71bec1",
    version: 1725137432,
    access_mode: "public",
    url: "http://res.cloudinary.com/dprifih4o/image/upload/v1725137432/dxrbs3nzmvodmn9xbyxl.jpg",
    tags: [],
    image_metadata: {
      YResolution: "1",
      XResolution: "1",
      JFIFVersion: "1.01",
      Colorspace: "RGB",
      ResolutionUnit: "None",
      DPI: "0",
    },
    folder: "",
    bytes: 252056,
    width: 1024,
    etag: "b53f2cbab3409df7ab52a15a3f51e8be",
    illustration_score: 1,
  } as unknown as CloudinaryImage;

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
        <Flex sx={{ gap: "10px", marginBottom: "20px" }}>
          <Box>
            <ThemeUILink as={Link} href="/config/theme">
              Theme
            </ThemeUILink>
          </Box>
          <Box>
            <Link href="/config/widgets">Widgets</Link>
          </Box>
        </Flex>
        <h2>Widgets</h2>
        <Flex
          sx={
            {
              width: "fit-content",
              gap: "10px",
              // padding: "5px",
              alignItems: "center",
              marginBottom: "20px",
              paddingY: "10px",
              flexDirection: "row",
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
        <Box>
          <ActivityOverview
            data={{
              elevationGain: 3512.700928,
              distance: 216.2985,
              normalizedPower: 188.703247,
              heartAnalysis: {
                "1": 255,
                "2": 255,
                "32400": 152,
                "32411": 152,
              },
              powerAnalysis: {
                "1": 829,
                "32400": 150,
                "32411": 150,
              },
              cadenceAnalysis: {
                "1": 149,
                "2": 130,
                "32400": 63,
                "32411": 63,
              },
              tempAnalysis: {
                "1": 42,
                "2": 42,
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
        </Box>
        <Box>
          {/* <Box
            sx={
              {
                marginY: ["20px"],
                height: "fit-content",
                marginBottom: "20px",
              } as ThemeUIStyleObject<Theme>
            }
          >
            <CloudImage
              imageUrl="http://res.cloudinary.com/dprifih4o/image/upload/v1725137432/dxrbs3nzmvodmn9xbyxl.jpg"
              imageMeta={imageMeta}
              focused={false}
              onMaximize={function (): void {
                throw new Error("Function not implemented.");
              }}
              selected={false}
            />
          </Box> */}
          <Box variant="boxes.componentCard" contentEditable={false}>
            <Box
              sx={
                {
                  width: "100%",
                  height: ["250px", "450px", "450px"],
                } as ThemeUIStyleObject<Theme>
              }
            >
              <PowerCurveGraph
                data={[
                  {
                    x: 1,
                    y: 785,
                  },
                  {
                    x: 2,
                    y: 746,
                  },
                  {
                    x: 3,
                    y: 665,
                  },
                  {
                    x: 4,
                    y: 611,
                  },
                  {
                    x: 5,
                    y: 606,
                  },
                  {
                    x: 6,
                    y: 588,
                  },
                  {
                    x: 7,
                    y: 574,
                  },
                  {
                    x: 8,
                    y: 565,
                  },
                  {
                    x: 9,
                    y: 558,
                  },
                  {
                    x: 10,
                    y: 551,
                  },
                  {
                    x: 11,
                    y: 537,
                  },
                  {
                    x: 12,
                    y: 521,
                  },
                  {
                    x: 13,
                    y: 512,
                  },
                  {
                    x: 14,
                    y: 503,
                  },
                  {
                    x: 15,
                    y: 489,
                  },
                  {
                    x: 20,
                    y: 432,
                  },
                  {
                    x: 25,
                    y: 385,
                  },
                  {
                    x: 30,
                    y: 367,
                  },
                  {
                    x: 35,
                    y: 357,
                  },
                  {
                    x: 40,
                    y: 355,
                  },
                  {
                    x: 45,
                    y: 351,
                  },
                  {
                    x: 50,
                    y: 349,
                  },
                  {
                    x: 55,
                    y: 348,
                  },
                  {
                    x: 60,
                    y: 347,
                  },
                  {
                    x: 70,
                    y: 344,
                  },
                  {
                    x: 80,
                    y: 329,
                  },
                  {
                    x: 90,
                    y: 306,
                  },
                  {
                    x: 100,
                    y: 295,
                  },
                  {
                    x: 110,
                    y: 287,
                  },
                  {
                    x: 120,
                    y: 290,
                  },
                  {
                    x: 180,
                    y: 286,
                  },
                  {
                    x: 240,
                    y: 275,
                  },
                  {
                    x: 300,
                    y: 272,
                  },
                  {
                    x: 360,
                    y: 258,
                  },
                  {
                    x: 420,
                    y: 252,
                  },
                  {
                    x: 480,
                    y: 243,
                  },
                  {
                    x: 540,
                    y: 238,
                  },
                  {
                    x: 600,
                    y: 232,
                  },
                  {
                    x: 660,
                    y: 223,
                  },
                  {
                    x: 720,
                    y: 222,
                  },
                  {
                    x: 780,
                    y: 224,
                  },
                  {
                    x: 840,
                    y: 219,
                  },
                  {
                    x: 900,
                    y: 220,
                  },
                  {
                    x: 960,
                    y: 218,
                  },
                  {
                    x: 1020,
                    y: 216,
                  },
                  {
                    x: 1080,
                    y: 214,
                  },
                  {
                    x: 1140,
                    y: 214,
                  },
                  {
                    x: 1200,
                    y: 212,
                  },
                  {
                    x: 1500,
                    y: 206,
                  },
                  {
                    x: 1800,
                    y: 205,
                  },
                  {
                    x: 2100,
                    y: 201,
                  },
                  {
                    x: 2400,
                    y: 199,
                  },
                  {
                    x: 2700,
                    y: 196,
                  },
                  {
                    x: 3000,
                    y: 192,
                  },
                  {
                    x: 3300,
                    y: 188,
                  },
                  {
                    x: 3600,
                    y: 185,
                  },
                  {
                    x: 5400,
                    y: 176,
                  },
                  {
                    x: 7200,
                    y: 171,
                  },
                  {
                    x: 10800,
                    y: 169,
                  },
                  {
                    x: 14400,
                    y: 165,
                  },
                  {
                    x: 18000,
                    y: 161,
                  },
                  {
                    x: 21600,
                    y: 152,
                  },
                  {
                    x: 22605,
                    y: 147,
                  },
                ]}
                ftp={270}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default ThemePreview;
