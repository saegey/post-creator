import { CognitoUser } from "@aws-amplify/auth";
// import { CloudinaryImage } from "../components/AddImage";
import { BaseEditor, Element } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";
import { BaseElement } from "slate";

import { Author, RaceResultRow } from "../components/PostContext";

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
  };
}

export interface CloudinaryImage {
  asset_id: string;
  public_id: string;
  secure_url: string;
  format: "jpeg" | "jpg" | "png";
  width: number;
  height: number;
  colors: Array<string>;
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
};

export type MatchesBurnedType = {
  type: "matchesBurned";
  children: CustomText[];
};

export type ActivityOverviewType = {
  type: "activityOverview";
  children: CustomText[];
  void: true;
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
  | RaceResultsDotComType;

export type FormattedText = {
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
  d: number;
  e: number;
  g: number;
  t: number;
}

export interface PowerZoneType {
  powerLow: number;
  powerHigh: number;
  zone: number;
  title: string;
}

export interface TimeSeriesDataType {
  coordinates: Array<[number, number, number]> | undefined;
  elevation: number[] | undefined;
  distances: number[] | undefined;
  elevationGrades: number[] | undefined;
  powerAnalysis: Array<Record<number | string, number>> | undefined;
  powers: number[] | undefined;
  hearts: number[] | undefined;
}

export interface PostViewType {
  id: string;
  title: string;
  subhead?: string | null;
  components?: string | null;
  timeSeriesFile?: string | null;
  __typename: "PublishedPost" | "Post";
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
  images?: string | null;
  currentFtp?: string | null;
  date?: string | null;
  postLocation?: string | null;
  author?: Author | null;
  powerZoneBuckets?: string | null;
  shortUrl?: string | null;
  normalizedPower?: number | null;
  owner?: string | null;
  originalPostId?: string | null;
}

export interface PostType {
  postId: string;
  postTitle: string;
  postImages: Array<CloudinaryImage>;
  postSubhead: string;
  postGpxFile: string;
  postLocationOrig: string;
  postComponents: Array<CustomElement>;
  postResultsUrl: string | undefined;
  postStravaUrl: string | undefined;
  postCurrentFtp: number | undefined;
  postElevationTotal: number | undefined;
  postNormalizedPower: number | undefined;
  postDistance: number | undefined;
  postElapsedTime: number | undefined;
  postStoppedTime: number | undefined;
  postTimeInRed: number | undefined;
  postHeartAnalysis: Array<Record<number | string, number>>;
  postPowerAnalysis: Array<Record<number | string, number>>;
  postCadenceAnalysis: Array<Record<number | string, number>>;
  postTempAnalysis: Array<Record<number | string, number>>;
  postPowerZones: PowerZoneType[];
  postPowerZoneBuckets: Array<number>;
  postHeroImage: CloudinaryImage | undefined;
  postDate: string | undefined;
  postAuthor:
    | {
        fullName: string;
        image: string;
      }
    | undefined;
  postShortUrl: string | undefined;
  postRaceResults: RaceResultRow | undefined;
  postTimeSeriesFile: string | undefined;
  postPrivacyStatus: string | undefined;
  postCreatedAt: string | undefined;
  errorCode?: number;
  user: IUser;
}
