import { CognitoUser } from "@aws-amplify/auth";
import { BaseEditor, Element, Path } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";
import { BaseElement } from "slate";
import { RunSignupMetaType } from "../components/posts/RaceResults/ResultsContext";
import { RunSignupResultType } from "../components/posts/RaceResults/RunSignup/RunSignupResultsPreview";

export type ResultsRow = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

export type ApiRes = {
  data: { data: ResultsRow[]; list: { Fields: Array<{ Label: string }> } };
};

export type WebscorerResultsRow = {
  Place: string;
  Bib: string;
  Name: string;
  FirstName: string;
  LastName: string;
  TeamName: string;
  Category: string;
  Age: number;
  YearOfBirth: number;
  Gender: string;
  Time: string;
  LapTimes: Array<{
    LapNumber: number;
    LapTime: string;
    LapRank: number;
    LapBehind: string;
    RaceTime: string;
    RaceRank: number;
    RaceBehind: string;
  }>;
  Difference: string;
  PercentBack: string;
  PercentWinning: string;
  PercentAverage: string;
  PercentMedian: string;
  CompletedLaps: number;
  StartTime: string;
};

export type WebscorerRes = {
  data: Array<WebscorerResultsRow>;
};

export interface IUser {
  userId: string;
  email: string;
  email_verified: boolean;
  role?: string;
  attributes: {
    picture: string;
    name: string;
    preferred_username: string;
    sub: string;
    profile: string;
    zoneinfo: "metric" | "imperial";
  };
}

export interface CloudinaryImage {
  asset_id: string;
  public_id: string;
  secure_url: string;
  format: "jpeg" | "jpg" | "png";
  width: number;
  height: number;
  colors?: Array<string>;
}

export interface GraphQLError {
  data: any;
  errors?: Array<{
    path: Array<string>;
    data: null;
    errorType: string;
    errorInfo: null;
    locations: Array<string>;
    message: string;
  }>;
}
/*
 * Custom attributes type defined according to the attributes used in this app
 */
export interface UserAttributes {
  preferred_username: string;
  profile: string;
  picture: string;
  sub: string;
  email: string;
  email_verified: string;
  name: string;
  updated_at: string;
  "custom:bytesQuota": string;
  "custom:bytesUsed": string;
}

/*
 * The following interface extends the CognitoUser type because it has issues
 * (see github.com/aws-amplify/amplify-js/issues/4927). Eventually (when you
 * no longer get an error accessing a CognitoUser's 'attribute' property) you
 * will be able to use the CognitoUser type instead of CognitoUserExt.
 */
export interface CognitoUserExt extends CognitoUser {
  attributes: UserAttributes;
}

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type ParagraphElement = {
  type: "paragraph";
  children: Array<LinkType | TextElement>;
};

export type TextElement = {
  type?: "text";
  bold?: boolean;
  text: string;
  children?: CustomText[];
};

export type PostAuthor = {
  type: "postAuthor";
  children: Array<{ text: string }>;
};

export interface HeadingElement extends BaseElement {
  type: "heading-two";
  children: CustomText[];
}

export interface EmbedElementType extends BaseElement {
  type: "embed";
  url: string;
  children: CustomText[];
  void: true;
}

export type ImageElementType = {
  type: "image";
  asset_id: string;
  public_id: string;
  children: CustomText[];
  caption: string;
  photoCaption: string;
  void: boolean;
};

export type StravaEmbed = {
  type: "stravaEmbed";
  activityId: string;
  children: CustomText[];
  void: true;
};

export type PowerGraphType = {
  type: "powergraph";
  children: CustomText[];
  void: true;
};

export type TimeInZonesType = {
  type: "timeInZones";
  children: CustomText[];
  void: true;
  // at?: Path;
};

export type MatchesBurnedType = {
  type: "matchesBurned";
  children: CustomText[];
};

export type ActivityOverviewType = {
  type: "activityOverview";
  children: CustomText[];
  void: true;
  // at?: Path;
};

export type VisualOverviewType = {
  type: "visualOverview";
  selectionEnd?: number | undefined;
  selectionStart?: number | undefined;
  left?: string | undefined;
  right?: string | undefined;
  bottom?: string | undefined;
  top?: string | undefined;
  children: CustomText[];
  void: true;
};

export type HeroBannerType = {
  type: "heroBanner";
  children: CustomText[];
  photoCaption?: string;
  void: true;
};

export type LinkType = {
  type: "link";
  text?: "";
  children: CustomText[];
  href: string;
  target: string;
};

