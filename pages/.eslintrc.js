module.exports = {
	overrides: [
		{
			files: ['*.jsx'],
			rules: {
				'fp/no-class': 'off',
				'fp/no-nil': 'off',
				'fp/no-this': 'off',
				'fp/no-throw': 'off'
			}
		}
	]
};
