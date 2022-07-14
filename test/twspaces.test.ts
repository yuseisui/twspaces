/* eslint-disable @typescript-eslint/naming-convention */

import {
	afterAll,
	afterEach,
	beforeAll,
	describe,
	expect,
	it,
	jest,
} from '@jest/globals';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {ACTIVATE_ENDPOINT, AUDIO_SPACE_BY_ID_ENDPOINT} from '../src/constants';
import {findSpaceById} from '../src/twspaces';
import type {ActivateResponse} from '../src/types';

const audioSpaceById = jest.fn();

const server = setupServer(
	rest.post(ACTIVATE_ENDPOINT, (_request, response, context) => {
		return response(
			context.json<ActivateResponse>({
				guest_token: '1234567890',
			}),
		);
	}),
	rest.get(AUDIO_SPACE_BY_ID_ENDPOINT, (request, response, context) => {
		audioSpaceById(request.headers.get('x-guest-token'));

		return response(
			context.json({
				data: {
					audioSpace: {
						metadata: {
							rest_id: 'qwertyuiop',
						},
					},
				},
			}),
		);
	}),
);

describe('twspaces', () => {
	beforeAll(() => {
		server.listen();
	});

	afterEach(() => {
		server.resetHandlers();
	});

	afterAll(() => {
		server.close();
	});

	describe('findSpaceById()', () => {
		it('requires guest token', async () => {
			expect.assertions(2);

			await findSpaceById('qwertyuiop');

			expect(audioSpaceById).toHaveBeenCalledTimes(1);
			expect(audioSpaceById).toHaveBeenCalledWith('1234567890');
		});

		it('receives response', async () => {
			expect.assertions(1);

			const response = await findSpaceById('qwertyuiop');

			expect(response.metadata.rest_id).toBe('qwertyuiop');
		});

		it('receives response with errors', async () => {
			expect.assertions(1);

			server.use(
				rest.get(
					AUDIO_SPACE_BY_ID_ENDPOINT,
					(_request, response, context) => {
						return response(
							context.json({
								data: {
									audioSpace: {},
								},
								errors: [
									{
										message: 'Error',
									},
								],
							}),
						);
					},
				),
			);

			await expect(findSpaceById('qwertyuiop')).rejects.toThrow('Error');
		});
	});
});