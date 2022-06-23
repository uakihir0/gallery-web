export type Tweets = {
  size: number;
  tweets: Tweet[];
};

export type Tweet = {
  galleryId: number;
  tweetId: number;
  tweetUrl: string;
  imageUrl: string;
  imageSize: MediaSize;
  favoriteCount: number;
  retweetCount: number;
};

export type MediaSize = {
  width: number;
  height: number;
};
