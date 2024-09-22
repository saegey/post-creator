import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly image?: string | null;
  readonly username?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly image?: string | null;
  readonly username?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerBlog = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Blog, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly posts?: (Post | null)[] | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBlog = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Blog, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly posts: AsyncCollection<Post>;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Blog = LazyLoading extends LazyLoadingDisabled ? EagerBlog : LazyBlog

export declare const Blog: (new (init: ModelInit<Blog>) => Blog) & {
  copyOf(source: Blog, mutator: (draft: MutableModel<Blog>) => MutableModel<Blog> | void): Blog;
}

type EagerPublishedPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PublishedPost, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly gpxFile?: string | null;
  readonly images?: string | null;
  readonly headerImage?: string | null;
  readonly date?: string | null;
  readonly publishedDate?: string | null;
  readonly location?: string | null;
  readonly postLocation?: string | null;
  readonly stravaUrl?: string | null;
  readonly resultsUrl?: string | null;
  readonly type?: string | null;
  readonly subType?: string | null;
  readonly teaser?: string | null;
  readonly currentFtp?: string | null;
  readonly components?: string | null;
  readonly powerAnalysis?: string | null;
  readonly author?: string | null;
  readonly elevationTotal?: number | null;
  readonly normalizedPower?: number | null;
  readonly distance?: number | null;
  readonly heartAnalysis?: string | null;
  readonly cadenceAnalysis?: string | null;
  readonly tempAnalysis?: string | null;
  readonly elapsedTime?: number | null;
  readonly stoppedTime?: number | null;
  readonly timeInRed?: number | null;
  readonly powerZones?: string | null;
  readonly timeSeriesFile?: string | null;
  readonly powerZoneBuckets?: string | null;
  readonly createdAt: string;
  readonly heroImage?: string | null;
  readonly subhead?: string | null;
  readonly shortUrl?: string | null;
  readonly raceResults?: string | null;
  readonly webscorerResults?: string | null;
  readonly crossResults?: string | null;
  readonly omniResults?: string | null;
  readonly runSignupResults?: string | null;
  readonly raceResultsProvider?: string | null;
  readonly originalPostId?: string | null;
  readonly originalPost?: Post | null;
  readonly owner?: string | null;
  readonly updatedAt?: string | null;
  readonly publishedPostOriginalPostId?: string | null;
}

type LazyPublishedPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PublishedPost, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly gpxFile?: string | null;
  readonly images?: string | null;
  readonly headerImage?: string | null;
  readonly date?: string | null;
  readonly publishedDate?: string | null;
  readonly location?: string | null;
  readonly postLocation?: string | null;
  readonly stravaUrl?: string | null;
  readonly resultsUrl?: string | null;
  readonly type?: string | null;
  readonly subType?: string | null;
  readonly teaser?: string | null;
  readonly currentFtp?: string | null;
  readonly components?: string | null;
  readonly powerAnalysis?: string | null;
  readonly author?: string | null;
  readonly elevationTotal?: number | null;
  readonly normalizedPower?: number | null;
  readonly distance?: number | null;
  readonly heartAnalysis?: string | null;
  readonly cadenceAnalysis?: string | null;
  readonly tempAnalysis?: string | null;
  readonly elapsedTime?: number | null;
  readonly stoppedTime?: number | null;
  readonly timeInRed?: number | null;
  readonly powerZones?: string | null;
  readonly timeSeriesFile?: string | null;
  readonly powerZoneBuckets?: string | null;
  readonly createdAt: string;
  readonly heroImage?: string | null;
  readonly subhead?: string | null;
  readonly shortUrl?: string | null;
  readonly raceResults?: string | null;
  readonly webscorerResults?: string | null;
  readonly crossResults?: string | null;
  readonly omniResults?: string | null;
  readonly runSignupResults?: string | null;
  readonly raceResultsProvider?: string | null;
  readonly originalPostId?: string | null;
  readonly originalPost: AsyncItem<Post | undefined>;
  readonly owner?: string | null;
  readonly updatedAt?: string | null;
  readonly publishedPostOriginalPostId?: string | null;
}

export declare type PublishedPost = LazyLoading extends LazyLoadingDisabled ? EagerPublishedPost : LazyPublishedPost

