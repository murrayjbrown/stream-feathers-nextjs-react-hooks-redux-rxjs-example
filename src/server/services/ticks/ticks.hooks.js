// @flow
const hooksCommon = require('feathers-hooks-common');

const { disallow, iff, isProvider } = hooksCommon;

module.exports = {
	before: {
		all: [],
		find: [disallow()],
		get: [disallow()],
		create: [iff(isProvider('server'))],
		update: [disallow()],
		patch: [disallow()],
		remove: [disallow()],
	},

	after: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},

	error: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},
};
