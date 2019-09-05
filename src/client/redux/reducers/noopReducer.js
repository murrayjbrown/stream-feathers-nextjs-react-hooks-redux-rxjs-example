import match from 'rust-match';
import produce from 'immer';

const INITIAL_STATE = {};

export default function noopReducer(state = INITIAL_STATE, action = {}) {
	return produce(state, draft =>
		match(action.type, {
			NOP: () => draft,
			_: () => draft,
		}),
	);
}
