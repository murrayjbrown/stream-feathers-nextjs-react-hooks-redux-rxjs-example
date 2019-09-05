import match from 'rust-match';
import produce from 'immer';

const INITIAL_STATE = {
	color: '#000000',
	time: 'Now',
};

export default function timeReducer(state = INITIAL_STATE, action = {}) {
	return produce(state, draft =>
		match(action.type, {
			TIME_TICK: () => {
				const result = { ...draft };
				return result;
			},
			TIME: () => {
				const result = { ...draft, ...action.payload };
				return result;
			},
			_: () => {
				const result = { ...draft };
				return result;
			},
		}),
	);
}
