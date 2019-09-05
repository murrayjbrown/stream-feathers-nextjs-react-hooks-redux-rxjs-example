/* eslint-disable fp/no-let,fp/no-mutation */

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

module.exports = {
	moduleNameMapper: {
		'^.*\\.css$': '<rootDir>/test/stubs/stub.css',
		'^.*\\.jpg$': '<rootDir>/test/stubs/stub.jpg',
		'^.*\\.png$': '<rootDir>/test/stubs/stub.png',
		'^.*\\.scss$': '<rootDir>/test/stubs/stub.scss',
	},
	setupFilesAfterEnv: ['<rootDir>/test/jest/setup.js'],
	testMatch: [`**/?(*.)+${testSpec}.jsx`],
	testURL: 'http://localhost/',
};
