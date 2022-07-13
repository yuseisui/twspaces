/* eslint-disable @typescript-eslint/naming-convention */

import {AUDIO_SPACE_BY_ID_ENDPOINT} from './constants';
import {rest} from './request';
import type {
	AudioSpace,
	AudioSpaceByIdResponse,
	AudioSpaceByIdVariables,
	Features,
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
