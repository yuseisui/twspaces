/* eslint @typescript-eslint/naming-convention: ["error", {"selector": "variable", "modifiers": ["const"], "format": ["UPPER_CASE"]}] */

export const BEARER_TOKEN =
	'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';

export const ACTIVATE_ENDPOINT =
	'https://api.twitter.com/1.1/guest/activate.json';
export const AUDIO_SPACE_BY_ID_ENDPOINT =
	'https://twitter.com/i/api/graphql/X3en8yLOVNToFoCv53D94A/AudioSpaceById';
export const TWEET_DETAIL_ENDPOINT =
	'https://twitter.com/i/api/graphql/0vaSJ4y9SDdSPPZ72dpuDA/TweetDetail';

export const SPACE_URL_REGEX =
	/^https:\/\/(?:mobile\.)?twitter\.com\/i\/spaces\/(?<spaceId>\w+)/;
export const TWEET_URL_REGEX =
	/^https:\/\/(?:mobile\.)?twitter\.com\/(?<screenName>\w+)\/status\/(?<tweetId>\d+)/;
