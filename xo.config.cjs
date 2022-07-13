/** @type {import('xo').Options} */
module.exports = {
	prettier: true,
	extends: ['plugin:jest/all'],
	rules: {
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