export declare const PublishedPost: (new (init: ModelInit<PublishedPost>) => PublishedPost) & {
  copyOf(source: PublishedPost, mutator: (draft: MutableModel<PublishedPost>) => MutableModel<PublishedPost> | void): PublishedPost;
}

type EagerPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly type: string;
  readonly title: string;
  readonly gpxFile?: string | null;
  readonly images?: string | null;
  readonly headerImage?: string | null;
  readonly date?: string | null;
  readonly publishedDate?: string | null;
  readonly location?: string | null;
  readonly postLocation?: string | null;
  readonly stravaUrl?: string | null;
  readonly resultsUrl?: string | null;
  readonly timeSeriesFile?: string | null;
  readonly subType?: string | null;
  readonly teaser?: string | null;
  readonly currentFtp?: string | null;
  readonly components?: string | null;
  readonly powerAnalysis?: string | null;
  readonly blog?: Blog | null;
  readonly related?: (Post | null)[] | null;
  readonly author?: User | null;
  readonly elevationTotal?: number | null;
  readonly normalizedPower?: number | null;
  readonly distance?: number | null;
  readonly heartAnalysis?: string | null;
  readonly cadenceAnalysis?: string | null;
  readonly tempAnalysis?: string | null;
  readonly elapsedTime?: number | null;
  readonly stoppedTime?: number | null;
  readonly timeInRed?: number | null;
  readonly powerZones?: string | null;
  readonly powerZoneBuckets?: string | null;
  readonly createdAt: string;
  readonly heroImage?: string | null;
  readonly subhead?: string | null;
  readonly shortUrl?: string | null;
  readonly raceResults?: string | null;
  readonly webscorerResults?: string | null;
  readonly crossResults?: string | null;
  readonly omniResults?: string | null;
  readonly runSignupResults?: string | null;
  readonly raceResultsProvider?: string | null;
  readonly privacyStatus?: string | null;
  readonly owner?: string | null;
  readonly updatedAt?: string | null;
  readonly blogPostsId?: string | null;
  readonly postRelatedId?: string | null;
  readonly postAuthorId?: string | null;
}

type LazyPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly type: string;
  readonly title: string;
  readonly gpxFile?: string | null;
  readonly images?: string | null;
  readonly headerImage?: string | null;
  readonly date?: string | null;
  readonly publishedDate?: string | null;
  readonly location?: string | null;
  readonly postLocation?: string | null;
  readonly stravaUrl?: string | null;
  readonly resultsUrl?: string | null;
  readonly timeSeriesFile?: string | null;
  readonly subType?: string | null;
  readonly teaser?: string | null;
  readonly currentFtp?: string | null;
  readonly components?: string | null;
  readonly powerAnalysis?: string | null;
  readonly blog: AsyncItem<Blog | undefined>;
  readonly related: AsyncCollection<Post>;
  readonly author: AsyncItem<User | undefined>;
  readonly elevationTotal?: number | null;
  readonly normalizedPower?: number | null;
  readonly distance?: number | null;
  readonly heartAnalysis?: string | null;
  readonly cadenceAnalysis?: string | null;
  readonly tempAnalysis?: string | null;
  readonly elapsedTime?: number | null;
  readonly stoppedTime?: number | null;
  readonly timeInRed?: number | null;
  readonly powerZones?: string | null;
  readonly powerZoneBuckets?: string | null;
  readonly createdAt: string;
  readonly heroImage?: string | null;
  readonly subhead?: string | null;
  readonly shortUrl?: string | null;
  readonly raceResults?: string | null;
  readonly webscorerResults?: string | null;
  readonly crossResults?: string | null;
  readonly omniResults?: string | null;
  readonly runSignupResults?: string | null;
  readonly raceResultsProvider?: string | null;
  readonly privacyStatus?: string | null;
  readonly owner?: string | null;
  readonly updatedAt?: string | null;
  readonly blogPostsId?: string | null;
  readonly postRelatedId?: string | null;
  readonly postAuthorId?: string | null;
}

export declare type Post = LazyLoading extends LazyLoadingDisabled ? EagerPost : LazyPost

export declare const Post: (new (init: ModelInit<Post>) => Post) & {
  copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}