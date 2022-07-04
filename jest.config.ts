import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
	transform: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'\\.ts$': '@swc/jest',
	},
	extensionsToTreatAsEsm: ['.ts'],
};

export default config;
