module.exports = {
	overrides: [
		{
			files: ['*.class.js'],
			rules: {
				'class-methods-use-this': 'off',
				'no-unused-vars': 'off',
				'fp/no-mutation': 'off',
				'fp/no-class': 'off',
				'fp/no-nil': 'off',
				'fp/no-this': 'off',
			}
		},
		{
			files: ['*.service.js'],
			rules: {
				'fp/no-nil': 'off'
			}
		}
	]
};
