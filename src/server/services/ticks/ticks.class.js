// @flux
class Service {
	constructor(options) {
		this.options = options || {}; // eslint-disable-line fp/no-mutation
	}

	async find(params) {
		// eslint-disable-line no-unused-vars
		return [];
	}

	async get(id, params) {
		// eslint-disable-line no-unused-vars
		return {
			id,
			text: `A new tick message with ID: ${id}!`,
		};
	}

	async create(data, params) {
		if (Array.isArray(data)) {
			return Promise.all(data.map(current => this.create(current, params)));
		}

		return data;
	}

	async update(id, data, params) {
		// eslint-disable-line no-unused-vars
		return data;
	}

	async patch(id, data, params) {
		// eslint-disable-line no-unused-vars
		return data;
	}

	async remove(id, params) {
		// eslint-disable-line no-unused-vars
		return { id };
	}
}

module.exports = function ticks(options) {
	return new Service(options);
};

module.exports.Service = Service;
