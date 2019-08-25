module.exports = {
	env: {
		es6: true,
		node: true,
	},
	extends: [
		'airbnb',
		'plugin:fp/recommended',
		"plugin:jsx-a11y/recommended",
		'plugin:react/recommended',
		'eslint:recommended',
		'prettier',
	],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 2017,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: [
		'fp',
		'jsx-a11y',
		'react',
		'react-hooks',
		'ava',
		'chai-friendly',
		'cypress',
		'jest',
	],
	rules: {
		indent: [
			'warn',
			'tab',
			{
				SwitchCase: 1,
			},
		],
		'linebreak-style': ['error', 'unix'],
		'no-extra-semi': 'off',
		'no-unused-vars': 'warn',
		quotes: ['error', 'single'],
		semi: ['warn', 'always'],
		'import/no-unresolved': 'off',
		'fp/no-mutation': [
			'error',
			{
				commonjs: true,
			},
		],
		'fp/no-unused-expression': [
			'off',
			{
				allowUseStrict: true,
			},
		],
		'react/jsx-indent': [
			'warn',
			'tab',
			{
				checkAttributes: true,
			},
		],
		'react/prop-types': 'off',
		'react-hooks/rules-of-hooks': 'error',
	},
	settings: {
		react: {
			createClass: 'createReactClass',
			pragma: 'React',
			version: 'detect',
			flowVersion: 'detect',
		},
	},
};