export type BulletedListType = {
  type: "bulleted-list";
  children: Array<{
    text: string;
    bold?: true;
    children: Array<TextElement>;
  }>;
};

export type ListItemType = {
  type: "list-item";
  children: CustomText[];
};

export type RaceResultsDotComType = {
  type: "raceResultsDotCom";
  children: CustomText[];
};

export type WebscorerResultsType = {
  type: "webscorerResults";
  children: CustomText[];
};

export type CrossResultsType = {
  type: "crossResults";
  children: CustomText[];
};

export type OmniResultsType = {
  type: "omniResults";
  children: CustomText[];
};

export type RunSignupResultsSlateType = {
  type: "runSignupResults";
  children: CustomText[];
};

export type VideoEmbedType = {
  type: "videoEmbed";
  children: CustomText[];
  void: true;
  assetId: string;
  isReady: boolean;
  playbackId: string;
};

export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | PostAuthor
  | EmbedElementType
  | ImageElementType
  | TextElement
  | StravaEmbed
  | PowerGraphType
  | TimeInZonesType
  | MatchesBurnedType
  | ActivityOverviewType
  | VisualOverviewType
  | HeroBannerType
  | LinkType
  | BulletedListType
  | ListItemType
  | RaceResultsDotComType
  | WebscorerResultsType
  | VideoEmbedType
  | CrossResultsType
  | OmniResultsType
  | RunSignupResultsSlateType;

export type FormattedText = {
  placeholder?: boolean;
  text: string;
  bold?: true;
  children?: CustomElement[];
};
export type CustomText = FormattedText;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
// export interface LeafType {
//   leaf: { bold: boolean };
//   attributes: object;
//   children: Element;
// }

export interface ActivityItem {
  c: Array<number>;
  d?: number;
  e?: number;
  g?: number;
  t: number;
  i?: number;
  p?: number;
  h?: number;
}

export interface PowerZoneType {
  powerLow: number;
  powerHigh: number;
  zone: number;
  title: string;
}

export interface TimeSeriesDataType {
  coordinates: Array<[number, number, number]> | undefined;
  elevation: Array<ActivityItem> | undefined;
  distances: number[] | undefined;
  elevationGrades: number[] | undefined;
  powerAnalysis: Array<Record<number | string, number>> | undefined;
  powers: number[] | undefined;
  hearts: number[] | undefined;
  times: number[] | undefined;
}

export interface PostViewType {
  id: string;
  title: string;
  subhead?: string | null;
  components?: string | null;
  timeSeriesFile?: string | null;
  __typename?: "PublishedPost" | "Post";
  gpxFile?: string | null;
  elevation?: string | null;
  distance?: number | null;
  heartAnalysis?: string | null;
  cadenceAnalysis?: string | null;
  tempAnalysis?: string | null;
  stoppedTime?: number | null;
  elapsedTime?: number | null;
  timeInRed?: number | null;
  heroImage?: string | null;
  powerZones?: string | null;

  raceResults?: string | null;
  webscorerResults?: string | null;
  omniResults?: string | null;
  runSignupResults?: string | null;
  crossResults?: string | null;

  images?: string | null;
  currentFtp?: number | null;
  date?: string | null;
  postLocation?: string | null;
  author?: Author | null;
  powerZoneBuckets?: string | null;
  shortUrl?: string | null;
  normalizedPower?: number | null;
  owner?: string | null;
  originalPostId?: string | null;
  stravaUrl?: string | null;
  resultsUrl?: string | null;
  elevationTotal?: number | null;
  privacyStatus?: string | null;
  createdAt?: string;
}

export type ListPostsCustom = {
  listPublishedPostsByCreatedAt?: {
    __typename: "ModelPublishedPostConnection";
    items: Array<{
      id: string;
      title: string;
      createdAt: string;
      images: string | null;
      author?: string | null;
    }>;
  };
};

export interface Post
  extends Omit<
    PostViewType,
    | "components"
    | "images"
    | "heartAnalysis"
    | "powerAnalysis"
    | "cadenceAnalysis"
    | "tempAnalysis"
    | "powerZones"
    | "heroImage"
    | "powerZoneBuckets"
    | "raceResults"
    | "webscorerResults"
    | "crossResults"
    | "omniResults"
    | "runSignupResults"
    | "powerZones"
    | "__typename"
  > {
  components?: Array<CustomElement>;
  images: Array<CloudinaryImage> | undefined;
  heartAnalysis: Array<Record<number | string, number>> | undefined;
  powerAnalysis: Array<Record<number | string, number>> | undefined;
  cadenceAnalysis: Array<Record<number | string, number>> | undefined;
  tempAnalysis: Array<Record<number | string, number>> | undefined;
  powerZones: Array<PowerZoneType> | undefined;
  heroImage: CloudinaryImage | undefined;
  powerZoneBuckets: Array<number>;
  raceResults: RaceResultRow | undefined;
  webscorerResults: WebscorerResultPreview | undefined;
  crossResults: CrossResultsPreviewType | undefined;
  omniResults: OmniResultType | undefined;
  runSignupResults: RunSignupType | undefined;
  __typename?: string;
}

