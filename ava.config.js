/* eslint-disable fp/no-let, fp/no-mutation */

const process = require('process');

let testSpec = '(spec)';
if (!process.env.TESTSPEC) {
	testSpec = '(spec)';
} else if (process.env.TESTSPEC === 'spec') {
	testSpec = '(spec)';
} else if (process.env.TESTSPEC === 'test') {
	testSpec = '(test)';
} else {
	testSpec = '(spec|test)';
}

export default function config() {
	return {
		files: [
			'./src/client/**/*.' + testSpec + '.js',
			'./src/server/**/*.' + testSpec + '.js',
			'./src/test/**/*.' + testSpec + '.js',
			'./src/utils/*.' + testSpec + '.js',
			'./pages/*.' + testSpec + '.js',
		],
		sources: [
			'./src/client/**/*',
			'./src/server/**/*',
			'./src/test/**/*',
			'./src/utils/**/*',
			'./pages/*',
		],
		cache: false,
		concurrency: 5,
		failFast: true,
		failWithoutAssertions: false,
		environmentVariables: {
			NODE_ENV: 'testing',
		},
		tap: true,
		verbose: true,
		compileEnhancements: false,
		require: ['esm', './babel.register.test.js'],
		babel: {
			testOptions: {
				plugins: ['babel-plugin-rewire'],
			},
		},
	};
}
