import match from 'rust-match';
import produce from 'immer';
import { INITIAL_STATE } from '../constants';

export default function noopReducer(state = INITIAL_STATE, action = {}) {
	return produce(state, draft =>
		match(action.type, {
			NOP: () => draft,
			_: () => draft,
		}));
}
