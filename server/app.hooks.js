// Application hooks that run for every service
const logger = require('./hooks/logger');

module.exports = {
	before: {
		all: [],
		find: [logger()],
		get: [],
		create: [logger()],
		update: [],
		patch: [],
		remove: [],
	},

	after: {
		all: [],
		find: [logger()],
		get: [],
		create: [logger()],
		update: [],
		patch: [],
		remove: [],
	},

	error: {
		all: [logger()],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},
};
