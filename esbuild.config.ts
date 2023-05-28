import type {BuildOptions} from 'esbuild';
import {build} from 'esbuild';

const options: BuildOptions = {
	entryPoints: ['./src/index.ts'],
	outfile: './lib/index.js',
	bundle: true,
	target: 'es2021',
	platform: 'neutral',
	external: ['ky'],
};

void build(options);
