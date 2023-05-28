/* eslint-disable @typescript-eslint/naming-convention */

import {
	AUDIO_SPACE_BY_ID_ENDPOINT,
	SPACE_URL_REGEX,
	TWEET_DETAIL_ENDPOINT,
	TWEET_URL_REGEX,
} from './constants';
import {rest} from './request';
import type {
	AudioSpace,
	AudioSpaceByIdResponse,
	AudioSpaceByIdVariables,
	Features,
	LiveStreamMetadata,
	TweetDetailVariables,
} from './types';

export const findSpaceById = async (spaceId: string): Promise<AudioSpace> => {
	const variables: AudioSpaceByIdVariables = {
		id: spaceId,
		isMetatagsQuery: true,
		withDownvotePerspective: true,
		withReactionsMetadata: true,
		withReactionsPerspective: true,
		withReplays: true,
		withSuperFollowsTweetFields: true,
		withSuperFollowsUserFields: true,
	};

	const features: Features = {
		dont_mention_me_view_api_enabled: true,
		interactive_text_enabled: true,
		responsive_web_edit_tweet_api_enabled: true,
		responsive_web_enhance_cards_enabled: true,
		responsive_web_uc_gql_enabled: true,
		standardized_nudges_misinfo: true,
		vibe_tweet_context_enabled: true,
	};

	const response = await rest<AudioSpaceByIdResponse>(
		AUDIO_SPACE_BY_ID_ENDPOINT,
		{
			searchParams: new URLSearchParams({
				variables: JSON.stringify(variables),
				features: JSON.stringify(features),
			}),
		},
	);

	if (response.errors !== undefined) {
		throw new Error(response.errors[0]?.message);
	}

	return response.data.audioSpace;
};

export const findSpaceByTweetId = async (
	tweetId: string,
): Promise<AudioSpace> => {
	const variables: TweetDetailVariables = {
		focalTweetId: tweetId,
		includePromotedContent: false,
		withBirdwatchNotes: false,
		withCommunity: false,
		withDownvotePerspective: false,
		withQuickPromoteEligibilityTweetFields: false,
		withReactionsMetadata: false,
		withReactionsPerspective: false,
		withSuperFollowsTweetFields: false,
		withSuperFollowsUserFields: false,
		withV2Timeline: true,
		withVoice: false,
		with_rux_injections: false,
	};

	const features: Features = {
		dont_mention_me_view_api_enabled: false,
		interactive_text_enabled: false,
		responsive_web_edit_tweet_api_enabled: false,
		responsive_web_enhance_cards_enabled: false,
		responsive_web_uc_gql_enabled: false,
		standardized_nudges_misinfo: false,
		vibe_tweet_context_enabled: false,
	};

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const response = await rest<any>(TWEET_DETAIL_ENDPOINT, {
		searchParams: new URLSearchParams({
			variables: JSON.stringify(variables),
			features: JSON.stringify(features),
		}),
	});

	if (response.errors !== undefined) {
		throw new Error(response.errors[0]?.message as string);
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const url: {expanded_url: string} =
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		response.data.threaded_conversation_with_injections_v2.instructions
			.find(
				(instruction: any) => instruction.type === 'TimelineAddEntries',
			)
			.entries.find((entry: any) => entry.entryId === `tweet-${tweetId}`)
			.content.itemContent.tweet_results.result.legacy.entities.urls.find(
				(url: any) => SPACE_URL_REGEX.test(url.expanded_url as string),
			);

	if (url === undefined) {
		throw new Error('Tweet does not contain Space URL');
	}

	const spaceUrl = url.expanded_url;
	const spaceId = spaceUrl.match(SPACE_URL_REGEX)!.groups!['spaceId']!;

	return findSpaceById(spaceId);
};

export const findSpaceByUrl = async (url: string): Promise<AudioSpace> => {
	const href = new URL(url).toString(); // URL validation
	const spaceId = href.match(SPACE_URL_REGEX)?.groups?.['spaceId'];

	if (spaceId !== undefined) {
		return findSpaceById(spaceId);
	}

	const tweetId = href.match(TWEET_URL_REGEX)?.groups?.['tweetId'];

	if (tweetId !== undefined) {
		return findSpaceByTweetId(tweetId);
	}

	throw new Error('Cannot find Space by URL');
};

export const getLiveStreamMetadata = async (
	mediaKey: string,
): Promise<LiveStreamMetadata> => {
	const response = await rest<LiveStreamMetadata>(
		`https://twitter.com/i/api/1.1/live_video_stream/status/${mediaKey}`,
	);

	return response;
};
