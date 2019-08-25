// @flow
const datetime = require('dayjs');
const match = require('rust-match');
const utc = require('dayjs/plugin/utc');
const { interval } = require('rxjs');
const { produce } = require('immer');
const { randByte } = require('@utils/randByte');
const createService = require('./colors.class.js');
const hooks = require('./colors.hooks');

module.exports = function bluesService(app: any) {
	const paginate = app.get('paginate');
	const options = {
		paginate,
	};

	// Initialize our service with any options it requires
	app.use('/colors', createService(options));

	// Get our initialized service so that we can register hooks
	const service = app.service('colors');

	function *payload() {
		const initialState = {
			color: {
				r: randByte(),
				g: randByte(),
				b: randByte(),
			},
			vary: 'none'
		};

		yield produce(initialState, draft =>
			match(String(Number(Math.floor(4 * Math.random()))), {
				'0': () => ({ ...draft, vary: 'red', color: { ...draft.color, r: randByte() }}),
				'1': () => ({ ...draft, vary: 'green', color: { ...draft.color, g: randByte() }}),
				'2': () => ({ ...draft, vary: 'blue', color: { ...draft.color, b: randByte() }}),
				_: () => ({ ...draft, vary: 'none'}),
			}));
	}

	// Emit periodic color notifications
	datetime.extend(utc);
	interval(1000).subscribe(id => {
		service.create({
			id,
			payload: payload(),
			time: datetime(new Date())
				.utc()
				.toISOString(),
		});
	});

	// Invoke service hooks
	service.hooks(hooks);
};
