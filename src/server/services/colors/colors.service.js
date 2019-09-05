// @flow
const datetime = require('dayjs');
const match = require('rust-match');
const utc = require('dayjs/plugin/utc');
const { interval } = require('rxjs');
const { produce } = require('immer');
const { randModulo } = require('@utils/randModulo');
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

	const randByte = () => randModulo(256);

	function* payloadGenerator() {
		const initialState = {
			rgb: {
				r: randByte(),
				g: randByte(),
				b: randByte(),
			},
			vary: 'none',
		};

		while (true) {
			yield produce(initialState, draft =>
				match(String(randModulo(4)), {
					'0': () => ({
						...draft,
						vary: 'red',
						rgb: { ...draft.rgb, r: randByte() },
					}),
					'1': () => ({
						...draft,
						vary: 'green',
						rgb: { ...draft.rgb, g: randByte() },
					}),
					'2': () => ({
						...draft,
						vary: 'blue',
						rgb: { ...draft.rgb, b: randByte() },
					}),
					_: () => ({ ...draft, vary: 'none' }),
				}),
			);
		}
	}

	// Emit periodic color notifications
	datetime.extend(utc);
	const payload = payloadGenerator();
	interval(1000).subscribe(id => {
		const timestamp = datetime(new Date())
			.utc()
			.toISOString();
		const message = {
			id,
			timestamp,
			payload: payload.next().value,
		};
		// eslint-disable-next-line
		console.log('colors: ', message);
		service.create(message);
	});

	// Invoke service hooks
	service.hooks(hooks);
};
