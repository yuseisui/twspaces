import type {AudioSpaceMetadata} from './metadata';
import type {AudioSpaceParticipants} from './participants';

export type ActivateResponse = {
	guest_token: string;
};

export type AudioSpace = {
	metadata?: AudioSpaceMetadata;
	participants?: AudioSpaceParticipants;
};

export type AudioSpaceByIdResponseError = {
	message: string;
	locations: Array<{
		line: number;
		column: number;
	}>;
	path: string[];
	extensions: {
		name: string;
		source: string;
		code: number;
		kind: string;
		tracing: {
			trace_id: string;
		};
	};
	code: number;
	kind: string;
	name: string;
	source: string;
	tracing: {
		trace_id: string;
	};
};

export type AudioSpaceByIdResponse = {
	data: {
		audioSpace: AudioSpace;
	};
	errors?: AudioSpaceByIdResponseError[];
};

export type LiveStreamMetadata = {
	source: {
		location: string;
		noRedirectPlaybackUrl: string;
		status: string;
		streamType: string;
	};
	sessionId: string;
	chatToken: string;
	lifecycleToken: string;
	shareUrl: string;
	chatPermissionType: string;
};
