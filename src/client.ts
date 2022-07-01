import axios from 'axios';
import {ACTIVATE_ENDPOINT, BEARER_TOKEN} from './constants.js';
import type {ActivateResponse, RequestHeaders} from './types';

export const createClient = () => {
	const headers: RequestHeaders = {
		authorization: BEARER_TOKEN,
	};

	const client = axios.create({headers});

	const interceptor = client.interceptors.request.use(
		async (config) => {
			client.interceptors.request.eject(interceptor);

			const response = await client.post<ActivateResponse>(
				ACTIVATE_ENDPOINT,
			);

			(client.defaults.headers.common as RequestHeaders)[
				'x-guest-token'
			] = response.data.guest_token;
			(config.headers as RequestHeaders)['x-guest-token'] =
				response.data.guest_token;

			return config;
		},
		undefined,
		{
			runWhen(config) {
				return (
					(client.defaults.headers.common as RequestHeaders)[
						'x-guest-token'
					] === undefined && config.url !== ACTIVATE_ENDPOINT
				);
			},
		},
	);

	return client;
};
