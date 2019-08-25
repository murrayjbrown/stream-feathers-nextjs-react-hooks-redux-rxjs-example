module.exports = {
	overrides: [
		{
			files: ['*.js'],
			rules: {
				'fp/no-throw': 'off'
			}
		},
		{
			files: ['index.js', 'channels.js', 'logger.js'],
			rules: {
				'fp/no-nil': 'off'
			}
		}
	]
};
