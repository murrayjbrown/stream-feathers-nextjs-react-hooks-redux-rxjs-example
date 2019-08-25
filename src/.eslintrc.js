module.exports = {
	overrides: [
		{
			files: ['*.jsx'],
			rules: {
				'fp/no-class': 'warn',
				'fp/no-mutation': 'warn',
				'fp/no-nil': 'off',
				'fp/no-this': 'warn',
				'fp/no-throw': 'off'
			}
		},
		{
			files: ['*.spec.js', '*.test.js', '*.spec.jsx', '*.test.jsx'],
			rules: {
				'no-undef': 'off',
				'fp/no-nil': 'off',
			},
		}
	]
};
