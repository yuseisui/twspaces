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
	TweetDetailVariables,
} from './types';

const getSpaceIdByUrl = async (url: string): Promise<string> => {
	const href = new URL(url).toString(); // URL validation
	const spaceId = href.match(SPACE_URL_REGEX)?.groups?.['spaceId'];

	if (spaceId !== undefined) {
		return spaceId;
	}

	const tweetId = href.match(TWEET_URL_REGEX)?.groups?.['tweetId'];

	if (tweetId !== undefined) {
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
		const response = await rest<any>({
			url: TWEET_DETAIL_ENDPOINT,
			method: 'GET',
			params: {
				variables,
				features,
			},
		});

		try {
			return await getSpaceIdByUrl(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				response.data.threaded_conversation_with_injections_v2.instructions
					.find((instruction: any) => {
						return instruction.type === 'TimelineAddEntries';
					})
					.entries.find((entry: any) => {
						return entry.entryId === `tweet-${tweetId}`;
					})
					.content.itemContent.tweet_results.result.legacy.entities.urls.find(
						(url: any) => {
							return SPACE_URL_REGEX.test(url.expanded_url);
						},
					).expanded_url,
			);
		} catch {
			throw new Error('Cannot get Space ID by Tweet URL');
		}
	}

	throw new Error('Cannot get Space ID by URL');
};

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

	const response = await rest<AudioSpaceByIdResponse>({
		url: AUDIO_SPACE_BY_ID_ENDPOINT,
		method: 'GET',
		params: {
			variables,
			features,
		},
	});

	if (response.errors !== undefined) {
		throw new Error(response.errors[0]?.message);
	}

	return response.data.audioSpace;
};

export const findSpaceByUrl = async (url: string): Promise<AudioSpace> => {
	const spaceId = await getSpaceIdByUrl(url);
	return findSpaceById(spaceId);
};
