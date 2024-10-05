import Link from "next/link";
import {
  Box,
  useThemeUI,
  Flex,
  useColorMode,
  ThemeUIStyleObject,
  Theme,
  Switch,
  Text,
  Link as ThemeUILink,
  Divider,
} from "theme-ui";
import ActivityOverview from "../../src/components/posts/ActivityOverview/ActivityOverview";
import {
  ActivityItem,
  CloudinaryImage,
  HeroBannerType,
  ImageElementType,
} from "../../src/types/common";
import PowerCurveGraph from "../../src/components/posts/PowerGraph/PowerCurveGraph";
import ParagraphBase from "../../src/components/posts/Text/ParagraphBase";
import EmbedBase from "../../src/components/posts/Embed/EmbedBase";
import VisualOverviewBase from "../../src/components/posts/VisualOverview/VisualOverviewBase";

import test from "../../src/components/posts/VisualOverview/test.json";
import imageSample from "../../src/components/posts/Image/imageSample.json";
import sample from "../../src/components/posts/HeroBanner/sample.json";
import raceResults from "../../src/components/posts/RaceResults/RaceResults/resultsSample.json";
import webscorerSample from "../../src/components/posts/RaceResults/WebScorer/resultsSample.json";
import crossResults from "../../src/components/posts/RaceResults/CrossResults/resultsSample.json";
import omniGoResults from "../../src/components/posts/RaceResults/OmniGo/resultsSample.json";
import runsignupResults from "../../src/components/posts/RaceResults/RunSignup/resultsSample.json";

import ImageBase from "../../src/components/posts/Image/ImageBase";
import HeroBannerBase from "../../src/components/posts/HeroBanner/HeroBannerBase";
import LinkBase from "../../src/components/posts/Text/LinkBase";
import VideoEmbedBase from "../../src/components/posts/VideoEmbed/VideoEmbedBase";
import HeadingBase from "../../src/components/posts/Text/HeadingBase";
import BulletListBase from "../../src/components/posts/Editor/BulletList/BulletListBase";
import RaceResultsDotComList from "../../src/components/posts/RaceResults/RaceResults/RaceResultsDotComList";
import WebscorerList from "../../src/components/posts/RaceResults/WebScorer/WebscorerList";
import CrossResultsList from "../../src/components/posts/RaceResults/CrossResults/CrossResultsList";
import OmniResultsList from "../../src/components/posts/RaceResults/OmniGo/OmniResultsList";
import RunSignupList from "../../src/components/posts/RaceResults/RunSignup/RunSignupList";

const ThemePreview = () => {
  // const { theme } = useThemeUI();
  const [mode, setMode] = useColorMode();

  const graphData = [
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
  ];

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
        <Divider />
        <Text as="h3">Metrics</Text>
        <Divider />
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
          <Divider />
          <Text as="h3">Graph</Text>
          <Divider />
          <Box variant="boxes.componentCard" contentEditable={false}>
            <Box
              sx={
                {
                  width: "100%",
                  height: ["250px", "450px", "450px"],
                } as ThemeUIStyleObject<Theme>
              }
            >
              <PowerCurveGraph data={graphData} ftp={270} />
            </Box>
          </Box>
          <Divider />
          <Text as="h3">Paragraph</Text>
          <Divider />
          <ParagraphBase>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Sociosqu
            consectetur parturient nisi aliquet natoque felis risus. Metus
            elementum curabitur dui nunc tellus. Quam at luctus tempus quis
            purus ultrices phasellus mattis. Urna bibendum magnis sit ante
            nostra tempor curae. Aenean taciti dignissim finibus rhoncus vivamus
            dolor mauris suscipit. Turpis in fames senectus arcu nulla
            pellentesque pharetra. Sit lacus eros venenatis tempor, rhoncus
            pharetra leo. Imperdiet duis ac metus ut efficitur consectetur urna.
            Lacus duis ultricies sagittis conubia taciti orci sollicitudin.
            Magnis vivamus fermentum tellus primis hac. Scelerisque eget taciti
            facilisi; hendrerit hendrerit laoreet. Habitasse proin lobortis sem
            aliquet pharetra vestibulum etiam.
          </ParagraphBase>
          <Divider />
          <EmbedBase
            url={`https://ridewithgps.com/embeds?type=trip&id=212824105&sampleGraph=true`}
          />
          <Divider />
          <Text as="h3">Map</Text>
          <Divider />
          <VisualOverviewBase
            activity={test.activity}
            element={{
              type: "visualOverview",
              selectionEnd: undefined,
              selectionStart: undefined,
              left: undefined,
              right: undefined,
              bottom: undefined,
              top: undefined,
              children: [],
              void: true,
            }}
            elevations={test.elevations as ActivityItem[]}
            view={false}
            unitOfMeasure={""}
            token={test.token}
          />
          <Divider />
          <Text as="h3">Image</Text>
          <Divider />
          <ImageBase
            {...imageSample}
            element={imageSample.element as ImageElementType}
            imageMeta={imageSample.imageMeta as unknown as CloudinaryImage}
            handleMaximize={() => {
              console.log("Image maximized!");
            }}
          />
          <Divider />
          <Text as="h3">HeroBanner</Text>
          <Divider />
          <HeroBannerBase
            {...sample}
            element={
              {
                ...sample.element,
                image: sample.element.image,
              } as unknown as HeroBannerType
            }
          />
          <Divider />
          <Text as="h3">Link</Text>
          <Divider />
          <LinkBase
            element={{
              children: [
                {
                  text: "Hello World Text with link",
                },
              ],
              href: "http://monopad.app",
              type: "link",
              target: "_self",
            }}
            onMouseDown={() => console.log("Link clicked")}
          >
            Hello World Text with link
          </LinkBase>
          <Divider />
          <Text as="h3">Video</Text>
          <Divider />
          <VideoEmbedBase
            element={{
              playbackId: "gDEoUC31X4OETr6JPwMKQe1PJJA4NOuZDzepEsy9STg",
            }}
            accentColor="purple"
          />
          <Divider />
          <Text as="h3">Heading</Text>
          <Divider />
          <HeadingBase>Heading</HeadingBase>
          <Divider />
          <Text as="h3">Bullet List</Text>
          <Divider />
          <BulletListBase>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </BulletListBase>
          <Divider />
          <Text as="h3">Race Results - myraceresults</Text>
          <Divider />
          <RaceResultsDotComList
            raceResults={raceResults as any}
            resultsUrl="https://my.raceresult.com/286885/results"
          />
          <Divider />
          <Text as="h3">Race Results - webscorer</Text>
          <Divider />
          <WebscorerList
            raceResults={webscorerSample as any}
            resultsUrl="https://www.webscorer.com/racedetails?raceid=308726&did=375661&cid=1867730"
          />
          <Divider />
          <Text as="h3">Race Results - Crossresults</Text>
          <Divider />
          <CrossResultsList
            raceResults={crossResults as any}
            resultsUrl="https://www.crossresults.com/race/12161"
          />
          <Divider />
          <Text as="h3">Race Results - omnigo</Text>
          <Divider />
          <OmniResultsList
            raceResults={omniGoResults as any}
            resultsUrl="https://www.omnigoevents.com/events/bwr-bc-2023/results/"
          />
          <Divider />
          <Text as="h3">Race Results - runsignup</Text>
          <Divider />
          <RunSignupList
            raceResults={runsignupResults as any}
            resultsUrl="https://www.bikesignup.com/Race/Results/86159#resultSetId-370162;perpage:100"
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default ThemePreview;