export interface PostType {
  post: Post;
  errorCode?: number;
  user: IUser;
}

export type RaceResultRowType = {
  CatPlace: string;
  AgeSex: string;
  Name: string;
  Age: string;
  Time: string;
  Speed: string;
  SexPlace: string;
  GenderPlace: string;
  OverallPlace: string;
  Bib: string;
  Team: string;
};

export type RaceResultRow = {
  selected: RaceResultRowType | undefined;
  results: Array<RaceResultRowType> | undefined;
  category: string;
  division: string;
  eventName: string;
};

export type WebscorerResultPreview = {
  selected: WebscorerResultsRow | undefined;
  results: Array<WebscorerResultsRow> | undefined;
  category: string;
  eventName: string;
};

export type CrossResultsPreviewRowType = {
  RaceName: string;
  RaceCategoryName: string;
  Place: number;
  FirstName: string;
  LastName: string;
  TeamName: string;
  RaceTime: string;
  IsDnf: number;
};

export type CrossResultsPreviewType = {
  selected: CrossResultsPreviewRowType | undefined;
  results: Array<CrossResultsPreviewRowType> | undefined;
  category?: string;
  eventName: string;
};

export type OmniResultRowType = {
  id: string;
  classId: number;
  firstName: string;
  lastName: string;
  bib: number;
  team: string;
  start: number;
  adjustment: string | null;
  status: string | null;
  finishTime: number;
  totalTime: number;
  timeFormattted: string;
  checkpointTimes: Array<{
    eventCheckpointId: string;
    bib: number;
    ts: number;
  }>;
};

export type OmniResultType = {
  selected: OmniResultRowType | undefined;
  results: Array<OmniResultRowType> | undefined;
  category: string;
  eventName: string;
};

export type RunSignupType = {
  selected: RunSignupResultType | undefined;
  results: RunSignupResultsType | undefined;
  category?: number | undefined;
  categoryName: string | undefined;
  eventName: string | undefined;
};

export type Author = { fullName: string; image: string };

export interface PostContextType extends Post {
  activity: Array<ActivityItem> | undefined;
  powers: Array<number> | undefined;
  hearts: Array<number> | undefined;
  elevations: Array<ActivityItem> | undefined;
  setActivity?: React.Dispatch<
    React.SetStateAction<ActivityItem[] | undefined>
  >;
  setTitle?: React.Dispatch<React.SetStateAction<string>>;
  setSubhead?: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  setGpxFile?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPostLocation?: React.Dispatch<
    React.SetStateAction<string | undefined | null>
  >;
  setId?: React.Dispatch<React.SetStateAction<string>>;
  setStravaUrl?: React.Dispatch<
    React.SetStateAction<string | undefined | null>
  >;
  setComponents?: React.Dispatch<
    React.SetStateAction<Array<CustomElement> | undefined>
  >;
  setImages?: React.Dispatch<
    React.SetStateAction<Array<CloudinaryImage> | undefined>
  >;
  setHeroImage?: React.Dispatch<CloudinaryImage | undefined>;
  setCurrentFtp?: React.Dispatch<
    React.SetStateAction<number | undefined | null>
  >;
  setResultsUrl?: React.Dispatch<
    React.SetStateAction<string | undefined | null>
  >;
  setPowerAnalysis?: React.Dispatch<
    React.SetStateAction<Array<Record<number | string, number>> | undefined>
  >;
  setHeartAnalysis?: React.Dispatch<
    React.SetStateAction<Array<Record<number | string, number>> | undefined>
  >;
  setCadenceAnalysis?: React.Dispatch<
    React.SetStateAction<Array<Record<number | string, number>> | undefined>
  >;
  setTempAnalysis?: React.Dispatch<
    React.SetStateAction<Array<Record<number | string, number>> | undefined>
  >;
  setElevationTotal?: React.Dispatch<
    React.SetStateAction<number | undefined | null>
  >;
  setNormalizedPower?: React.Dispatch<
    React.SetStateAction<number | undefined | null>
  >;
  setDistance?: React.Dispatch<React.SetStateAction<number | undefined | null>>;
  setElapsedTime?: React.Dispatch<
    React.SetStateAction<number | undefined | null>
  >;
  setStoppedTime?: React.Dispatch<
    React.SetStateAction<number | undefined | null>
  >;
  setTimeInRed?: React.Dispatch<
    React.SetStateAction<number | undefined | null>
  >;
  setPowerZones?: React.Dispatch<
    React.SetStateAction<Array<PowerZoneType> | undefined>
  >;
  setDate?: React.Dispatch<React.SetStateAction<string | undefined | null>>;
  setPowerZoneBuckets?: React.Dispatch<React.SetStateAction<Array<number>>>;
  setShortUrl?: React.Dispatch<React.SetStateAction<string | undefined | null>>;

