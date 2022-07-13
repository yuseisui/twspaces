import {build, BuildOptions} from 'esbuild';

const base: BuildOptions = {
	entryPoints: ['./src/index.ts'],
	bundle: true,
	target: 'es2020',
	minify: true,
};

const browser: BuildOptions = {
	...base,
	outfile: './lib/browser/index.js',
	format: 'esm',
};

const node: BuildOptions = {
	...base,
	outfile: './lib/node/index.cjs',
	platform: 'node',
	external: ['axios'],
};

const nodeEsm: BuildOptions = {
	...node,
	outfile: './lib/node/index.js',
	format: 'esm',
};

void Promise.all([build(browser), build(node), build(nodeEsm)]);
