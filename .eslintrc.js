module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		commonjs: true,
		es6: true,
		amd: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		ecmaFeatures: {
			jsx: true,
		},
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		// ESLint：https://eslint.cn/
		// Prettier：https://prettier.io/
		// eslint-plugin-prettier：https://github.com/prettier/eslint-plugin-prettier#readme
		// eslint-config-prettier：https://github.com/prettier/eslint-config-prettier#readme
		// @typescript-eslint/eslint-plugin：https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#readme
		// @typescript-eslint/parser：https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser#readme
		'indent': [2, 'tab'], // 缩进使用两个空格不使用tab
		'quotes': [
			2,
			'single',
			{
				allowTemplateLiterals: true,
			},
		],
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	},
}
