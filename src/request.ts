import {createClient} from './client';
import type {RestRequestOptions} from './types';

const client = createClient();

export const {request} = client;

export const rest = async <T>(options: RestRequestOptions) => {
	const response = await request<T>(options);
	return response.data;
};
