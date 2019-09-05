/* eslint-disable fp/no-mutation,fp/no-nil */

module.exports = function babelConfig(api) {
	const config = {
		babelrcRoots: ['.', 'src/*'],
		presets: [
			'@babel/preset-env',
			'@babel/preset-flow',
			'@babel/preset-react',
			'next/babel',
		],
		plugins: [
			'@babel/plugin-proposal-nullish-coalescing-operator',
			'@babel/plugin-proposal-optional-chaining',
			[
				'module-resolver',
				{
					root: ['.'],
					alias: {
						'@client': './src/client',
						'@config': './src/config',
						'@pages': './pages',
						'@public': './src/public',
						'@server': './src/server',
						'@test': './src/test',
						'@utils': './src/utils',
					},
				},
			],
		],
	};

	if (api.env('production')) {
		// eslint-disable-next-line fp/no-mutating-methods
		config.plugins.push('transform-remove-console');
	}

	if (api.env('testing')) {
		// eslint-disable-next-line global-require
		require('./babel.register.test.js');
	}

	return config;
};
