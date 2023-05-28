import type {Options} from 'ky';
import {createClient} from './client';

const request = createClient();

export const rest = async <T>(url: string, options?: Options): Promise<T> => {
	const response = await request(url, options);
	return response.json<T>();
};
