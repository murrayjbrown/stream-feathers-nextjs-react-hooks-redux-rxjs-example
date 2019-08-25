/* eslint-disable fp/no-mutation */

const path = require('path');
const process = require('process');
const withSass = require('@zeit/next-sass');

// for those who using CDN
const { ASSET_HOST } = process.env;
const assetPrefix = ASSET_HOST || '';
const env = process.env.NODE_ENV || '';

module.exports = withSass({
	dev: env.startsWith('dev'),
	distDir: './dist/client',
	// eslint-disable-next-line no-unused-vars
	webpack: (config, { dev }) => {
		config.output.publicPath = `${assetPrefix}${config.output.publicPath}`;

		const aliases = config.resolve.alias || {};
		config.resolve.alias = {
			...aliases,
			'@client': path.resolve(__dirname, 'src/client'),
			'@config': path.resolve(__dirname, 'src/config'),
			'@pages': path.resolve(__dirname, 'pages'),
			'@public': path.resolve(__dirname, 'src/public'),
			'@server': path.resolve(__dirname, 'src/server'),
			'@test': path.resolve(__dirname, 'src/test'),
			'@utils': path.resolve(__dirname, 'src/utils'),
		};

		return config;
	},
});

