import match from 'rust-match';
import produce from 'immer';
import { INITIAL_STATE } from '../constants';

export default function colorReducer(state = INITIAL_STATE, action = {}) {
	return produce(state, draft =>
		match(action.type, {
			BLUE: () => ({ ...draft, blue: action.payload }),
			GREEN: () => ({ ...draft, green: action.payload }),
			RED: () => ({ ...draft, red: action.payload }),
			_: () => draft,
		}));
}
