/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type UpdatePostInput = {
  type?: string | null;
  id: string;
  title?: string | null;
  gpxFile?: string | null;
  images?: string | null;
  headerImage?: string | null;
  date?: string | null;
  publishedDate?: string | null;
  location?: string | null;
  postLocation?: string | null;
  stravaUrl?: string | null;
  resultsUrl?: string | null;
  timeSeriesFile?: string | null;
  subType?: string | null;
  teaser?: string | null;
  currentFtp?: string | null;
  components?: string | null;
  powerAnalysis?: string | null;
  coordinates?: string | null;
  powers?: string | null;
  elevation?: string | null;
  elevationGrades?: string | null;
  distances?: string | null;
  elevationTotal?: number | null;
  normalizedPower?: number | null;
  distance?: number | null;
  heartAnalysis?: string | null;
  cadenceAnalysis?: string | null;
  tempAnalysis?: string | null;
  elapsedTime?: number | null;
  stoppedTime?: number | null;
  timeInRed?: number | null;
  powerZones?: string | null;
  powerZoneBuckets?: string | null;
  createdAt?: string | null;
  heroImage?: string | null;
  subhead?: string | null;
  shortUrl?: string | null;
  raceResults?: string | null;
  raceResultsProvider?: string | null;
  privacyStatus?: string | null;
  blogPostsId?: string | null;
  postRelatedId?: string | null;
  postAuthorId?: string | null;
};

export type ModelPostConditionInput = {
  type?: ModelStringInput | null;
  title?: ModelStringInput | null;
  gpxFile?: ModelStringInput | null;
  images?: ModelStringInput | null;
  headerImage?: ModelStringInput | null;
  date?: ModelStringInput | null;
  publishedDate?: ModelStringInput | null;
  location?: ModelStringInput | null;
  postLocation?: ModelStringInput | null;
  stravaUrl?: ModelStringInput | null;
  resultsUrl?: ModelStringInput | null;
  timeSeriesFile?: ModelStringInput | null;
  subType?: ModelStringInput | null;
  teaser?: ModelStringInput | null;
  currentFtp?: ModelStringInput | null;
  components?: ModelStringInput | null;
  powerAnalysis?: ModelStringInput | null;
  coordinates?: ModelStringInput | null;
  powers?: ModelStringInput | null;
  elevation?: ModelStringInput | null;
  elevationGrades?: ModelStringInput | null;
  distances?: ModelStringInput | null;
  elevationTotal?: ModelFloatInput | null;
  normalizedPower?: ModelFloatInput | null;
  distance?: ModelFloatInput | null;
  heartAnalysis?: ModelStringInput | null;
  cadenceAnalysis?: ModelStringInput | null;
  tempAnalysis?: ModelStringInput | null;
  elapsedTime?: ModelIntInput | null;
  stoppedTime?: ModelIntInput | null;
  timeInRed?: ModelIntInput | null;
  powerZones?: ModelStringInput | null;
  powerZoneBuckets?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  heroImage?: ModelStringInput | null;
  subhead?: ModelStringInput | null;
  shortUrl?: ModelStringInput | null;
  raceResults?: ModelStringInput | null;
  raceResultsProvider?: ModelStringInput | null;
  privacyStatus?: ModelStringInput | null;
  and?: Array<ModelPostConditionInput | null> | null;
  or?: Array<ModelPostConditionInput | null> | null;
  not?: ModelPostConditionInput | null;
  blogPostsId?: ModelIDInput | null;
  postRelatedId?: ModelIDInput | null;
  postAuthorId?: ModelIDInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelFloatInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type Post = {
  __typename: "Post";
  type: string;
  id: string;
  title: string;
  gpxFile?: string | null;
  images?: string | null;
  headerImage?: string | null;
  date?: string | null;
  publishedDate?: string | null;
  location?: string | null;
  postLocation?: string | null;
  stravaUrl?: string | null;
  resultsUrl?: string | null;
  timeSeriesFile?: string | null;
  subType?: string | null;
  teaser?: string | null;
  currentFtp?: string | null;
  components?: string | null;
  powerAnalysis?: string | null;
  coordinates?: string | null;
  powers?: string | null;
  elevation?: string | null;
  elevationGrades?: string | null;
  distances?: string | null;
  blog?: Blog | null;
  related?: ModelPostConnection | null;
  author?: User | null;
  elevationTotal?: number | null;
  normalizedPower?: number | null;
  distance?: number | null;
  heartAnalysis?: string | null;
  cadenceAnalysis?: string | null;
  tempAnalysis?: string | null;
  elapsedTime?: number | null;
  stoppedTime?: number | null;
  timeInRed?: number | null;
  powerZones?: string | null;
  powerZoneBuckets?: string | null;
  createdAt: string;
  heroImage?: string | null;
  subhead?: string | null;
  shortUrl?: string | null;
  raceResults?: string | null;
  raceResultsProvider?: string | null;
  privacyStatus?: string | null;
  updatedAt: string;
  blogPostsId?: string | null;
  postRelatedId?: string | null;
  postAuthorId?: string | null;
  owner?: string | null;
};

export type Blog = {
  __typename: "Blog";
  id: string;
  name: string;
  posts?: ModelPostConnection | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type ModelPostConnection = {
  __typename: "ModelPostConnection";
  items: Array<Post | null>;
  nextToken?: string | null;
};

export type User = {
  __typename: "User";
  id: string;
  fullName: string;
  email: string;
  image?: string | null;
  username?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type ModelPublishedPostConnection = {
  __typename: "ModelPublishedPostConnection";
  items: Array<PublishedPost | null>;
  nextToken?: string | null;
};

export type PublishedPost = {
  __typename: "PublishedPost";
  id: string;
  title: string;
  gpxFile?: string | null;
  images?: string | null;
  headerImage?: string | null;
  date?: string | null;
  publishedDate?: string | null;
  location?: string | null;
  postLocation?: string | null;
  stravaUrl?: string | null;
  resultsUrl?: string | null;
  type?: string | null;
  subType?: string | null;
  teaser?: string | null;
  currentFtp?: string | null;
  components?: string | null;
  powerAnalysis?: string | null;
  coordinates?: string | null;
  powers?: string | null;
  elevation?: string | null;
  elevationGrades?: string | null;
  distances?: string | null;
  author?: string | null;
  elevationTotal?: number | null;
  normalizedPower?: number | null;
  distance?: number | null;
  heartAnalysis?: string | null;
  cadenceAnalysis?: string | null;
  tempAnalysis?: string | null;
  elapsedTime?: number | null;
  stoppedTime?: number | null;
  timeInRed?: number | null;
  powerZones?: string | null;
  timeSeriesFile?: string | null;
  powerZoneBuckets?: string | null;
  createdAt: string;
  heroImage?: string | null;
  subhead?: string | null;
  shortUrl?: string | null;
  raceResults?: string | null;
  raceResultsProvider?: string | null;
  originalPostId?: string | null;
  originalPost?: Post | null;
  updatedAt: string;
  publishedPostOriginalPostId?: string | null;
  owner?: string | null;
};

export type ModelPublishedPostFilterInput = {
  id?: ModelIDInput | null;
  title?: ModelStringInput | null;
  gpxFile?: ModelStringInput | null;
  images?: ModelStringInput | null;
  headerImage?: ModelStringInput | null;
  date?: ModelStringInput | null;
  publishedDate?: ModelStringInput | null;
  location?: ModelStringInput | null;
  postLocation?: ModelStringInput | null;
  stravaUrl?: ModelStringInput | null;
  resultsUrl?: ModelStringInput | null;
  type?: ModelStringInput | null;
  subType?: ModelStringInput | null;
  teaser?: ModelStringInput | null;
  currentFtp?: ModelStringInput | null;
  components?: ModelStringInput | null;
  powerAnalysis?: ModelStringInput | null;
  coordinates?: ModelStringInput | null;
  powers?: ModelStringInput | null;
  elevation?: ModelStringInput | null;
  elevationGrades?: ModelStringInput | null;
  distances?: ModelStringInput | null;
  author?: ModelStringInput | null;
  elevationTotal?: ModelFloatInput | null;
  normalizedPower?: ModelFloatInput | null;
  distance?: ModelFloatInput | null;
  heartAnalysis?: ModelStringInput | null;
  cadenceAnalysis?: ModelStringInput | null;
  tempAnalysis?: ModelStringInput | null;
  elapsedTime?: ModelIntInput | null;
  stoppedTime?: ModelIntInput | null;
  timeInRed?: ModelIntInput | null;
  powerZones?: ModelStringInput | null;
  timeSeriesFile?: ModelStringInput | null;
  powerZoneBuckets?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  heroImage?: ModelStringInput | null;
  subhead?: ModelStringInput | null;
  shortUrl?: ModelStringInput | null;
  raceResults?: ModelStringInput | null;
  raceResultsProvider?: ModelStringInput | null;
  originalPostId?: ModelStringInput | null;
  and?: Array<ModelPublishedPostFilterInput | null> | null;
  or?: Array<ModelPublishedPostFilterInput | null> | null;
  not?: ModelPublishedPostFilterInput | null;
  publishedPostOriginalPostId?: ModelIDInput | null;
};

export type ModelPostFilterInput = {
  type?: ModelStringInput | null;
  id?: ModelIDInput | null;
  title?: ModelStringInput | null;
  gpxFile?: ModelStringInput | null;
  images?: ModelStringInput | null;
  headerImage?: ModelStringInput | null;
  date?: ModelStringInput | null;
  publishedDate?: ModelStringInput | null;
  location?: ModelStringInput | null;
  postLocation?: ModelStringInput | null;
  stravaUrl?: ModelStringInput | null;
  resultsUrl?: ModelStringInput | null;
  timeSeriesFile?: ModelStringInput | null;
  subType?: ModelStringInput | null;
  teaser?: ModelStringInput | null;
  currentFtp?: ModelStringInput | null;
  components?: ModelStringInput | null;
  powerAnalysis?: ModelStringInput | null;
  coordinates?: ModelStringInput | null;
  powers?: ModelStringInput | null;
  elevation?: ModelStringInput | null;
  elevationGrades?: ModelStringInput | null;
  distances?: ModelStringInput | null;
  elevationTotal?: ModelFloatInput | null;
  normalizedPower?: ModelFloatInput | null;
  distance?: ModelFloatInput | null;
  heartAnalysis?: ModelStringInput | null;
  cadenceAnalysis?: ModelStringInput | null;
  tempAnalysis?: ModelStringInput | null;
  elapsedTime?: ModelIntInput | null;
  stoppedTime?: ModelIntInput | null;
  timeInRed?: ModelIntInput | null;
  powerZones?: ModelStringInput | null;
  powerZoneBuckets?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  heroImage?: ModelStringInput | null;
  subhead?: ModelStringInput | null;
  shortUrl?: ModelStringInput | null;
  raceResults?: ModelStringInput | null;
  raceResultsProvider?: ModelStringInput | null;
  privacyStatus?: ModelStringInput | null;
  and?: Array<ModelPostFilterInput | null> | null;
  or?: Array<ModelPostFilterInput | null> | null;
  not?: ModelPostFilterInput | null;
  blogPostsId?: ModelIDInput | null;
  postRelatedId?: ModelIDInput | null;
  postAuthorId?: ModelIDInput | null;
};

export type CreateUserInput = {
  id?: string | null;
  fullName: string;
  email: string;
  image?: string | null;
  username?: string | null;
};

export type ModelUserConditionInput = {
  fullName?: ModelStringInput | null;
  email?: ModelStringInput | null;
  image?: ModelStringInput | null;
  username?: ModelStringInput | null;
  and?: Array<ModelUserConditionInput | null> | null;
  or?: Array<ModelUserConditionInput | null> | null;
  not?: ModelUserConditionInput | null;
};

export type UpdateUserInput = {
  id: string;
  fullName?: string | null;
  email?: string | null;
  image?: string | null;
  username?: string | null;
};

export type DeleteUserInput = {
  id: string;
};

export type CreateBlogInput = {
  id?: string | null;
  name: string;
};

export type ModelBlogConditionInput = {
  name?: ModelStringInput | null;
  and?: Array<ModelBlogConditionInput | null> | null;
  or?: Array<ModelBlogConditionInput | null> | null;
  not?: ModelBlogConditionInput | null;
};

export type UpdateBlogInput = {
  id: string;
  name?: string | null;
};

export type DeleteBlogInput = {
  id: string;
};

export type CreatePublishedPostInput = {
  id?: string | null;
  title: string;
  gpxFile?: string | null;
  images?: string | null;
  headerImage?: string | null;
  date?: string | null;
  publishedDate?: string | null;
  location?: string | null;
  postLocation?: string | null;
  stravaUrl?: string | null;
  resultsUrl?: string | null;
  type?: string | null;
  subType?: string | null;
  teaser?: string | null;
  currentFtp?: string | null;
  components?: string | null;
  powerAnalysis?: string | null;
  coordinates?: string | null;
  powers?: string | null;
  elevation?: string | null;
  elevationGrades?: string | null;
  distances?: string | null;
  author?: string | null;
  elevationTotal?: number | null;
  normalizedPower?: number | null;
  distance?: number | null;
  heartAnalysis?: string | null;
  cadenceAnalysis?: string | null;
  tempAnalysis?: string | null;
  elapsedTime?: number | null;
  stoppedTime?: number | null;
  timeInRed?: number | null;
  powerZones?: string | null;
  timeSeriesFile?: string | null;
  powerZoneBuckets?: string | null;
  createdAt?: string | null;
  heroImage?: string | null;
  subhead?: string | null;
  shortUrl?: string | null;
  raceResults?: string | null;
  raceResultsProvider?: string | null;
  originalPostId?: string | null;
  publishedPostOriginalPostId?: string | null;
};

export type ModelPublishedPostConditionInput = {
  title?: ModelStringInput | null;
  gpxFile?: ModelStringInput | null;
  images?: ModelStringInput | null;
  headerImage?: ModelStringInput | null;
  date?: ModelStringInput | null;
  publishedDate?: ModelStringInput | null;
  location?: ModelStringInput | null;
  postLocation?: ModelStringInput | null;
  stravaUrl?: ModelStringInput | null;
  resultsUrl?: ModelStringInput | null;
  type?: ModelStringInput | null;
  subType?: ModelStringInput | null;
  teaser?: ModelStringInput | null;
  currentFtp?: ModelStringInput | null;
  components?: ModelStringInput | null;
  powerAnalysis?: ModelStringInput | null;
  coordinates?: ModelStringInput | null;
  powers?: ModelStringInput | null;
  elevation?: ModelStringInput | null;
  elevationGrades?: ModelStringInput | null;
  distances?: ModelStringInput | null;
  author?: ModelStringInput | null;
  elevationTotal?: ModelFloatInput | null;
  normalizedPower?: ModelFloatInput | null;
  distance?: ModelFloatInput | null;
  heartAnalysis?: ModelStringInput | null;
  cadenceAnalysis?: ModelStringInput | null;
  tempAnalysis?: ModelStringInput | null;
  elapsedTime?: ModelIntInput | null;
  stoppedTime?: ModelIntInput | null;
  timeInRed?: ModelIntInput | null;
  powerZones?: ModelStringInput | null;
  timeSeriesFile?: ModelStringInput | null;
  powerZoneBuckets?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  heroImage?: ModelStringInput | null;
  subhead?: ModelStringInput | null;
  shortUrl?: ModelStringInput | null;
  raceResults?: ModelStringInput | null;
  raceResultsProvider?: ModelStringInput | null;
  originalPostId?: ModelStringInput | null;
  and?: Array<ModelPublishedPostConditionInput | null> | null;
  or?: Array<ModelPublishedPostConditionInput | null> | null;
  not?: ModelPublishedPostConditionInput | null;
  publishedPostOriginalPostId?: ModelIDInput | null;
};

export type UpdatePublishedPostInput = {
  id: string;
  title?: string | null;
  gpxFile?: string | null;
  images?: string | null;
  headerImage?: string | null;
  date?: string | null;
  publishedDate?: string | null;
  location?: string | null;
  postLocation?: string | null;
  stravaUrl?: string | null;
  resultsUrl?: string | null;
  type?: string | null;
  subType?: string | null;
  teaser?: string | null;
  currentFtp?: string | null;
  components?: string | null;
  powerAnalysis?: string | null;
  coordinates?: string | null;
  powers?: string | null;
  elevation?: string | null;
  elevationGrades?: string | null;
  distances?: string | null;
  author?: string | null;
  elevationTotal?: number | null;
  normalizedPower?: number | null;
  distance?: number | null;
  heartAnalysis?: string | null;
  cadenceAnalysis?: string | null;
  tempAnalysis?: string | null;
  elapsedTime?: number | null;
  stoppedTime?: number | null;
  timeInRed?: number | null;
  powerZones?: string | null;
  timeSeriesFile?: string | null;
  powerZoneBuckets?: string | null;
  createdAt?: string | null;
  heroImage?: string | null;
  subhead?: string | null;
  shortUrl?: string | null;
  raceResults?: string | null;
  raceResultsProvider?: string | null;
  originalPostId?: string | null;
  publishedPostOriginalPostId?: string | null;
};

export type DeletePublishedPostInput = {
  id: string;
};

export type CreatePostInput = {
  type: string;
  id?: string | null;
  title: string;
  gpxFile?: string | null;
  images?: string | null;
  headerImage?: string | null;
  date?: string | null;
  publishedDate?: string | null;
  location?: string | null;
  postLocation?: string | null;
  stravaUrl?: string | null;
  resultsUrl?: string | null;
  timeSeriesFile?: string | null;
  subType?: string | null;
  teaser?: string | null;
  currentFtp?: string | null;
  components?: string | null;
  powerAnalysis?: string | null;
  coordinates?: string | null;
  powers?: string | null;
  elevation?: string | null;
  elevationGrades?: string | null;
  distances?: string | null;
  elevationTotal?: number | null;
  normalizedPower?: number | null;
  distance?: number | null;
  heartAnalysis?: string | null;
  cadenceAnalysis?: string | null;
  tempAnalysis?: string | null;
  elapsedTime?: number | null;
  stoppedTime?: number | null;
  timeInRed?: number | null;
  powerZones?: string | null;
  powerZoneBuckets?: string | null;
  createdAt?: string | null;
  heroImage?: string | null;
  subhead?: string | null;
  shortUrl?: string | null;
  raceResults?: string | null;
  raceResultsProvider?: string | null;
  privacyStatus?: string | null;
  blogPostsId?: string | null;
  postRelatedId?: string | null;
  postAuthorId?: string | null;
};

export type DeletePostInput = {
  id: string;
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null;
  fullName?: ModelStringInput | null;
  email?: ModelStringInput | null;
  image?: ModelStringInput | null;
  username?: ModelStringInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  or?: Array<ModelUserFilterInput | null> | null;
  not?: ModelUserFilterInput | null;
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection";
  items: Array<User | null>;
  nextToken?: string | null;
};

export type ModelBlogFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  and?: Array<ModelBlogFilterInput | null> | null;
  or?: Array<ModelBlogFilterInput | null> | null;
  not?: ModelBlogFilterInput | null;
};

export type ModelBlogConnection = {
  __typename: "ModelBlogConnection";
  items: Array<Blog | null>;
  nextToken?: string | null;
};

export type ModelStringKeyConditionInput = {
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  fullName?: ModelSubscriptionStringInput | null;
  email?: ModelSubscriptionStringInput | null;
  image?: ModelSubscriptionStringInput | null;
  username?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionUserFilterInput | null> | null;
  or?: Array<ModelSubscriptionUserFilterInput | null> | null;
};

export type ModelSubscriptionIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionBlogFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  name?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionBlogFilterInput | null> | null;
  or?: Array<ModelSubscriptionBlogFilterInput | null> | null;
};

export type ModelSubscriptionPublishedPostFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  title?: ModelSubscriptionStringInput | null;
  gpxFile?: ModelSubscriptionStringInput | null;
  images?: ModelSubscriptionStringInput | null;
  headerImage?: ModelSubscriptionStringInput | null;
  date?: ModelSubscriptionStringInput | null;
  publishedDate?: ModelSubscriptionStringInput | null;
  location?: ModelSubscriptionStringInput | null;
  postLocation?: ModelSubscriptionStringInput | null;
  stravaUrl?: ModelSubscriptionStringInput | null;
  resultsUrl?: ModelSubscriptionStringInput | null;
  type?: ModelSubscriptionStringInput | null;
  subType?: ModelSubscriptionStringInput | null;
  teaser?: ModelSubscriptionStringInput | null;
  currentFtp?: ModelSubscriptionStringInput | null;
  components?: ModelSubscriptionStringInput | null;
  powerAnalysis?: ModelSubscriptionStringInput | null;
  coordinates?: ModelSubscriptionStringInput | null;
  powers?: ModelSubscriptionStringInput | null;
  elevation?: ModelSubscriptionStringInput | null;
  elevationGrades?: ModelSubscriptionStringInput | null;
  distances?: ModelSubscriptionStringInput | null;
  author?: ModelSubscriptionStringInput | null;
  elevationTotal?: ModelSubscriptionFloatInput | null;
  normalizedPower?: ModelSubscriptionFloatInput | null;
  distance?: ModelSubscriptionFloatInput | null;
  heartAnalysis?: ModelSubscriptionStringInput | null;
  cadenceAnalysis?: ModelSubscriptionStringInput | null;
  tempAnalysis?: ModelSubscriptionStringInput | null;
  elapsedTime?: ModelSubscriptionIntInput | null;
  stoppedTime?: ModelSubscriptionIntInput | null;
  timeInRed?: ModelSubscriptionIntInput | null;
  powerZones?: ModelSubscriptionStringInput | null;
  timeSeriesFile?: ModelSubscriptionStringInput | null;
  powerZoneBuckets?: ModelSubscriptionStringInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  heroImage?: ModelSubscriptionStringInput | null;
  subhead?: ModelSubscriptionStringInput | null;
  shortUrl?: ModelSubscriptionStringInput | null;
  raceResults?: ModelSubscriptionStringInput | null;
  raceResultsProvider?: ModelSubscriptionStringInput | null;
  originalPostId?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionPublishedPostFilterInput | null> | null;
  or?: Array<ModelSubscriptionPublishedPostFilterInput | null> | null;
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  in?: Array<number | null> | null;
  notIn?: Array<number | null> | null;
};

