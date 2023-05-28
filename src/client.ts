import ky from 'ky';
import {ACTIVATE_ENDPOINT, BEARER_TOKEN} from './constants';
import type {ActivateResponse, RequestHeaders} from './types';

export const createClient = (): typeof ky => {
	const guestTokenHeader: keyof RequestHeaders = 'x-guest-token';

	const headers: RequestHeaders = {
		authorization: BEARER_TOKEN,
	};

	const client = ky.create({
		headers,
		hooks: {
			beforeRequest: [
				async (request): Promise<void> => {
					if (
						!request.headers.has(guestTokenHeader) &&
						request.url !== ACTIVATE_ENDPOINT
					) {
						/* eslint-disable-next-line @typescript-eslint/naming-convention */
						const {guest_token} = await client
							.post(ACTIVATE_ENDPOINT)
							.json<ActivateResponse>();

						request.headers.set(guestTokenHeader, guest_token);
						headers[guestTokenHeader] = guest_token;
					}
				},
			],
		},
	});

	return client;
};
