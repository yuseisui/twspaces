import type {AxiosRequestConfig, Method} from 'axios';

export type RequestHeaders = {
	authorization: string;
	'x-guest-token'?: string;
};

export type AudioSpaceByIdVariables = {
	id: string;
	isMetatagsQuery: boolean;
	withDownvotePerspective: boolean;
	withReactionsMetadata: boolean;
	withReactionsPerspective: boolean;
	withReplays: boolean;
	withSuperFollowsTweetFields: boolean;
	withSuperFollowsUserFields: boolean;
};

export type TweetDetailVariables = {
	focalTweetId: string;
	includePromotedContent: boolean;
	withBirdwatchNotes: boolean;
	withCommunity: boolean;
	withDownvotePerspective: boolean;
	withQuickPromoteEligibilityTweetFields: boolean;
	withReactionsMetadata: boolean;
	withReactionsPerspective: boolean;
	withSuperFollowsTweetFields: boolean;
	withSuperFollowsUserFields: boolean;
	withV2Timeline: boolean;
	withVoice: boolean;
	with_rux_injections: boolean;
};

export type Features = {
	dont_mention_me_view_api_enabled: boolean;
	interactive_text_enabled: boolean;
	responsive_web_edit_tweet_api_enabled: boolean;
	responsive_web_enhance_cards_enabled: boolean;
	responsive_web_uc_gql_enabled: boolean;
	standardized_nudges_misinfo: boolean;
	vibe_tweet_context_enabled: boolean;
};

export type RestRequestOptions = AxiosRequestConfig & {
	url: string;
	method: Method;
	params: {
		variables: AudioSpaceByIdVariables | TweetDetailVariables;
		features: Features;
	};
};