export type ModelSubscriptionIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  in?: Array<number | null> | null;
  notIn?: Array<number | null> | null;
};

export type ModelSubscriptionPostFilterInput = {
  type?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  title?: ModelSubscriptionStringInput | null;
  gpxFile?: ModelSubscriptionStringInput | null;
  images?: ModelSubscriptionStringInput | null;
  headerImage?: ModelSubscriptionStringInput | null;
  date?: ModelSubscriptionStringInput | null;
  publishedDate?: ModelSubscriptionStringInput | null;
  location?: ModelSubscriptionStringInput | null;
  postLocation?: ModelSubscriptionStringInput | null;
  stravaUrl?: ModelSubscriptionStringInput | null;
  resultsUrl?: ModelSubscriptionStringInput | null;
  timeSeriesFile?: ModelSubscriptionStringInput | null;
  subType?: ModelSubscriptionStringInput | null;
  teaser?: ModelSubscriptionStringInput | null;
  currentFtp?: ModelSubscriptionStringInput | null;
  components?: ModelSubscriptionStringInput | null;
  powerAnalysis?: ModelSubscriptionStringInput | null;
  coordinates?: ModelSubscriptionStringInput | null;
  powers?: ModelSubscriptionStringInput | null;
  elevation?: ModelSubscriptionStringInput | null;
  elevationGrades?: ModelSubscriptionStringInput | null;
  distances?: ModelSubscriptionStringInput | null;
  elevationTotal?: ModelSubscriptionFloatInput | null;
  normalizedPower?: ModelSubscriptionFloatInput | null;
  distance?: ModelSubscriptionFloatInput | null;
  heartAnalysis?: ModelSubscriptionStringInput | null;
  cadenceAnalysis?: ModelSubscriptionStringInput | null;
  tempAnalysis?: ModelSubscriptionStringInput | null;
  elapsedTime?: ModelSubscriptionIntInput | null;
  stoppedTime?: ModelSubscriptionIntInput | null;
  timeInRed?: ModelSubscriptionIntInput | null;
  powerZones?: ModelSubscriptionStringInput | null;
  powerZoneBuckets?: ModelSubscriptionStringInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  heroImage?: ModelSubscriptionStringInput | null;
  subhead?: ModelSubscriptionStringInput | null;
  shortUrl?: ModelSubscriptionStringInput | null;
  raceResults?: ModelSubscriptionStringInput | null;
  raceResultsProvider?: ModelSubscriptionStringInput | null;
  privacyStatus?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionPostFilterInput | null> | null;
  or?: Array<ModelSubscriptionPostFilterInput | null> | null;
};

export type UpdatePostMinimalMutationVariables = {
  input: UpdatePostInput;
  condition?: ModelPostConditionInput | null;
};

