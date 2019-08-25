module.exports = {
	overrides: [
		{
			files: ['*.js'],
			rules: {
				'fp/no-class': 'off',
				'fp/no-nil': 'off',
				'fp/no-this': 'off',
				'fp/no-throw': 'off'
			}
		}
	]
};