  // race results
  setRaceResults?: React.Dispatch<
    React.SetStateAction<RaceResultRow | undefined>
  >;
  setWebscorerResults?: React.Dispatch<
    React.SetStateAction<WebscorerResultPreview | undefined>
  >;
  setCrossResults?: React.Dispatch<
    React.SetStateAction<CrossResultsPreviewType | undefined>
  >;
  setOmniResults?: React.Dispatch<
    React.SetStateAction<OmniResultType | undefined>
  >;
  setRunSignupResults?: React.Dispatch<
    React.SetStateAction<RunSignupType | undefined>
  >;

  setAuthor?: React.Dispatch<React.SetStateAction<Author | undefined | null>>;
  setTimeSeriesFile?: React.Dispatch<
    React.SetStateAction<string | undefined | null>
  >;
  setPrivacyStatus?: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  setCreatedAt?: React.Dispatch<React.SetStateAction<string | undefined>>;
  // setSelection: React.Dispatch<
  //   React.SetStateAction<[number, number] | undefined>
  // >;
  setPowers: React.Dispatch<React.SetStateAction<Array<number> | undefined>>;
  setHearts: React.Dispatch<React.SetStateAction<Array<number> | undefined>>;
  setElevations: React.Dispatch<
    React.SetStateAction<Array<ActivityItem> | undefined>
  >;
}

export interface RunSignupResultsType {
  headings: Array<{
    key: string;
    sortKey?: string;
    tooltip?: string;
    name: string;
    style: string;
    hidden: boolean;
  }>;
  resultSet: {
    results: [Array<string | number>];
    nonGroupedDivisionIds: [number];
    splits: Array<{
      split_id: number;
      individual_result_set_id: number;
      split_name: string;
      split_order: number;
      split_distance: null;
      split_distance_units: null;
      pace_type: "N";
      approx_percent_time_complete: null;
      deleeted: "F";
      include_split_place: "F";
    }>;
    numResults: number;
    setInfo: {
      individual_result_set_id: number;
      race_category_id: number;
    };
  };
  divisions: Array<{
    race_division_id: number;
    division_name: string;
    division_short_name: string;
    show_top_num: number;
    gender: string | null;
    max_age: string | null;
    min_age: string | null;
  }>;
}

export type NotificationType = {
  message: string;
  type: "Error" | "Info";
};

export type AnalysisType = {
  powerAnalysis?: object;
  heartAnalysis?: object;
  cadenceAnalysis?: object;
  tempAnalysis?: object;
  elevationTotal?: number;
  normalizedPower?: number;
};

export type ResultsType = {
  raceResults?: string;
  webscorerResults?: string;
  crossResults?: CrossResultsPreviewType;
  omniResults?: OmniResultType;
  runSignupResults?: OmniResultType;
};

export type PostStateType = {
  id: string;
  title: string;
  subhead?: string;
  postLocation?: string;
  activity?: Array<ActivityItem>;
  gpxFile?: string;
  stravaUrl?: string;
  date?: string;
  components: Array<CustomElement>;
  images: Array<CloudinaryImage>;
  currentFtp?: number;
  resultsUrl: string;
  analysis: AnalysisType;
  author?: string;
  distance?: number;
  elapsedTime?: number;
  stoppedTime?: number;
  timeInRed?: number;
  powerZones: Array<any>;
  powerZoneBuckets: Array<any>;
  heroImage?: object;
  shortUrl?: string;
  __typename: string;
  results: ResultsType;
  timeSeriesFile?: string;
  privacyStatus: string;
  createdAt: string;
  powers?: Array<number>;
  hearts?: Array<number>;
  elevations?: Array<ActivityItem>;
};

export type PostNewContextType = {
  state: PostStateType;
  setState: React.Dispatch<React.SetStateAction<PostStateType>>;
};