export type UpdatePostMinimalMutation = {
  updatePost?: {
    __typename: "Post";
    id: string;
    title: string;
    gpxFile?: string | null;
    images?: string | null;
    headerImage?: string | null;
    date?: string | null;
    publishedDate?: string | null;
    location?: string | null;
    postLocation?: string | null;
    stravaUrl?: string | null;
    resultsUrl?: string | null;
    type: string;
    subType?: string | null;
    teaser?: string | null;
    currentFtp?: string | null;
    components?: string | null;
    blog?: {
      __typename: "Blog";
      id: string;
      name: string;
      posts?: {
        __typename: "ModelPostConnection";
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    blogPostsId?: string | null;
    postRelatedId?: string | null;
    owner?: string | null;
  } | null;
};

export type GetActivityQueryQueryVariables = {
  id: string;
};

export type GetActivityQueryQuery = {
  getPost?: {
    __typename: "Post";
    powerAnalysis?: string | null;
  } | null;
};

export type ListPublishedPostsCustomQuery = {
  listPublishedPosts?: {
    __typename: "ModelPublishedPostConnection";
    items: Array<{
      __typename: "PublishedPost";
      id: string;
      shortUrl?: string | null;
    } | null>;
  } | null;
};

export type GetPostInitialQueryVariables = {
  id: string;
};

export type GetPostInitialQuery = {
  getPost?: {
    __typename: "Post";
    id: string;
    title: string;
    subhead?: string | null;
    gpxFile?: string | null;
    images?: string | null;
    headerImage?: string | null;
    date?: string | null;
    publishedDate?: string | null;
    location?: string | null;
    postLocation?: string | null;
    stravaUrl?: string | null;
    resultsUrl?: string | null;
    type: string;
    subType?: string | null;
    teaser?: string | null;
    currentFtp?: string | null;
    components?: string | null;
    elevationTotal?: number | null;
    normalizedPower?: number | null;
    distance?: number | null;
    elapsedTime?: number | null;
    stoppedTime?: number | null;
    timeInRed?: number | null;
    powerAnalysis?: string | null;
    heartAnalysis?: string | null;
    cadenceAnalysis?: string | null;
    tempAnalysis?: string | null;
    powerZones?: string | null;
    powerZoneBuckets?: string | null;
    timeSeriesFile?: string | null;
    coordinates?: string | null;
    powers?: string | null;
    elevation?: string | null;
    elevationGrades?: string | null;
    distances?: string | null;
    heroImage?: string | null;
    blog?: {
      __typename: "Blog";
      id: string;
      name: string;
      posts?: {
        __typename: "ModelPostConnection";
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    author?: {
      __typename: "User";
      id: string;
      fullName: string;
      email: string;
      image?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
    blogPostsId?: string | null;
    postRelatedId?: string | null;
    shortUrl?: string | null;
    raceResults?: string | null;
    privacyStatus?: string | null;
    owner: string | null;
  } | null;
};

export type listPublishedPostsByCreatedAtQueryVariables = {
  filter?: ModelPublishedPostFilterInput | null;
};

export type listPublishedPostsByCreatedAtQuery = {
  listPublishedPostsByCreatedAt?: {
    __typename: "ModelPublishedPostConnection";
    items: Array<{
      __typename: "PublishedPost";
      id: string;
      title: string;
      createdAt: string;
      images?: string | null;
      author?: string | null;
    } | null>;
  } | null;
};

export type listPostsByCreatedAtQueryVariables = {
  filter?: ModelPostFilterInput | null;
};

export type listPostsByCreatedAtQuery = {
  listPostsByCreatedAt?: {
    __typename: "ModelPostConnection";
    items: Array<{
      __typename: "Post";
      id: string;
      title: string;
      createdAt: string;
      images?: string | null;
      author?: {
        __typename: "User";
        id: string;
        username?: string | null;
        fullName: string;
        image?: string | null;
      } | null;
      privacyStatus?: string | null;
    } | null>;
  } | null;
};

export type GetPublishedPostCustomQueryVariables = {
  id: string;
};

export type GetPublishedPostCustomQuery = {
  getPublishedPost?: {
    __typename: "PublishedPost";
    id: string;
    title: string;
    gpxFile?: string | null;
    images?: string | null;
    headerImage?: string | null;
    date?: string | null;
    publishedDate?: string | null;
    location?: string | null;
    postLocation?: string | null;
    stravaUrl?: string | null;
    resultsUrl?: string | null;
    subType?: string | null;
    teaser?: string | null;
    currentFtp?: string | null;
    components?: string | null;
    powerAnalysis?: string | null;
    coordinates?: string | null;
    powers?: string | null;
    elevation?: string | null;
    elevationGrades?: string | null;
    distances?: string | null;
    author?: string | null;
    elevationTotal?: number | null;
    normalizedPower?: number | null;
    distance?: number | null;
    heartAnalysis?: string | null;
    cadenceAnalysis?: string | null;
    tempAnalysis?: string | null;
    elapsedTime?: number | null;
    timeSeriesFile?: string | null;
    stoppedTime?: number | null;
    timeInRed?: number | null;
    powerZones?: string | null;
    powerZoneBuckets?: string | null;
    createdAt: string;
    heroImage?: string | null;
    subhead?: string | null;
    shortUrl?: string | null;
    raceResults?: string | null;
    raceResultsProvider?: string | null;
    updatedAt: string;
    originalPostId?: string | null;
    owner?: string | null;
  } | null;
};

export type CreateUserMutationVariables = {
  input: CreateUserInput;
  condition?: ModelUserConditionInput | null;
};

export type CreateUserMutation = {
  createUser?: {
    __typename: "User";
    id: string;
    fullName: string;
    email: string;
    image?: string | null;
    username?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput;
  condition?: ModelUserConditionInput | null;
};

export type UpdateUserMutation = {
  updateUser?: {
    __typename: "User";
    id: string;
    fullName: string;
    email: string;
    image?: string | null;
    username?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput;
  condition?: ModelUserConditionInput | null;
};

export type DeleteUserMutation = {
  deleteUser?: {
    __typename: "User";
    id: string;
    fullName: string;
    email: string;
    image?: string | null;
    username?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type CreateBlogMutationVariables = {
  input: CreateBlogInput;
  condition?: ModelBlogConditionInput | null;
};

export type CreateBlogMutation = {
  createBlog?: {
    __typename: "Blog";
    id: string;
    name: string;
    posts?: {
      __typename: "ModelPostConnection";
      items: Array<{
        __typename: "Post";
        type: string;
        id: string;
        title: string;
        gpxFile?: string | null;
        images?: string | null;
        headerImage?: string | null;
        date?: string | null;
        publishedDate?: string | null;
        location?: string | null;
        postLocation?: string | null;
        stravaUrl?: string | null;
        resultsUrl?: string | null;
        timeSeriesFile?: string | null;
        subType?: string | null;
        teaser?: string | null;
        currentFtp?: string | null;
        components?: string | null;
        powerAnalysis?: string | null;
        coordinates?: string | null;
        powers?: string | null;
        elevation?: string | null;
        elevationGrades?: string | null;
        distances?: string | null;
        elevationTotal?: number | null;
        normalizedPower?: number | null;
        distance?: number | null;
        heartAnalysis?: string | null;
        cadenceAnalysis?: string | null;
        tempAnalysis?: string | null;
        elapsedTime?: number | null;
        stoppedTime?: number | null;
        timeInRed?: number | null;
        powerZones?: string | null;
        powerZoneBuckets?: string | null;
        createdAt: string;
        heroImage?: string | null;
        subhead?: string | null;
        shortUrl?: string | null;
        raceResults?: string | null;
        raceResultsProvider?: string | null;
        privacyStatus?: string | null;
        updatedAt: string;
        blogPostsId?: string | null;
        postRelatedId?: string | null;
        postAuthorId?: string | null;
        owner?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type UpdateBlogMutationVariables = {
  input: UpdateBlogInput;
  condition?: ModelBlogConditionInput | null;
};

export type UpdateBlogMutation = {
  updateBlog?: {
    __typename: "Blog";
    id: string;
    name: string;
    posts?: {
      __typename: "ModelPostConnection";
      items: Array<{
        __typename: "Post";
        type: string;
        id: string;
        title: string;
        gpxFile?: string | null;
        images?: string | null;
        headerImage?: string | null;
        date?: string | null;
        publishedDate?: string | null;
        location?: string | null;
        postLocation?: string | null;
        stravaUrl?: string | null;
        resultsUrl?: string | null;
        timeSeriesFile?: string | null;
        subType?: string | null;
        teaser?: string | null;
        currentFtp?: string | null;
        components?: string | null;
        powerAnalysis?: string | null;
        coordinates?: string | null;
        powers?: string | null;
        elevation?: string | null;
        elevationGrades?: string | null;
        distances?: string | null;
        elevationTotal?: number | null;
        normalizedPower?: number | null;
        distance?: number | null;
        heartAnalysis?: string | null;
        cadenceAnalysis?: string | null;
        tempAnalysis?: string | null;
        elapsedTime?: number | null;
        stoppedTime?: number | null;
        timeInRed?: number | null;
        powerZones?: string | null;
        powerZoneBuckets?: string | null;
        createdAt: string;
        heroImage?: string | null;
        subhead?: string | null;
        shortUrl?: string | null;
        raceResults?: string | null;
        raceResultsProvider?: string | null;
        privacyStatus?: string | null;
        updatedAt: string;
        blogPostsId?: string | null;
        postRelatedId?: string | null;
        postAuthorId?: string | null;
        owner?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type DeleteBlogMutationVariables = {
  input: DeleteBlogInput;
  condition?: ModelBlogConditionInput | null;
};

export type DeleteBlogMutation = {
  deleteBlog?: {
    __typename: "Blog";
    id: string;
    name: string;
    posts?: {
      __typename: "ModelPostConnection";
      items: Array<{
        __typename: "Post";
        type: string;
        id: string;
        title: string;
        gpxFile?: string | null;
        images?: string | null;
        headerImage?: string | null;
        date?: string | null;
        publishedDate?: string | null;
        location?: string | null;
        postLocation?: string | null;
        stravaUrl?: string | null;
        resultsUrl?: string | null;
        timeSeriesFile?: string | null;
        subType?: string | null;
        teaser?: string | null;
        currentFtp?: string | null;
        components?: string | null;
        powerAnalysis?: string | null;
        coordinates?: string | null;
        powers?: string | null;
        elevation?: string | null;
        elevationGrades?: string | null;
        distances?: string | null;
        elevationTotal?: number | null;
        normalizedPower?: number | null;
        distance?: number | null;
        heartAnalysis?: string | null;
        cadenceAnalysis?: string | null;
        tempAnalysis?: string | null;
        elapsedTime?: number | null;
        stoppedTime?: number | null;
        timeInRed?: number | null;
        powerZones?: string | null;
        powerZoneBuckets?: string | null;
        createdAt: string;
        heroImage?: string | null;
        subhead?: string | null;
        shortUrl?: string | null;
        raceResults?: string | null;
        raceResultsProvider?: string | null;
        privacyStatus?: string | null;
        updatedAt: string;
        blogPostsId?: string | null;
        postRelatedId?: string | null;
        postAuthorId?: string | null;
        owner?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type CreatePublishedPostMutationVariables = {
  input: CreatePublishedPostInput;
  condition?: ModelPublishedPostConditionInput | null;
};

export type CreatePublishedPostMutation = {
  createPublishedPost?: {
    __typename: "PublishedPost";
    id: string;
    title: string;
    gpxFile?: string | null;
    images?: string | null;
    headerImage?: string | null;
    date?: string | null;
    publishedDate?: string | null;
    location?: string | null;
    postLocation?: string | null;
    stravaUrl?: string | null;
    resultsUrl?: string | null;
    type?: string | null;
    subType?: string | null;
    teaser?: string | null;
    currentFtp?: string | null;
    components?: string | null;
    powerAnalysis?: string | null;
    coordinates?: string | null;
    powers?: string | null;
    elevation?: string | null;
    elevationGrades?: string | null;
    distances?: string | null;
    author?: string | null;
    elevationTotal?: number | null;
    normalizedPower?: number | null;
    distance?: number | null;
    heartAnalysis?: string | null;
    cadenceAnalysis?: string | null;
    tempAnalysis?: string | null;
    elapsedTime?: number | null;
    stoppedTime?: number | null;
    timeInRed?: number | null;
    powerZones?: string | null;
    timeSeriesFile?: string | null;
    powerZoneBuckets?: string | null;
    createdAt: string;
    heroImage?: string | null;
    subhead?: string | null;
    shortUrl?: string | null;
    raceResults?: string | null;
    raceResultsProvider?: string | null;
    originalPostId?: string | null;
    originalPost?: {
      __typename: "Post";
      type: string;
      id: string;
      title: string;
      gpxFile?: string | null;
      images?: string | null;
      headerImage?: string | null;
      date?: string | null;
      publishedDate?: string | null;
      location?: string | null;
      postLocation?: string | null;
      stravaUrl?: string | null;
      resultsUrl?: string | null;
      timeSeriesFile?: string | null;
      subType?: string | null;
      teaser?: string | null;
      currentFtp?: string | null;
      components?: string | null;
      powerAnalysis?: string | null;
      coordinates?: string | null;
      powers?: string | null;
      elevation?: string | null;
      elevationGrades?: string | null;
      distances?: string | null;
      blog?: {
        __typename: "Blog";
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null;
      related?: {
        __typename: "ModelPostConnection";
        nextToken?: string | null;
      } | null;
      author?: {
        __typename: "User";
        id: string;
        fullName: string;
        email: string;
        image?: string | null;
        username?: string | null;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null;
      elevationTotal?: number | null;
      normalizedPower?: number | null;
      distance?: number | null;
      heartAnalysis?: string | null;
      cadenceAnalysis?: string | null;
      tempAnalysis?: string | null;
      elapsedTime?: number | null;
      stoppedTime?: number | null;
      timeInRed?: number | null;
      powerZones?: string | null;
      powerZoneBuckets?: string | null;
      createdAt: string;
      heroImage?: string | null;
      subhead?: string | null;
      shortUrl?: string | null;
      raceResults?: string | null;
      raceResultsProvider?: string | null;
      privacyStatus?: string | null;
      updatedAt: string;
      blogPostsId?: string | null;
      postRelatedId?: string | null;
      postAuthorId?: string | null;
      owner?: string | null;
    } | null;
    updatedAt: string;
    publishedPostOriginalPostId?: string | null;
    owner?: string | null;
  } | null;
};

export type UpdatePublishedPostMutationVariables = {
  input: UpdatePublishedPostInput;
  condition?: ModelPublishedPostConditionInput | null;
};

export type UpdatePublishedPostMutation = {
  updatePublishedPost?: {
    __typename: "PublishedPost";
    id: string;
    title: string;
    gpxFile?: string | null;
    images?: string | null;
    headerImage?: string | null;
    date?: string | null;
    publishedDate?: string | null;
    location?: string | null;
    postLocation?: string | null;
    stravaUrl?: string | null;
    resultsUrl?: string | null;
    type?: string | null;
    subType?: string | null;
    teaser?: string | null;
    currentFtp?: string | null;
    components?: string | null;
    powerAnalysis?: string | null;
    coordinates?: string | null;
    powers?: string | null;
    elevation?: string | null;
    elevationGrades?: string | null;
    distances?: string | null;
    author?: string | null;
    elevationTotal?: number | null;
    normalizedPower?: number | null;
    distance?: number | null;
    heartAnalysis?: string | null;
    cadenceAnalysis?: string | null;
    tempAnalysis?: string | null;
    elapsedTime?: number | null;
    stoppedTime?: number | null;
    timeInRed?: number | null;
    powerZones?: string | null;
    timeSeriesFile?: string | null;
    powerZoneBuckets?: string | null;
    createdAt: string;
    heroImage?: string | null;
    subhead?: string | null;
    shortUrl?: string | null;
    raceResults?: string | null;
    raceResultsProvider?: string | null;
    originalPostId?: string | null;
    originalPost?: {
      __typename: "Post";
      type: string;
      id: string;
      title: string;
      gpxFile?: string | null;
      images?: string | null;
      headerImage?: string | null;
      date?: string | null;
      publishedDate?: string | null;
      location?: string | null;
      postLocation?: string | null;
      stravaUrl?: string | null;
      resultsUrl?: string | null;
      timeSeriesFile?: string | null;
      subType?: string | null;
      teaser?: string | null;
      currentFtp?: string | null;
      components?: string | null;
      powerAnalysis?: string | null;
      coordinates?: string | null;
      powers?: string | null;
      elevation?: string | null;
      elevationGrades?: string | null;
      distances?: string | null;
      blog?: {
        __typename: "Blog";
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null;
      related?: {
        __typename: "ModelPostConnection";
        nextToken?: string | null;
      } | null;
      author?: {
        __typename: "User";
        id: string;
        fullName: string;
        email: string;
        image?: string | null;
        username?: string | null;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null;
      elevationTotal?: number | null;
      normalizedPower?: number | null;
      distance?: number | null;
      heartAnalysis?: string | null;
      cadenceAnalysis?: string | null;
      tempAnalysis?: string | null;
      elapsedTime?: number | null;
      stoppedTime?: number | null;
      timeInRed?: number | null;
      powerZones?: string | null;
      powerZoneBuckets?: string | null;
      createdAt: string;
      heroImage?: string | null;
      subhead?: string | null;
      shortUrl?: string | null;
      raceResults?: string | null;
      raceResultsProvider?: string | null;
      privacyStatus?: string | null;
      updatedAt: string;
      blogPostsId?: string | null;
      postRelatedId?: string | null;
      postAuthorId?: string | null;
      owner?: string | null;
    } | null;
    updatedAt: string;
    publishedPostOriginalPostId?: string | null;
    owner?: string | null;
  } | null;
};

export type DeletePublishedPostMutationVariables = {
  input: DeletePublishedPostInput;
  condition?: ModelPublishedPostConditionInput | null;
};

export type DeletePublishedPostMutation = {
  deletePublishedPost?: {
    __typename: "PublishedPost";
    id: string;
    title: string;
    gpxFile?: string | null;
    images?: string | null;
    headerImage?: string | null;
    date?: string | null;
    publishedDate?: string | null;
    location?: string | null;
    postLocation?: string | null;
    stravaUrl?: string | null;
    resultsUrl?: string | null;
    type?: string | null;
    subType?: string | null;
    teaser?: string | null;
    currentFtp?: string | null;
    components?: string | null;
    powerAnalysis?: string | null;
    coordinates?: string | null;
    powers?: string | null;
    elevation?: string | null;
    elevationGrades?: string | null;
    distances?: string | null;
    author?: string | null;
    elevationTotal?: number | null;
    normalizedPower?: number | null;
    distance?: number | null;
    heartAnalysis?: string | null;
    cadenceAnalysis?: string | null;
    tempAnalysis?: string | null;
    elapsedTime?: number | null;
    stoppedTime?: number | null;
    timeInRed?: number | null;
    powerZones?: string | null;
    timeSeriesFile?: string | null;
    powerZoneBuckets?: string | null;
    createdAt: string;
    heroImage?: string | null;
    subhead?: string | null;
    shortUrl?: string | null;
    raceResults?: string | null;
    raceResultsProvider?: string | null;
    originalPostId?: string | null;
    originalPost?: {
      __typename: "Post";
      type: string;
      id: string;
      title: string;
      gpxFile?: string | null;
      images?: string | null;
      headerImage?: string | null;
      date?: string | null;
      publishedDate?: string | null;
      location?: string | null;
      postLocation?: string | null;
      stravaUrl?: string | null;
      resultsUrl?: string | null;
      timeSeriesFile?: string | null;
      subType?: string | null;
      teaser?: string | null;
      currentFtp?: string | null;
      components?: string | null;
      powerAnalysis?: string | null;
      coordinates?: string | null;
      powers?: string | null;
      elevation?: string | null;
      elevationGrades?: string | null;
      distances?: string | null;
      blog?: {
        __typename: "Blog";
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null;
      related?: {
        __typename: "ModelPostConnection";
        nextToken?: string | null;
      } | null;
      author?: {
        __typename: "User";
        id: string;
        fullName: string;
        email: string;
        image?: string | null;
        username?: string | null;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null;
      elevationTotal?: number | null;
      normalizedPower?: number | null;
      distance?: number | null;
      heartAnalysis?: string | null;
      cadenceAnalysis?: string | null;
      tempAnalysis?: string | null;
      elapsedTime?: number | null;
      stoppedTime?: number | null;
      timeInRed?: number | null;
      powerZones?: string | null;
      powerZoneBuckets?: string | null;
      createdAt: string;
      heroImage?: string | null;
      subhead?: string | null;
      shortUrl?: string | null;
      raceResults?: string | null;
      raceResultsProvider?: string | null;
      privacyStatus?: string | null;
      updatedAt: string;
      blogPostsId?: string | null;
      postRelatedId?: string | null;
      postAuthorId?: string | null;
      owner?: string | null;
    } | null;
    updatedAt: string;
    publishedPostOriginalPostId?: string | null;
    owner?: string | null;
  } | null;
};

export type CreatePostMutationVariables = {
  input: CreatePostInput;
  condition?: ModelPostConditionInput | null;
};

export type CreatePostMutation = {
  createPost?: {
    __typename: "Post";
    type: string;
    id: string;
    title: string;
    gpxFile?: string | null;
    images?: string | null;
    headerImage?: string | null;
    date?: string | null;
    publishedDate?: string | null;
    location?: string | null;
    postLocation?: string | null;
    stravaUrl?: string | null;
    resultsUrl?: string | null;
    timeSeriesFile?: string | null;
    subType?: string | null;
    teaser?: string | null;
    currentFtp?: string | null;
    components?: string | null;
    powerAnalysis?: string | null;
    coordinates?: string | null;
    powers?: string | null;
    elevation?: string | null;
    elevationGrades?: string | null;
    distances?: string | null;
    blog?: {
      __typename: "Blog";
      id: string;
      name: string;
      posts?: {
        __typename: "ModelPostConnection";
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    related?: {
      __typename: "ModelPostConnection";
      items: Array<{
        __typename: "Post";
        type: string;
        id: string;
        title: string;
        gpxFile?: string | null;
        images?: string | null;
        headerImage?: string | null;
        date?: string | null;
        publishedDate?: string | null;
        location?: string | null;
        postLocation?: string | null;
        stravaUrl?: string | null;
        resultsUrl?: string | null;
        timeSeriesFile?: string | null;
        subType?: string | null;
        teaser?: string | null;
        currentFtp?: string | null;
        components?: string | null;
        powerAnalysis?: string | null;
        coordinates?: string | null;
        powers?: string | null;
        elevation?: string | null;
        elevationGrades?: string | null;
        distances?: string | null;
        elevationTotal?: number | null;
        normalizedPower?: number | null;
        distance?: number | null;
        heartAnalysis?: string | null;
        cadenceAnalysis?: string | null;
        tempAnalysis?: string | null;
        elapsedTime?: number | null;
        stoppedTime?: number | null;
        timeInRed?: number | null;
        powerZones?: string | null;
        powerZoneBuckets?: string | null;
        createdAt: string;
        heroImage?: string | null;
        subhead?: string | null;
        shortUrl?: string | null;
        raceResults?: string | null;
        raceResultsProvider?: string | null;
        privacyStatus?: string | null;
        updatedAt: string;
        blogPostsId?: string | null;
        postRelatedId?: string | null;
        postAuthorId?: string | null;
        owner?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    author?: {
      __typename: "User";
      id: string;
      fullName: string;
      email: string;
      image?: string | null;
      username?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    elevationTotal?: number | null;
    normalizedPower?: number | null;
    distance?: number | null;
    heartAnalysis?: string | null;
    cadenceAnalysis?: string | null;
    tempAnalysis?: string | null;
    elapsedTime?: number | null;
    stoppedTime?: number | null;
    timeInRed?: number | null;
    powerZones?: string | null;
    powerZoneBuckets?: string | null;
    createdAt: string;
    heroImage?: string | null;
    subhead?: string | null;
    shortUrl?: string | null;
    raceResults?: string | null;
    raceResultsProvider?: string | null;
    privacyStatus?: string | null;
    updatedAt: string;
    blogPostsId?: string | null;
    postRelatedId?: string | null;
    postAuthorId?: string | null;
    owner?: string | null;
  } | null;
};

export type UpdatePostMutationVariables = {
  input: UpdatePostInput;
  condition?: ModelPostConditionInput | null;
};

export type UpdatePostMutation = {
  updatePost?: {
    __typename: "Post";
    type: string;
    id: string;
    title: string;
    gpxFile?: string | null;
    images?: string | null;
    headerImage?: string | null;
    date?: string | null;
    publishedDate?: string | null;
    location?: string | null;
    postLocation?: string | null;
    stravaUrl?: string | null;
    resultsUrl?: string | null;
    timeSeriesFile?: string | null;
    subType?: string | null;
    teaser?: string | null;
    currentFtp?: string | null;
    components?: string | null;
    powerAnalysis?: string | null;
    coordinates?: string | null;
    powers?: string | null;
    elevation?: string | null;
    elevationGrades?: string | null;
    distances?: string | null;
    blog?: {
      __typename: "Blog";
      id: string;
      name: string;
      posts?: {
        __typename: "ModelPostConnection";
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    related?: {
      __typename: "ModelPostConnection";
      items: Array<{
        __typename: "Post";
        type: string;
        id: string;
        title: string;
        gpxFile?: string | null;
        images?: string | null;
        headerImage?: string | null;
        date?: string | null;
        publishedDate?: string | null;
        location?: string | null;
        postLocation?: string | null;
        stravaUrl?: string | null;
        resultsUrl?: string | null;
        timeSeriesFile?: string | null;
        subType?: string | null;
        teaser?: string | null;
        currentFtp?: string | null;
        components?: string | null;
        powerAnalysis?: string | null;
        coordinates?: string | null;
        powers?: string | null;
        elevation?: string | null;
        elevationGrades?: string | null;
        distances?: string | null;
        elevationTotal?: number | null;
        normalizedPower?: number | null;
        distance?: number | null;
        heartAnalysis?: string | null;
        cadenceAnalysis?: string | null;
        tempAnalysis?: string | null;
        elapsedTime?: number | null;
        stoppedTime?: number | null;
        timeInRed?: number | null;
        powerZones?: string | null;
        powerZoneBuckets?: string | null;
        createdAt: string;
        heroImage?: string | null;
        subhead?: string | null;
        shortUrl?: string | null;
        raceResults?: string | null;
        raceResultsProvider?: string | null;
        privacyStatus?: string | null;
        updatedAt: string;
        blogPostsId?: string | null;
        postRelatedId?: string | null;
        postAuthorId?: string | null;
        owner?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    author?: {
      __typename: "User";
      id: string;
      fullName: string;
      email: string;
      image?: string | null;
      username?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    elevationTotal?: number | null;
    normalizedPower?: number | null;
    distance?: number | null;
    heartAnalysis?: string | null;
    cadenceAnalysis?: string | null;
    tempAnalysis?: string | null;
    elapsedTime?: number | null;
    stoppedTime?: number | null;
    timeInRed?: number | null;
    powerZones?: string | null;
    powerZoneBuckets?: string | null;
    createdAt: string;
    heroImage?: string | null;
    subhead?: string | null;
    shortUrl?: string | null;
    raceResults?: string | null;
    raceResultsProvider?: string | null;
    privacyStatus?: string | null;
    updatedAt: string;
    blogPostsId?: string | null;
    postRelatedId?: string | null;
    postAuthorId?: string | null;
    owner?: string | null;
  } | null;
};

export type DeletePostMutationVariables = {
  input: DeletePostInput;
  condition?: ModelPostConditionInput | null;
};

export type DeletePostMutation = {
  deletePost?: {
    __typename: "Post";
    type: string;
    id: string;
    title: string;
    gpxFile?: string | null;
    images?: string | null;
    headerImage?: string | null;
    date?: string | null;
    publishedDate?: string | null;
    location?: string | null;
    postLocation?: string | null;
    stravaUrl?: string | null;
    resultsUrl?: string | null;
    timeSeriesFile?: string | null;
    subType?: string | null;
    teaser?: string | null;
    currentFtp?: string | null;
    components?: string | null;
    powerAnalysis?: string | null;
    coordinates?: string | null;
    powers?: string | null;
    elevation?: string | null;
    elevationGrades?: string | null;
    distances?: string | null;
    blog?: {
      __typename: "Blog";
      id: string;
      name: string;
      posts?: {
        __typename: "ModelPostConnection";
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    related?: {
      __typename: "ModelPostConnection";
      items: Array<{
        __typename: "Post";
        type: string;
        id: string;
        title: string;
        gpxFile?: string | null;
        images?: string | null;
        headerImage?: string | null;
        date?: string | null;
        publishedDate?: string | null;
        location?: string | null;
        postLocation?: string | null;
        stravaUrl?: string | null;
        resultsUrl?: string | null;
        timeSeriesFile?: string | null;
        subType?: string | null;
        teaser?: string | null;
        currentFtp?: string | null;
        components?: string | null;
        powerAnalysis?: string | null;
        coordinates?: string | null;
        powers?: string | null;
        elevation?: string | null;
        elevationGrades?: string | null;
        distances?: string | null;
        elevationTotal?: number | null;
        normalizedPower?: number | null;
        distance?: number | null;
        heartAnalysis?: string | null;
        cadenceAnalysis?: string | null;
        tempAnalysis?: string | null;
        elapsedTime?: number | null;
        stoppedTime?: number | null;
        timeInRed?: number | null;
        powerZones?: string | null;
        powerZoneBuckets?: string | null;
        createdAt: string;
        heroImage?: string | null;
        subhead?: string | null;
        shortUrl?: string | null;
        raceResults?: string | null;
        raceResultsProvider?: string | null;
        privacyStatus?: string | null;
        updatedAt: string;
        blogPostsId?: string | null;
        postRelatedId?: string | null;
        postAuthorId?: string | null;
        owner?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    author?: {
      __typename: "User";
      id: string;
      fullName: string;
      email: string;
      image?: string | null;
      username?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    elevationTotal?: number | null;
    normalizedPower?: number | null;
    distance?: number | null;
    heartAnalysis?: string | null;
    cadenceAnalysis?: string | null;
    tempAnalysis?: string | null;
    elapsedTime?: number | null;
    stoppedTime?: number | null;
    timeInRed?: number | null;
    powerZones?: string | null;
    powerZoneBuckets?: string | null;
    createdAt: string;
    heroImage?: string | null;
    subhead?: string | null;
    shortUrl?: string | null;
    raceResults?: string | null;
    raceResultsProvider?: string | null;
    privacyStatus?: string | null;
    updatedAt: string;
    blogPostsId?: string | null;
    postRelatedId?: string | null;
    postAuthorId?: string | null;
    owner?: string | null;
  } | null;
};

export type GetUserQueryVariables = {
  id: string;
};

export type GetUserQuery = {
  getUser?: {
    __typename: "User";
    id: string;
    fullName: string;
    email: string;
    image?: string | null;
    username?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListUsersQuery = {
  listUsers?: {
    __typename: "ModelUserConnection";
    items: Array<{
      __typename: "User";
      id: string;
      fullName: string;
      email: string;
      image?: string | null;
      username?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetBlogQueryVariables = {
  id: string;
};

export type GetBlogQuery = {
  getBlog?: {
    __typename: "Blog";
    id: string;
    name: string;
    posts?: {
      __typename: "ModelPostConnection";
      items: Array<{
        __typename: "Post";
        type: string;
        id: string;
        title: string;
        gpxFile?: string | null;
        images?: string | null;
        headerImage?: string | null;
        date?: string | null;
        publishedDate?: string | null;
        location?: string | null;
        postLocation?: string | null;
        stravaUrl?: string | null;
        resultsUrl?: string | null;
        timeSeriesFile?: string | null;
        subType?: string | null;
        teaser?: string | null;
        currentFtp?: string | null;
        components?: string | null;
        powerAnalysis?: string | null;
        coordinates?: string | null;
        powers?: string | null;
        elevation?: string | null;
        elevationGrades?: string | null;
        distances?: string | null;
        elevationTotal?: number | null;
        normalizedPower?: number | null;
        distance?: number | null;
        heartAnalysis?: string | null;
        cadenceAnalysis?: string | null;
        tempAnalysis?: string | null;
        elapsedTime?: number | null;
        stoppedTime?: number | null;
        timeInRed?: number | null;
        powerZones?: string | null;
        powerZoneBuckets?: string | null;
        createdAt: string;
        heroImage?: string | null;
        subhead?: string | null;
        shortUrl?: string | null;
        raceResults?: string | null;
        raceResultsProvider?: string | null;
        privacyStatus?: string | null;
        updatedAt: string;
        blogPostsId?: string | null;
        postRelatedId?: string | null;
        postAuthorId?: string | null;
        owner?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type ListBlogsQueryVariables = {
  filter?: ModelBlogFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListBlogsQuery = {
  listBlogs?: {
    __typename: "ModelBlogConnection";
    items: Array<{
      __typename: "Blog";
      id: string;
      name: string;
      posts?: {
        __typename: "ModelPostConnection";
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetPublishedPostQueryVariables = {
  id: string;
};

export type GetPublishedPostQuery = {
  getPublishedPost?: {
    __typename: "PublishedPost";
    id: string;
    title: string;
    gpxFile?: string | null;
    images?: string | null;
    headerImage?: string | null;
    date?: string | null;
    publishedDate?: string | null;
    location?: string | null;
    postLocation?: string | null;
    stravaUrl?: string | null;
    resultsUrl?: string | null;
    type?: string | null;
    subType?: string | null;
    teaser?: string | null;
    currentFtp?: string | null;
    components?: string | null;
    powerAnalysis?: string | null;
    coordinates?: string | null;
    powers?: string | null;
    elevation?: string | null;
    elevationGrades?: string | null;
    distances?: string | null;
    author?: string | null;
    elevationTotal?: number | null;
    normalizedPower?: number | null;
    distance?: number | null;
    heartAnalysis?: string | null;
    cadenceAnalysis?: string | null;
    tempAnalysis?: string | null;
    elapsedTime?: number | null;
    stoppedTime?: number | null;
    timeInRed?: number | null;
    powerZones?: string | null;
    timeSeriesFile?: string | null;
    powerZoneBuckets?: string | null;
    createdAt: string;
    heroImage?: string | null;
    subhead?: string | null;
    shortUrl?: string | null;
    raceResults?: string | null;
    raceResultsProvider?: string | null;
    originalPostId?: string | null;
    originalPost?: {
      __typename: "Post";
      type: string;
      id: string;
      title: string;
      gpxFile?: string | null;
      images?: string | null;
      headerImage?: string | null;
      date?: string | null;
      publishedDate?: string | null;
      location?: string | null;
      postLocation?: string | null;
      stravaUrl?: string | null;
      resultsUrl?: string | null;
      timeSeriesFile?: string | null;
      subType?: string | null;
      teaser?: string | null;
      currentFtp?: string | null;
      components?: string | null;
      powerAnalysis?: string | null;
      coordinates?: string | null;
      powers?: string | null;
      elevation?: string | null;
      elevationGrades?: string | null;
      distances?: string | null;
      blog?: {
        __typename: "Blog";
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null;
      related?: {
        __typename: "ModelPostConnection";
        nextToken?: string | null;
      } | null;
      author?: {
        __typename: "User";
        id: string;
        fullName: string;
        email: string;
        image?: string | null;
        username?: string | null;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null;
      elevationTotal?: number | null;
      normalizedPower?: number | null;
      distance?: number | null;
      heartAnalysis?: string | null;
      cadenceAnalysis?: string | null;
      tempAnalysis?: string | null;
      elapsedTime?: number | null;
      stoppedTime?: number | null;
      timeInRed?: number | null;
      powerZones?: string | null;
      powerZoneBuckets?: string | null;
      createdAt: string;
      heroImage?: string | null;
      subhead?: string | null;
      shortUrl?: string | null;
      raceResults?: string | null;
      raceResultsProvider?: string | null;
      privacyStatus?: string | null;
      updatedAt: string;
      blogPostsId?: string | null;
      postRelatedId?: string | null;
      postAuthorId?: string | null;
      owner?: string | null;
    } | null;
    updatedAt: string;
    publishedPostOriginalPostId?: string | null;
    owner?: string | null;
  } | null;
};

export type ListPublishedPostsQueryVariables = {
  filter?: ModelPublishedPostFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

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

export type ListPublishedPostsQuery = {
  listPublishedPosts?: {
    __typename: "ModelPublishedPostConnection";
    items: Array<{
      __typename: "PublishedPost";
      id: string;
      title: string;
      gpxFile?: string | null;
      images?: string | null;
      headerImage?: string | null;
      date?: string | null;
      publishedDate?: string | null;
      location?: string | null;
      postLocation?: string | null;
      stravaUrl?: string | null;
      resultsUrl?: string | null;
      type?: string | null;
      subType?: string | null;
      teaser?: string | null;
      currentFtp?: string | null;
      components?: string | null;
      powerAnalysis?: string | null;
      coordinates?: string | null;
      powers?: string | null;
      elevation?: string | null;
      elevationGrades?: string | null;
      distances?: string | null;
      author?: string | null;
      elevationTotal?: number | null;
      normalizedPower?: number | null;
      distance?: number | null;
      heartAnalysis?: string | null;
      cadenceAnalysis?: string | null;
      tempAnalysis?: string | null;
      elapsedTime?: number | null;
      stoppedTime?: number | null;
      timeInRed?: number | null;
      powerZones?: string | null;
      timeSeriesFile?: string | null;
      powerZoneBuckets?: string | null;
      createdAt: string;
      heroImage?: string | null;
      subhead?: string | null;
      shortUrl?: string | null;
      raceResults?: string | null;
      raceResultsProvider?: string | null;
      originalPostId?: string | null;
      originalPost?: {
        __typename: "Post";
        type: string;
        id: string;
        title: string;
        gpxFile?: string | null;
        images?: string | null;
        headerImage?: string | null;
        date?: string | null;
        publishedDate?: string | null;
        location?: string | null;
        postLocation?: string | null;
        stravaUrl?: string | null;
        resultsUrl?: string | null;
        timeSeriesFile?: string | null;
        subType?: string | null;
        teaser?: string | null;
        currentFtp?: string | null;
        components?: string | null;
        powerAnalysis?: string | null;
        coordinates?: string | null;
        powers?: string | null;
        elevation?: string | null;
        elevationGrades?: string | null;
        distances?: string | null;
        elevationTotal?: number | null;
        normalizedPower?: number | null;
        distance?: number | null;
        heartAnalysis?: string | null;
        cadenceAnalysis?: string | null;
        tempAnalysis?: string | null;
        elapsedTime?: number | null;
        stoppedTime?: number | null;
        timeInRed?: number | null;
        powerZones?: string | null;
        powerZoneBuckets?: string | null;
        createdAt: string;
        heroImage?: string | null;
        subhead?: string | null;
        shortUrl?: string | null;
        raceResults?: string | null;
        raceResultsProvider?: string | null;
        privacyStatus?: string | null;
        updatedAt: string;
        blogPostsId?: string | null;
        postRelatedId?: string | null;
        postAuthorId?: string | null;
        owner?: string | null;
      } | null;
      updatedAt: string;
      publishedPostOriginalPostId?: string | null;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListPublishedPostsByCreatedAtQueryVariables = {
  type: string;
  createdAt?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelPublishedPostFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListPublishedPostsByCreatedAtQuery = {
  listPublishedPostsByCreatedAt?: {
    __typename: "ModelPublishedPostConnection";
    items: Array<{
      __typename: "PublishedPost";
      id: string;
      title: string;
      gpxFile?: string | null;
      images?: string | null;
      headerImage?: string | null;
      date?: string | null;
      publishedDate?: string | null;
      location?: string | null;
      postLocation?: string | null;
      stravaUrl?: string | null;
      resultsUrl?: string | null;
      type?: string | null;
      subType?: string | null;
      teaser?: string | null;
      currentFtp?: string | null;
      components?: string | null;
      powerAnalysis?: string | null;
      coordinates?: string | null;
      powers?: string | null;
      elevation?: string | null;
      elevationGrades?: string | null;
      distances?: string | null;
      author?: string | null;
      elevationTotal?: number | null;
      normalizedPower?: number | null;
      distance?: number | null;
      heartAnalysis?: string | null;
      cadenceAnalysis?: string | null;
      tempAnalysis?: string | null;
      elapsedTime?: number | null;
      stoppedTime?: number | null;
      timeInRed?: number | null;
      powerZones?: string | null;
      timeSeriesFile?: string | null;
      powerZoneBuckets?: string | null;
      createdAt: string;
      heroImage?: string | null;
      subhead?: string | null;
      shortUrl?: string | null;
      raceResults?: string | null;
      raceResultsProvider?: string | null;
      originalPostId?: string | null;
      originalPost?: {
        __typename: "Post";
        type: string;
        id: string;
        title: string;
        gpxFile?: string | null;
        images?: string | null;
        headerImage?: string | null;
        date?: string | null;
        publishedDate?: string | null;
        location?: string | null;
        postLocation?: string | null;
        stravaUrl?: string | null;
        resultsUrl?: string | null;
        timeSeriesFile?: string | null;
        subType?: string | null;
        teaser?: string | null;
        currentFtp?: string | null;
        components?: string | null;
        powerAnalysis?: string | null;
        coordinates?: string | null;
        powers?: string | null;
        elevation?: string | null;
        elevationGrades?: string | null;
        distances?: string | null;
        elevationTotal?: number | null;
        normalizedPower?: number | null;
        distance?: number | null;
        heartAnalysis?: string | null;
        cadenceAnalysis?: string | null;
        tempAnalysis?: string | null;
        elapsedTime?: number | null;
        stoppedTime?: number | null;
        timeInRed?: number | null;
        powerZones?: string | null;
        powerZoneBuckets?: string | null;
        createdAt: string;
        heroImage?: string | null;
        subhead?: string | null;
        shortUrl?: string | null;
        raceResults?: string | null;
        raceResultsProvider?: string | null;
        privacyStatus?: string | null;
        updatedAt: string;
        blogPostsId?: string | null;
        postRelatedId?: string | null;
        postAuthorId?: string | null;
        owner?: string | null;
      } | null;
      updatedAt: string;
      publishedPostOriginalPostId?: string | null;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type PublishedPostByOriginalPostIdQueryVariables = {
  originalPostId: string;
  createdAt?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelPublishedPostFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type PublishedPostByOriginalPostIdQuery = {
  PublishedPostByOriginalPostId?: {
    __typename: "ModelPublishedPostConnection";
    items: Array<{
      __typename: "PublishedPost";
      id: string;
      title: string;
      gpxFile?: string | null;
      images?: string | null;
      headerImage?: string | null;
      date?: string | null;
      publishedDate?: string | null;
      location?: string | null;
      postLocation?: string | null;
      stravaUrl?: string | null;
      resultsUrl?: string | null;
      type?: string | null;
      subType?: string | null;
      teaser?: string | null;
      currentFtp?: string | null;
      components?: string | null;
      powerAnalysis?: string | null;
      coordinates?: string | null;
      powers?: string | null;
      elevation?: string | null;
      elevationGrades?: string | null;
      distances?: string | null;
      author?: string | null;
      elevationTotal?: number | null;
      normalizedPower?: number | null;
      distance?: number | null;
      heartAnalysis?: string | null;
      cadenceAnalysis?: string | null;
      tempAnalysis?: string | null;
      elapsedTime?: number | null;
      stoppedTime?: number | null;
      timeInRed?: number | null;
      powerZones?: string | null;
      timeSeriesFile?: string | null;
      powerZoneBuckets?: string | null;
      createdAt: string;
      heroImage?: string | null;
      subhead?: string | null;
      shortUrl?: string | null;
      raceResults?: string | null;
      raceResultsProvider?: string | null;
      originalPostId?: string | null;
      originalPost?: {
        __typename: "Post";
        type: string;
        id: string;
        title: string;
        gpxFile?: string | null;
        images?: string | null;
        headerImage?: string | null;
        date?: string | null;
        publishedDate?: string | null;
        location?: string | null;
        postLocation?: string | null;
        stravaUrl?: string | null;
        resultsUrl?: string | null;
        timeSeriesFile?: string | null;
        subType?: string | null;
        teaser?: string | null;
        currentFtp?: string | null;
        components?: string | null;
        powerAnalysis?: string | null;
        coordinates?: string | null;
        powers?: string | null;
        elevation?: string | null;
        elevationGrades?: string | null;
        distances?: string | null;
        elevationTotal?: number | null;
        normalizedPower?: number | null;
        distance?: number | null;
        heartAnalysis?: string | null;
        cadenceAnalysis?: string | null;
        tempAnalysis?: string | null;
        elapsedTime?: number | null;
        stoppedTime?: number | null;
        timeInRed?: number | null;
        powerZones?: string | null;
        powerZoneBuckets?: string | null;
        createdAt: string;
        heroImage?: string | null;
        subhead?: string | null;
        shortUrl?: string | null;
        raceResults?: string | null;
        raceResultsProvider?: string | null;
        privacyStatus?: string | null;
        updatedAt: string;
        blogPostsId?: string | null;
        postRelatedId?: string | null;
        postAuthorId?: string | null;
        owner?: string | null;
      } | null;
      updatedAt: string;
      publishedPostOriginalPostId?: string | null;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetPostQueryVariables = {
  id: string;
};

export type GetPostQuery = {
  getPost?: {
    __typename: "Post";
    type: string;
    id: string;
    title: string;
    gpxFile?: string | null;
    images?: string | null;
    headerImage?: string | null;
    date?: string | null;
    publishedDate?: string | null;
    location?: string | null;
    postLocation?: string | null;
    stravaUrl?: string | null;
    resultsUrl?: string | null;
    timeSeriesFile?: string | null;
    subType?: string | null;
    teaser?: string | null;
    currentFtp?: string | null;
    components?: string | null;
    powerAnalysis?: string | null;
    coordinates?: string | null;
    powers?: string | null;
    elevation?: string | null;
    elevationGrades?: string | null;
    distances?: string | null;
    blog?: {
      __typename: "Blog";
      id: string;
      name: string;
      posts?: {
        __typename: "ModelPostConnection";
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    related?: {
      __typename: "ModelPostConnection";
      items: Array<{
        __typename: "Post";
        type: string;
        id: string;
        title: string;
        gpxFile?: string | null;
        images?: string | null;
        headerImage?: string | null;
        date?: string | null;
        publishedDate?: string | null;
        location?: string | null;
        postLocation?: string | null;
        stravaUrl?: string | null;
        resultsUrl?: string | null;
        timeSeriesFile?: string | null;
        subType?: string | null;
        teaser?: string | null;
        currentFtp?: string | null;
        components?: string | null;
        powerAnalysis?: string | null;
        coordinates?: string | null;
        powers?: string | null;
        elevation?: string | null;
        elevationGrades?: string | null;
        distances?: string | null;
        elevationTotal?: number | null;
        normalizedPower?: number | null;
        distance?: number | null;
        heartAnalysis?: string | null;
        cadenceAnalysis?: string | null;
        tempAnalysis?: string | null;
        elapsedTime?: number | null;
        stoppedTime?: number | null;
        timeInRed?: number | null;
        powerZones?: string | null;
        powerZoneBuckets?: string | null;
        createdAt: string;
        heroImage?: string | null;
        subhead?: string | null;
        shortUrl?: string | null;
        raceResults?: string | null;
        raceResultsProvider?: string | null;
        privacyStatus?: string | null;
        updatedAt: string;
        blogPostsId?: string | null;
        postRelatedId?: string | null;
        postAuthorId?: string | null;
        owner?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    author?: {
      __typename: "User";
      id: string;
      fullName: string;
      email: string;
      image?: string | null;
      username?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    elevationTotal?: number | null;
    normalizedPower?: number | null;
    distance?: number | null;
    heartAnalysis?: string | null;
    cadenceAnalysis?: string | null;
    tempAnalysis?: string | null;
    elapsedTime?: number | null;
    stoppedTime?: number | null;
    timeInRed?: number | null;
    powerZones?: string | null;
    powerZoneBuckets?: string | null;
    createdAt: string;
    heroImage?: string | null;
    subhead?: string | null;
    shortUrl?: string | null;
    raceResults?: string | null;
    raceResultsProvider?: string | null;
    privacyStatus?: string | null;
    updatedAt: string;
    blogPostsId?: string | null;
    postRelatedId?: string | null;
    postAuthorId?: string | null;
    owner?: string | null;
  } | null;
};

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListPostsQuery = {
  listPosts?: {
    __typename: "ModelPostConnection";
    items: Array<{
      __typename: "Post";
      type: string;
      id: string;
      title: string;
      gpxFile?: string | null;
      images?: string | null;
      headerImage?: string | null;
      date?: string | null;
      publishedDate?: string | null;
      location?: string | null;
      postLocation?: string | null;
      stravaUrl?: string | null;
      resultsUrl?: string | null;
      timeSeriesFile?: string | null;
      subType?: string | null;
      teaser?: string | null;
      currentFtp?: string | null;
      components?: string | null;
      powerAnalysis?: string | null;
      coordinates?: string | null;
      powers?: string | null;
      elevation?: string | null;
      elevationGrades?: string | null;
      distances?: string | null;
      blog?: {
        __typename: "Blog";
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null;
      related?: {
        __typename: "ModelPostConnection";
        nextToken?: string | null;
      } | null;
      author?: {
        __typename: "User";
        id: string;
        fullName: string;
        email: string;
        image?: string | null;
        username?: string | null;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null;
      elevationTotal?: number | null;
      normalizedPower?: number | null;
      distance?: number | null;
      heartAnalysis?: string | null;
      cadenceAnalysis?: string | null;
      tempAnalysis?: string | null;
      elapsedTime?: number | null;
      stoppedTime?: number | null;
      timeInRed?: number | null;
      powerZones?: string | null;
      powerZoneBuckets?: string | null;
      createdAt: string;
      heroImage?: string | null;
      subhead?: string | null;
      shortUrl?: string | null;
      raceResults?: string | null;
      raceResultsProvider?: string | null;
      privacyStatus?: string | null;
      updatedAt: string;
      blogPostsId?: string | null;
      postRelatedId?: string | null;
      postAuthorId?: string | null;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListPostsByCreatedAtQueryVariables = {
  type: string;
  createdAt?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelPostFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListPostsByCreatedAtQuery = {
  listPostsByCreatedAt?: {
    __typename: "ModelPostConnection";
    items: Array<{
      __typename: "Post";
      type: string;
      id: string;
      title: string;
      gpxFile?: string | null;
      images?: string | null;
      headerImage?: string | null;
      date?: string | null;
      publishedDate?: string | null;
      location?: string | null;
      postLocation?: string | null;
      stravaUrl?: string | null;
      resultsUrl?: string | null;
      timeSeriesFile?: string | null;
      subType?: string | null;
      teaser?: string | null;
      currentFtp?: string | null;
      components?: string | null;
      powerAnalysis?: string | null;
      coordinates?: string | null;
      powers?: string | null;
      elevation?: string | null;
      elevationGrades?: string | null;
      distances?: string | null;
      blog?: {
        __typename: "Blog";
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null;
      related?: {
        __typename: "ModelPostConnection";
        nextToken?: string | null;
      } | null;
      author?: {
        __typename: "User";
        id: string;
        fullName: string;
        email: string;
        image?: string | null;
        username?: string | null;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null;
      elevationTotal?: number | null;
      normalizedPower?: number | null;
      distance?: number | null;
      heartAnalysis?: string | null;
      cadenceAnalysis?: string | null;
      tempAnalysis?: string | null;
      elapsedTime?: number | null;
      stoppedTime?: number | null;
      timeInRed?: number | null;
      powerZones?: string | null;
      powerZoneBuckets?: string | null;
      createdAt: string;
      heroImage?: string | null;
      subhead?: string | null;
      shortUrl?: string | null;
      raceResults?: string | null;
      raceResultsProvider?: string | null;
      privacyStatus?: string | null;
      updatedAt: string;
      blogPostsId?: string | null;
      postRelatedId?: string | null;
      postAuthorId?: string | null;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null;
  owner?: string | null;
};

export type OnCreateUserSubscription = {
  onCreateUser?: {
    __typename: "User";
    id: string;
    fullName: string;
    email: string;
    image?: string | null;
    username?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null;
  owner?: string | null;
};

export type OnUpdateUserSubscription = {
  onUpdateUser?: {
    __typename: "User";
    id: string;
    fullName: string;
    email: string;
    image?: string | null;
    username?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null;
  owner?: string | null;
};

export type OnDeleteUserSubscription = {
  onDeleteUser?: {
    __typename: "User";
    id: string;
    fullName: string;
    email: string;
    image?: string | null;
    username?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnCreateBlogSubscriptionVariables = {
  filter?: ModelSubscriptionBlogFilterInput | null;
  owner?: string | null;
};

export type OnCreateBlogSubscription = {
  onCreateBlog?: {
    __typename: "Blog";
    id: string;
    name: string;
    posts?: {
      __typename: "ModelPostConnection";
      items: Array<{
        __typename: "Post";
        type: string;
        id: string;
        title: string;
        gpxFile?: string | null;
        images?: string | null;
        headerImage?: string | null;
        date?: string | null;
        publishedDate?: string | null;
        location?: string | null;
        postLocation?: string | null;
        stravaUrl?: string | null;
        resultsUrl?: string | null;
        timeSeriesFile?: string | null;
        subType?: string | null;
        teaser?: string | null;
        currentFtp?: string | null;
        components?: string | null;
        powerAnalysis?: string | null;
        coordinates?: string | null;
        powers?: string | null;
        elevation?: string | null;
        elevationGrades?: string | null;
        distances?: string | null;
        elevationTotal?: number | null;
        normalizedPower?: number | null;
        distance?: number | null;
        heartAnalysis?: string | null;
        cadenceAnalysis?: string | null;
        tempAnalysis?: string | null;
        elapsedTime?: number | null;
        stoppedTime?: number | null;
        timeInRed?: number | null;
        powerZones?: string | null;
        powerZoneBuckets?: string | null;
        createdAt: string;
        heroImage?: string | null;
        subhead?: string | null;
        shortUrl?: string | null;
        raceResults?: string | null;
        raceResultsProvider?: string | null;
        privacyStatus?: string | null;
        updatedAt: string;
        blogPostsId?: string | null;
        postRelatedId?: string | null;
        postAuthorId?: string | null;
        owner?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnUpdateBlogSubscriptionVariables = {
  filter?: ModelSubscriptionBlogFilterInput | null;
  owner?: string | null;
};

export type OnUpdateBlogSubscription = {
  onUpdateBlog?: {
    __typename: "Blog";
    id: string;
    name: string;
    posts?: {
      __typename: "ModelPostConnection";
      items: Array<{
        __typename: "Post";
        type: string;
        id: string;
        title: string;
        gpxFile?: string | null;
        images?: string | null;
        headerImage?: string | null;
        date?: string | null;
        publishedDate?: string | null;
        location?: string | null;
        postLocation?: string | null;
        stravaUrl?: string | null;
        resultsUrl?: string | null;
        timeSeriesFile?: string | null;
        subType?: string | null;
        teaser?: string | null;
        currentFtp?: string | null;
        components?: string | null;
        powerAnalysis?: string | null;
        coordinates?: string | null;
        powers?: string | null;
        elevation?: string | null;
        elevationGrades?: string | null;
        distances?: string | null;
        elevationTotal?: number | null;
        normalizedPower?: number | null;
        distance?: number | null;
        heartAnalysis?: string | null;
        cadenceAnalysis?: string | null;
        tempAnalysis?: string | null;
        elapsedTime?: number | null;
        stoppedTime?: number | null;
        timeInRed?: number | null;
        powerZones?: string | null;
        powerZoneBuckets?: string | null;
        createdAt: string;
        heroImage?: string | null;
        subhead?: string | null;
        shortUrl?: string | null;
        raceResults?: string | null;
        raceResultsProvider?: string | null;
        privacyStatus?: string | null;
        updatedAt: string;
        blogPostsId?: string | null;
        postRelatedId?: string | null;
        postAuthorId?: string | null;
        owner?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnDeleteBlogSubscriptionVariables = {
  filter?: ModelSubscriptionBlogFilterInput | null;
  owner?: string | null;
};

export type OnDeleteBlogSubscription = {
  onDeleteBlog?: {
    __typename: "Blog";
    id: string;
    name: string;
    posts?: {
      __typename: "ModelPostConnection";
      items: Array<{
        __typename: "Post";
        type: string;
        id: string;
        title: string;
        gpxFile?: string | null;
        images?: string | null;
        headerImage?: string | null;
        date?: string | null;
        publishedDate?: string | null;
        location?: string | null;
        postLocation?: string | null;
        stravaUrl?: string | null;
        resultsUrl?: string | null;
        timeSeriesFile?: string | null;
        subType?: string | null;
        teaser?: string | null;
        currentFtp?: string | null;
        components?: string | null;
        powerAnalysis?: string | null;
        coordinates?: string | null;
        powers?: string | null;
        elevation?: string | null;
        elevationGrades?: string | null;
        distances?: string | null;
        elevationTotal?: number | null;
        normalizedPower?: number | null;
        distance?: number | null;
        heartAnalysis?: string | null;
        cadenceAnalysis?: string | null;
        tempAnalysis?: string | null;
        elapsedTime?: number | null;
        stoppedTime?: number | null;
        timeInRed?: number | null;
        powerZones?: string | null;
        powerZoneBuckets?: string | null;
        createdAt: string;
        heroImage?: string | null;
        subhead?: string | null;
        shortUrl?: string | null;
        raceResults?: string | null;
        raceResultsProvider?: string | null;
        privacyStatus?: string | null;
        updatedAt: string;
        blogPostsId?: string | null;
        postRelatedId?: string | null;
        postAuthorId?: string | null;
        owner?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnCreatePublishedPostSubscriptionVariables = {
  filter?: ModelSubscriptionPublishedPostFilterInput | null;
  owner?: string | null;
};

export type OnCreatePublishedPostSubscription = {
  onCreatePublishedPost?: {
    __typename: "PublishedPost";
    id: string;
    title: string;
    gpxFile?: string | null;
    images?: string | null;
    headerImage?: string | null;
    date?: string | null;
    publishedDate?: string | null;
    location?: string | null;
    postLocation?: string | null;
    stravaUrl?: string | null;
    resultsUrl?: string | null;
    type?: string | null;
    subType?: string | null;
    teaser?: string | null;
    currentFtp?: string | null;
    components?: string | null;
    powerAnalysis?: string | null;
    coordinates?: string | null;
    powers?: string | null;
    elevation?: string | null;
    elevationGrades?: string | null;
    distances?: string | null;
    author?: string | null;
    elevationTotal?: number | null;
    normalizedPower?: number | null;
    distance?: number | null;
    heartAnalysis?: string | null;
    cadenceAnalysis?: string | null;
    tempAnalysis?: string | null;
    elapsedTime?: number | null;
    stoppedTime?: number | null;
    timeInRed?: number | null;
    powerZones?: string | null;
    timeSeriesFile?: string | null;
    powerZoneBuckets?: string | null;
    createdAt: string;
    heroImage?: string | null;
    subhead?: string | null;
    shortUrl?: string | null;
    raceResults?: string | null;
    raceResultsProvider?: string | null;
    originalPostId?: string | null;
    originalPost?: {
      __typename: "Post";
      type: string;
      id: string;
      title: string;
      gpxFile?: string | null;
      images?: string | null;
      headerImage?: string | null;
      date?: string | null;
      publishedDate?: string | null;
      location?: string | null;
      postLocation?: string | null;
      stravaUrl?: string | null;
      resultsUrl?: string | null;
      timeSeriesFile?: string | null;
      subType?: string | null;
      teaser?: string | null;
      currentFtp?: string | null;
      components?: string | null;
      powerAnalysis?: string | null;
      coordinates?: string | null;
      powers?: string | null;
      elevation?: string | null;
      elevationGrades?: string | null;
      distances?: string | null;
      blog?: {
        __typename: "Blog";
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null;
      related?: {
        __typename: "ModelPostConnection";
        nextToken?: string | null;
      } | null;
      author?: {
        __typename: "User";
        id: string;
        fullName: string;
        email: string;
        image?: string | null;
        username?: string | null;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null;
      elevationTotal?: number | null;
      normalizedPower?: number | null;
      distance?: number | null;
      heartAnalysis?: string | null;
      cadenceAnalysis?: string | null;
      tempAnalysis?: string | null;
      elapsedTime?: number | null;
      stoppedTime?: number | null;
      timeInRed?: number | null;
      powerZones?: string | null;
      powerZoneBuckets?: string | null;
      createdAt: string;
      heroImage?: string | null;
      subhead?: string | null;
      shortUrl?: string | null;
      raceResults?: string | null;
      raceResultsProvider?: string | null;
      privacyStatus?: string | null;
      updatedAt: string;
      blogPostsId?: string | null;
      postRelatedId?: string | null;
      postAuthorId?: string | null;
      owner?: string | null;
    } | null;
    updatedAt: string;
    publishedPostOriginalPostId?: string | null;
    owner?: string | null;
  } | null;
};

export type OnUpdatePublishedPostSubscriptionVariables = {
  filter?: ModelSubscriptionPublishedPostFilterInput | null;
  owner?: string | null;
};

export type OnUpdatePublishedPostSubscription = {
  onUpdatePublishedPost?: {
    __typename: "PublishedPost";
    id: string;
    title: string;
    gpxFile?: string | null;
    images?: string | null;
    headerImage?: string | null;
    date?: string | null;
    publishedDate?: string | null;
    location?: string | null;
    postLocation?: string | null;
    stravaUrl?: string | null;
    resultsUrl?: string | null;
    type?: string | null;
    subType?: string | null;
    teaser?: string | null;
    currentFtp?: string | null;
    components?: string | null;
    powerAnalysis?: string | null;
    coordinates?: string | null;
    powers?: string | null;
    elevation?: string | null;
    elevationGrades?: string | null;
    distances?: string | null;
    author?: string | null;
    elevationTotal?: number | null;
    normalizedPower?: number | null;
    distance?: number | null;
    heartAnalysis?: string | null;
    cadenceAnalysis?: string | null;
    tempAnalysis?: string | null;
    elapsedTime?: number | null;
    stoppedTime?: number | null;
    timeInRed?: number | null;
    powerZones?: string | null;
    timeSeriesFile?: string | null;
    powerZoneBuckets?: string | null;
    createdAt: string;
    heroImage?: string | null;
    subhead?: string | null;
    shortUrl?: string | null;
    raceResults?: string | null;
    raceResultsProvider?: string | null;
    originalPostId?: string | null;
    originalPost?: {
      __typename: "Post";
      type: string;
      id: string;
      title: string;
      gpxFile?: string | null;
      images?: string | null;
      headerImage?: string | null;
      date?: string | null;
      publishedDate?: string | null;
      location?: string | null;
      postLocation?: string | null;
      stravaUrl?: string | null;
      resultsUrl?: string | null;
      timeSeriesFile?: string | null;
      subType?: string | null;
      teaser?: string | null;
      currentFtp?: string | null;
      components?: string | null;
      powerAnalysis?: string | null;
      coordinates?: string | null;
      powers?: string | null;
      elevation?: string | null;
      elevationGrades?: string | null;
      distances?: string | null;
      blog?: {
        __typename: "Blog";
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null;
      related?: {
        __typename: "ModelPostConnection";
        nextToken?: string | null;
      } | null;
      author?: {
        __typename: "User";
        id: string;
        fullName: string;
        email: string;
        image?: string | null;
        username?: string | null;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null;
      elevationTotal?: number | null;
      normalizedPower?: number | null;
      distance?: number | null;
      heartAnalysis?: string | null;
      cadenceAnalysis?: string | null;
      tempAnalysis?: string | null;
      elapsedTime?: number | null;
      stoppedTime?: number | null;
      timeInRed?: number | null;
      powerZones?: string | null;
      powerZoneBuckets?: string | null;
      createdAt: string;
      heroImage?: string | null;
      subhead?: string | null;
      shortUrl?: string | null;
      raceResults?: string | null;
      raceResultsProvider?: string | null;
      privacyStatus?: string | null;
      updatedAt: string;
      blogPostsId?: string | null;
      postRelatedId?: string | null;
      postAuthorId?: string | null;
      owner?: string | null;
    } | null;
    updatedAt: string;
    publishedPostOriginalPostId?: string | null;
    owner?: string | null;
  } | null;
};

export type OnDeletePublishedPostSubscriptionVariables = {
  filter?: ModelSubscriptionPublishedPostFilterInput | null;
  owner?: string | null;
};

export type OnDeletePublishedPostSubscription = {
  onDeletePublishedPost?: {
    __typename: "PublishedPost";
    id: string;
    title: string;
    gpxFile?: string | null;
    images?: string | null;
    headerImage?: string | null;
    date?: string | null;
    publishedDate?: string | null;
    location?: string | null;
    postLocation?: string | null;
    stravaUrl?: string | null;
    resultsUrl?: string | null;
    type?: string | null;
    subType?: string | null;
    teaser?: string | null;
    currentFtp?: string | null;
    components?: string | null;
    powerAnalysis?: string | null;
    coordinates?: string | null;
    powers?: string | null;
    elevation?: string | null;
    elevationGrades?: string | null;
    distances?: string | null;
    author?: string | null;
    elevationTotal?: number | null;
    normalizedPower?: number | null;
    distance?: number | null;
    heartAnalysis?: string | null;
    cadenceAnalysis?: string | null;
    tempAnalysis?: string | null;
    elapsedTime?: number | null;
    stoppedTime?: number | null;
    timeInRed?: number | null;
    powerZones?: string | null;
    timeSeriesFile?: string | null;
    powerZoneBuckets?: string | null;
    createdAt: string;
    heroImage?: string | null;
    subhead?: string | null;
    shortUrl?: string | null;
    raceResults?: string | null;
    raceResultsProvider?: string | null;
    originalPostId?: string | null;
    originalPost?: {
      __typename: "Post";
      type: string;
      id: string;
      title: string;
      gpxFile?: string | null;
      images?: string | null;
      headerImage?: string | null;
      date?: string | null;
      publishedDate?: string | null;
      location?: string | null;
      postLocation?: string | null;
      stravaUrl?: string | null;
      resultsUrl?: string | null;
      timeSeriesFile?: string | null;
      subType?: string | null;
      teaser?: string | null;
      currentFtp?: string | null;
      components?: string | null;
      powerAnalysis?: string | null;
      coordinates?: string | null;
      powers?: string | null;
      elevation?: string | null;
      elevationGrades?: string | null;
      distances?: string | null;
      blog?: {
        __typename: "Blog";
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null;
      related?: {
        __typename: "ModelPostConnection";
        nextToken?: string | null;
      } | null;
      author?: {
        __typename: "User";
        id: string;
        fullName: string;
        email: string;
        image?: string | null;
        username?: string | null;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null;
      elevationTotal?: number | null;
      normalizedPower?: number | null;
      distance?: number | null;
      heartAnalysis?: string | null;
      cadenceAnalysis?: string | null;
      tempAnalysis?: string | null;
      elapsedTime?: number | null;
      stoppedTime?: number | null;
      timeInRed?: number | null;
      powerZones?: string | null;
      powerZoneBuckets?: string | null;
      createdAt: string;
      heroImage?: string | null;
      subhead?: string | null;
      shortUrl?: string | null;
      raceResults?: string | null;
      raceResultsProvider?: string | null;
      privacyStatus?: string | null;
      updatedAt: string;
      blogPostsId?: string | null;
      postRelatedId?: string | null;
      postAuthorId?: string | null;
      owner?: string | null;
    } | null;
    updatedAt: string;
    publishedPostOriginalPostId?: string | null;
    owner?: string | null;
  } | null;
};

export type OnCreatePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null;
  owner?: string | null;
};

export type OnCreatePostSubscription = {
  onCreatePost?: {
    __typename: "Post";
    type: string;
    id: string;
    title: string;
    gpxFile?: string | null;
    images?: string | null;
    headerImage?: string | null;
    date?: string | null;
    publishedDate?: string | null;
    location?: string | null;
    postLocation?: string | null;
    stravaUrl?: string | null;
    resultsUrl?: string | null;
    timeSeriesFile?: string | null;
    subType?: string | null;
    teaser?: string | null;
    currentFtp?: string | null;
    components?: string | null;
    powerAnalysis?: string | null;
    coordinates?: string | null;
    powers?: string | null;
    elevation?: string | null;
    elevationGrades?: string | null;
    distances?: string | null;
    blog?: {
      __typename: "Blog";
      id: string;
      name: string;
      posts?: {
        __typename: "ModelPostConnection";
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    related?: {
      __typename: "ModelPostConnection";
      items: Array<{
        __typename: "Post";
        type: string;
        id: string;
        title: string;
        gpxFile?: string | null;
        images?: string | null;
        headerImage?: string | null;
        date?: string | null;
        publishedDate?: string | null;
        location?: string | null;
        postLocation?: string | null;
        stravaUrl?: string | null;
        resultsUrl?: string | null;
        timeSeriesFile?: string | null;
        subType?: string | null;
        teaser?: string | null;
        currentFtp?: string | null;
        components?: string | null;
        powerAnalysis?: string | null;
        coordinates?: string | null;
        powers?: string | null;
        elevation?: string | null;
        elevationGrades?: string | null;
        distances?: string | null;
        elevationTotal?: number | null;
        normalizedPower?: number | null;
        distance?: number | null;
        heartAnalysis?: string | null;
        cadenceAnalysis?: string | null;
        tempAnalysis?: string | null;
        elapsedTime?: number | null;
        stoppedTime?: number | null;
        timeInRed?: number | null;
        powerZones?: string | null;
        powerZoneBuckets?: string | null;
        createdAt: string;
        heroImage?: string | null;
        subhead?: string | null;
        shortUrl?: string | null;
        raceResults?: string | null;
        raceResultsProvider?: string | null;
        privacyStatus?: string | null;
        updatedAt: string;
        blogPostsId?: string | null;
        postRelatedId?: string | null;
        postAuthorId?: string | null;
        owner?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    author?: {
      __typename: "User";
      id: string;
      fullName: string;
      email: string;
      image?: string | null;
      username?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    elevationTotal?: number | null;
    normalizedPower?: number | null;
    distance?: number | null;
    heartAnalysis?: string | null;
    cadenceAnalysis?: string | null;
    tempAnalysis?: string | null;
    elapsedTime?: number | null;
    stoppedTime?: number | null;
    timeInRed?: number | null;
    powerZones?: string | null;
    powerZoneBuckets?: string | null;
    createdAt: string;
    heroImage?: string | null;
    subhead?: string | null;
    shortUrl?: string | null;
    raceResults?: string | null;
    raceResultsProvider?: string | null;
    privacyStatus?: string | null;
    updatedAt: string;
    blogPostsId?: string | null;
    postRelatedId?: string | null;
    postAuthorId?: string | null;
    owner?: string | null;
  } | null;
};

export type OnUpdatePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null;
  owner?: string | null;
};

export type OnUpdatePostSubscription = {
  onUpdatePost?: {
    __typename: "Post";
    type: string;
    id: string;
    title: string;
    gpxFile?: string | null;
    images?: string | null;
    headerImage?: string | null;
    date?: string | null;
    publishedDate?: string | null;
    location?: string | null;
    postLocation?: string | null;
    stravaUrl?: string | null;
    resultsUrl?: string | null;
    timeSeriesFile?: string | null;
    subType?: string | null;
    teaser?: string | null;
    currentFtp?: string | null;
    components?: string | null;
    powerAnalysis?: string | null;
    coordinates?: string | null;
    powers?: string | null;
    elevation?: string | null;
    elevationGrades?: string | null;
    distances?: string | null;
    blog?: {
      __typename: "Blog";
      id: string;
      name: string;
      posts?: {
        __typename: "ModelPostConnection";
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    related?: {
      __typename: "ModelPostConnection";
      items: Array<{
        __typename: "Post";
        type: string;
        id: string;
        title: string;
        gpxFile?: string | null;
        images?: string | null;
        headerImage?: string | null;
        date?: string | null;
        publishedDate?: string | null;
        location?: string | null;
        postLocation?: string | null;
        stravaUrl?: string | null;
        resultsUrl?: string | null;
        timeSeriesFile?: string | null;
        subType?: string | null;
        teaser?: string | null;
        currentFtp?: string | null;
        components?: string | null;
        powerAnalysis?: string | null;
        coordinates?: string | null;
        powers?: string | null;
        elevation?: string | null;
        elevationGrades?: string | null;
        distances?: string | null;
        elevationTotal?: number | null;
        normalizedPower?: number | null;
        distance?: number | null;
        heartAnalysis?: string | null;
        cadenceAnalysis?: string | null;
        tempAnalysis?: string | null;
        elapsedTime?: number | null;
        stoppedTime?: number | null;
        timeInRed?: number | null;
        powerZones?: string | null;
        powerZoneBuckets?: string | null;
        createdAt: string;
        heroImage?: string | null;
        subhead?: string | null;
        shortUrl?: string | null;
        raceResults?: string | null;
        raceResultsProvider?: string | null;
        privacyStatus?: string | null;
        updatedAt: string;
        blogPostsId?: string | null;
        postRelatedId?: string | null;
        postAuthorId?: string | null;
        owner?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    author?: {
      __typename: "User";
      id: string;
      fullName: string;
      email: string;
      image?: string | null;
      username?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    elevationTotal?: number | null;
    normalizedPower?: number | null;
    distance?: number | null;
    heartAnalysis?: string | null;
    cadenceAnalysis?: string | null;
    tempAnalysis?: string | null;
    elapsedTime?: number | null;
    stoppedTime?: number | null;
    timeInRed?: number | null;
    powerZones?: string | null;
    powerZoneBuckets?: string | null;
    createdAt: string;
    heroImage?: string | null;
    subhead?: string | null;
    shortUrl?: string | null;
    raceResults?: string | null;
    raceResultsProvider?: string | null;
    privacyStatus?: string | null;
    updatedAt: string;
    blogPostsId?: string | null;
    postRelatedId?: string | null;
    postAuthorId?: string | null;
    owner?: string | null;
  } | null;
};

export type OnDeletePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null;
  owner?: string | null;
};

export type OnDeletePostSubscription = {
  onDeletePost?: {
    __typename: "Post";
    type: string;
    id: string;
    title: string;
    gpxFile?: string | null;
    images?: string | null;
    headerImage?: string | null;
    date?: string | null;
    publishedDate?: string | null;
    location?: string | null;
    postLocation?: string | null;
    stravaUrl?: string | null;
    resultsUrl?: string | null;
    timeSeriesFile?: string | null;
    subType?: string | null;
    teaser?: string | null;
    currentFtp?: string | null;
    components?: string | null;
    powerAnalysis?: string | null;
    coordinates?: string | null;
    powers?: string | null;
    elevation?: string | null;
    elevationGrades?: string | null;
    distances?: string | null;
    blog?: {
      __typename: "Blog";
      id: string;
      name: string;
      posts?: {
        __typename: "ModelPostConnection";
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    related?: {
      __typename: "ModelPostConnection";
      items: Array<{
        __typename: "Post";
        type: string;
        id: string;
        title: string;
        gpxFile?: string | null;
        images?: string | null;
        headerImage?: string | null;
        date?: string | null;
        publishedDate?: string | null;
        location?: string | null;
        postLocation?: string | null;
        stravaUrl?: string | null;
        resultsUrl?: string | null;
        timeSeriesFile?: string | null;
        subType?: string | null;
        teaser?: string | null;
        currentFtp?: string | null;
        components?: string | null;
        powerAnalysis?: string | null;
        coordinates?: string | null;
        powers?: string | null;
        elevation?: string | null;
        elevationGrades?: string | null;
        distances?: string | null;
        elevationTotal?: number | null;
        normalizedPower?: number | null;
        distance?: number | null;
        heartAnalysis?: string | null;
        cadenceAnalysis?: string | null;
        tempAnalysis?: string | null;
        elapsedTime?: number | null;
        stoppedTime?: number | null;
        timeInRed?: number | null;
        powerZones?: string | null;
        powerZoneBuckets?: string | null;
        createdAt: string;
        heroImage?: string | null;
        subhead?: string | null;
        shortUrl?: string | null;
        raceResults?: string | null;
        raceResultsProvider?: string | null;
        privacyStatus?: string | null;
        updatedAt: string;
        blogPostsId?: string | null;
        postRelatedId?: string | null;
        postAuthorId?: string | null;
        owner?: string | null;
      } | null>;
      nextToken?: string | null;
    } | null;
    author?: {
      __typename: "User";
      id: string;
      fullName: string;
      email: string;
      image?: string | null;
      username?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    elevationTotal?: number | null;
    normalizedPower?: number | null;
    distance?: number | null;
    heartAnalysis?: string | null;
    cadenceAnalysis?: string | null;
    tempAnalysis?: string | null;
    elapsedTime?: number | null;
    stoppedTime?: number | null;
    timeInRed?: number | null;
    powerZones?: string | null;
    powerZoneBuckets?: string | null;
    createdAt: string;
    heroImage?: string | null;
    subhead?: string | null;
    shortUrl?: string | null;
    raceResults?: string | null;
    raceResultsProvider?: string | null;
    privacyStatus?: string | null;
    updatedAt: string;
    blogPostsId?: string | null;
    postRelatedId?: string | null;
    postAuthorId?: string | null;
    owner?: string | null;
  } | null;
};
