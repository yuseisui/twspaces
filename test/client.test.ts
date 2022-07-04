import {afterEach, beforeAll, describe, expect, it, jest} from '@jest/globals';
import axios from 'axios';
import {createClient} from '../src/client';
import {BEARER_TOKEN} from '../src/constants';
import type {RequestHeaders} from '../src/types';

const headers: RequestHeaders = {
	authorization: BEARER_TOKEN,
};

describe('createClient()', () => {
	beforeAll(() => {
		jest.spyOn(axios, 'create');
	});

	afterEach(() => {
		jest.mocked(axios.create).mockClear();
	});

	it('creates axios instance with request headers', () => {
		expect.assertions(2);

		createClient();

		expect(axios.create).toHaveBeenCalledTimes(1);
		expect(axios.create).toHaveBeenCalledWith({headers});
	});
});
