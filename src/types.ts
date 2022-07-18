import type {AxiosRequestConfig, Method} from 'axios';

export type ActivateResponse = {
	guest_token: string;
};

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
		variables: AudioSpaceByIdVariables;
		features: Features;
	};
};

export type AudioSpaceMetadata = {
	rest_id: string;
	state: string;
	title: string;
	media_key: string;
	created_at: number;
	started_at: number;
	ended_at: string;
	updated_at: number;
	disallow_join: boolean;
	narrow_cast_space_type: number;
	is_employee_only: boolean;
	is_locked: boolean;
	is_space_available_for_replay: boolean;
	conversation_controls: number;
	total_replay_watched: number;
	total_live_listeners: number;
	creator_results: {
		result: Record<string, any>;
	};
};

export type AudioSpaceParticipants = {
	total: number;
	admins: Array<Record<string, any>>;
	speakers: any[];
	listeners: any[];
};

export type AudioSpace = {
	metadata?: AudioSpaceMetadata;
	participants?: AudioSpaceParticipants;
};

export type AudioSpaceByIdResponse = {
	data: {
		audioSpace: AudioSpace;
	};
	errors?: Array<{
		message: string;
		locations: any[];
		path: any[];
		extensions: any;
		code: number;
		kind: string;
		name: string;
		source: string;
		tracing: any;
	}>;
};
