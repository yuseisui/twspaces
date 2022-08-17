export type Entities = {
	description: {
		urls: any[];
	};
	url: {
		urls: Array<{
			display_url: string;
			expanded_url: string;
			url: string;
			indices: [number, number];
		}>;
	};
};

export type MediaColor = {
	r: {
		ok: {
			palette: Array<{
				percentage: number;
				rgb: {
					red: number;
					green: number;
					blue: number;
				};
			}>;
		};
	};
};

export type Legacy = {
	created_at: string;
	default_profile: boolean;
	default_profile_image: boolean;
	description: string;
	entities: Entities;
	fast_followers_count: number;
	favourites_count: number;
	followers_count: number;
	friends_count: number;
	has_custom_timelines: boolean;
	is_translator: boolean;
	listed_count: number;
	location: string;
	media_count: number;
	name: string;
	normal_followers_count: number;
	pinned_tweet_ids_str: string[];
	possibly_sensitive: boolean;
	profile_banner_extensions: {
		mediaColor: MediaColor;
	};
	profile_banner_url: string;
	profile_image_extensions: {
		mediaColor: MediaColor;
	};
	profile_image_url_https: string;
	profile_interstitial_type: string;
	protected: boolean;
	screen_name: string;
	statuses_count: number;
	translator_type: string;
	url: string;
	verified: boolean;
	withheld_in_countries: any[];
};

export type Professional = {
	rest_id: string;
	professional_type: string;
	category: any[];
};

export type CreatorResult = {
	__typename: string;
	id: string;
	rest_id: string;
	affiliates_highlighted_label: Record<string, any>;
	has_nft_avatar: boolean;
	legacy: Legacy;
	professional?: Professional;
	super_follow_eligible: boolean;
	super_followed_by: boolean;
	super_following: boolean;
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
		result: CreatorResult;
	};
};
