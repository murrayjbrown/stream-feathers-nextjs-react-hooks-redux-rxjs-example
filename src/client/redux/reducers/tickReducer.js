import match from 'rust-match';
import { INITIAL_STATE } from '../constants';

export default function tickReducer(state = INITIAL_STATE, action = {}) {
	return match(action.type, {
		_: () => state
	});
}
