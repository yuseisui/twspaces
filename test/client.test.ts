import {afterEach, beforeAll, describe, expect, it, jest} from '@jest/globals';
import ky from 'ky';
import {createClient} from '../src/client';
import {BEARER_TOKEN} from '../src/constants';
import type {RequestHeaders} from '../src/types';

const headers: RequestHeaders = {
	authorization: BEARER_TOKEN,
};

describe('createClient()', () => {
	beforeAll(() => {
		jest.spyOn(ky, 'create');
	});

	afterEach(() => {
		jest.mocked(ky.create).mockClear();
	});

	it('creates ky instance with request headers', () => {
		expect.assertions(2);

		createClient();

		expect(ky.create).toHaveBeenCalledTimes(1);
		expect(ky.create).toHaveBeenCalledWith(
			expect.objectContaining({headers}),
		);
	});
});
