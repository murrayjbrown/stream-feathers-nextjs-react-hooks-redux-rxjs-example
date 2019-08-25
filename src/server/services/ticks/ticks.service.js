// @flow
// Initializes the `ticks` service on path `/ticks`
const datetime = require('dayjs');
const utc = require('dayjs/plugin/utc');
const { interval } = require('rxjs');
const { randByte } = require('@utils/randByte');
const createService = require('./ticks.class.js');
const hooks = require('./ticks.hooks');

module.exports = function ticksService(app: any) {
	const paginate = app.get('paginate');
	const options = {
		paginate,
	};

	// Initialize our service with any options it requires
	app.use('/ticks', createService(options));

	// Get our initialized service so that we can register hooks
	const service = app.service('ticks');

	function rgb() {
		return {
			r: randByte(),
			g: randByte(),
			b: randByte(),
		};
	}

	// Emit periodic ticker notifications
	datetime.extend(utc);
	interval(1000).subscribe(id => {
		const timestamp = datetime(new Date())
			.utc()
			.toISOString();
		const message = {
			id,
			timestamp,
			payload: {
				time: timestamp,
				rgb: rgb(),
			}
		};
		service.create(message);
	});

	// Invoke service hooks
	service.hooks(hooks);
};
