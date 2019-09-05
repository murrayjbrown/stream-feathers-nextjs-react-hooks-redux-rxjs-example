module.exports = {
	env: {
		es6: true,
		node: true,
	},
	extends: [
		'plugin:fp/recommended',
		"plugin:jsx-a11y/recommended",
		'plugin:react/recommended',
		'eslint:recommended',
		'airbnb',
		'plugin:prettier/recommended',
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
		'prettier',
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
		'fp/no-class': 'off',
		'fp/no-loops': 'off',
		'fp/no-mutation': [
			'error',
			{
				commonjs: true,
			},
		],
		'fp/no-nil': 'off',
		'fp/no-this': 'off',
		'fp/no-throw': 'off',
		'fp/no-unused-expression': [
			'off',
			{
				allowUseStrict: true,
			},
		],
		'import/no-unresolved': 'off',
		'jsx-a11y/label-has-associated-control': [
			"error",
			{
				assert: "either"
			},
		],
		"prettier/prettier": "error",
		'react/jsx-indent': [
			'warn',
			'tab',
			{
				checkAttributes: true,
			},
		],
		'react/jsx-indent-props': 'off',
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
