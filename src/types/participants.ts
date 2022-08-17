export type AudioSpaceParticipant = {
	periscope_user_id: string;
	start: number;
	twitter_screen_name: string;
	display_name: string;
	avatar_url: string;
	is_verified: boolean;
	is_muted_by_admin: boolean;
	is_muted_by_guest: boolean;
	user_results: {
		result: {
			__typename: string;
			has_nft_avatar: boolean;
		};
	};
	user: {
		rest_id: string;
	};
};

export type AudioSpaceParticipants = {
	total: number;
	admins: AudioSpaceParticipant[];
	speakers: AudioSpaceParticipant[];
	listeners: AudioSpaceParticipant[];
};
