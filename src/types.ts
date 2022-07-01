export type ActivateResponse = {
	guest_token: string;
};

export type RequestHeaders = {
	authorization: string;
	'x-guest-token'?: string;
};
