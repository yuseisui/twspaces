/** @type {import('xo').Options} */
module.exports = {
	prettier: true,
	extends: ['plugin:jest/all'],
	rules: {
		// https://github.com/weiran-zsd/eslint-plugin-node/issues/21
		'n/file-extension-in-import': 'off',
		'import/extensions': 'off',
		'jest/no-hooks': 'off',
	},
	overrides: [
		{
			files: '**/*.ts',
			rules: {
				'@typescript-eslint/explicit-function-return-type': 'error',
			},
		},
	],
};
