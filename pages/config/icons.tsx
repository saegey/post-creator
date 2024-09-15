import {
  Box,
  Flex,
  useColorMode,
  ThemeUIStyleObject,
  Theme,
  Grid,
  Switch,
  Text,
} from "theme-ui";

import BulletListIcon from "../../src/components/icons/BulletListIcon";
import LinkIcon from "../../src/components/icons/LinkIcon";
import HeadingIcon from "../../src/components/icons/HeadingIcon";
import ActivityOverviewIcon from "../../src/components/icons/ActivityOverviewIcon";
import CaretDown from "../../src/components/icons/CaretDown";
import EyeHideIcon from "../../src/components/icons/EyeHideIcon";
import LinkedinIcon from "../../src/components/icons/LinkedInIcon";
import PlusIcon from "../../src/components/icons/PlusIcon";
import StravaIcon from "../../src/components/icons/StravaIcon";
import AvatarIcon from "../../src/components/icons/AvatarIcon";
import FacebookIcon from "../../src/components/icons/FacebookIcon";
import PowerGraphIcon from "../../src/components/icons/PowerGraphIcon";
import TimePowerZonesIcon from "../../src/components/icons/TimePowerZonesIcon";
import BoldIcon from "../../src/components/icons/BoldIcon";
import EmbedIcon from "../../src/components/icons/EmbedIcon";
import MatchesBurnedIcon from "../../src/components/icons/MatchesBurnedIcon";
import ResultsIcon from "../../src/components/icons/ResultsIcon";
import TwitterIcon from "../../src/components/icons/TwitterIcon";
import EyeIcon from "../../src/components/icons/EyeIcon";
import HeroBannerIcon from "../../src/components/icons/HeroBannerIcon";
import MaximizeIcon from "../../src/components/icons/MaximizeIcon";
import RouteIcon from "../../src/components/icons/RouteIcon";
import VideoIcon from "../../src/components/icons/VideoIcon";
import ImagesIcon from "../../src/components/icons/ImagesIcon";
import SettingsIcon from "../../src/components/icons/SettingsIcon";
import Link from "next/link";
import ShareIcon from "../../src/components/icons/ShareIcon";
import OptionsIcon from "../../src/components/icons/OptionsIcon";
import BackIcon from "../../src/components/icons/BackIcon";
import ForwardIcon from "../../src/components/icons/ForwardIcon";
import UploadIcon from "../../src/components/icons/UploadIcon";
import AddIcon from "../../src/components/icons/AddIcon";
import RefreshIcon from "../../src/components/icons/RefreshIcon";
import CloudCheck from "../../src/components/icons/CloudCheck";
import ZoomOut from "../../src/components/icons/ZoomOut";
import SaveIcon from "../../src/components/icons/SaveIcon";
import DeleteIcon from "../../src/components/icons/DeleteIcon";
import EditIcon from "../../src/components/icons/EditIcon";
import ProfileIcon from "../../src/components/icons/ProfileIcon";

const icons = [
  BulletListIcon,
  LinkIcon,
  HeadingIcon,
  ActivityOverviewIcon,
  CaretDown,
  EyeHideIcon,
  LinkedinIcon,
  PlusIcon,
  StravaIcon,
  AvatarIcon,
  FacebookIcon,
  PowerGraphIcon,
  TimePowerZonesIcon,
  BoldIcon,
  EmbedIcon,
  MatchesBurnedIcon,
  ResultsIcon,
  TwitterIcon,
  EyeIcon,
  HeroBannerIcon,
  MaximizeIcon,
  RouteIcon,
  VideoIcon,
  ImagesIcon,
  SettingsIcon,
  ShareIcon,
  OptionsIcon,
  BackIcon,
  ForwardIcon,
  UploadIcon,
  AddIcon,
  RefreshIcon,
  CloudCheck,
  ZoomOut,
  SaveIcon,
  DeleteIcon,
  EditIcon,
  ProfileIcon,
];

const ThemePreview = () => {
  // const { theme } = useThemeUI();
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
        <Flex sx={{ gap: "10px" }}>
          <Box>
            <Link href="/config/theme">Theme</Link>
          </Box>
          <Box>
            <Link href="/config/widgets">Widgets</Link>
          </Box>
        </Flex>
        <h2>Icons</h2>
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

        <Grid gap={2} columns={[8, 8, 10]}>
          {icons.map((IconComponent, index) => (
            <Box key={index}>
              <IconComponent
                sx={{
                  color: "text",
                  width: "32px",
                  height: "auto",
                  backgroundColor: "surface",
                }}
                onClick={() => {}}
              />
            </Box>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default ThemePreview;
