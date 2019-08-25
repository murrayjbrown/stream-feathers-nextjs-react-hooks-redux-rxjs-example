import match from 'rust-match';
import { INITIAL_STATE } from '../constants';

export default function timeReducer(state = INITIAL_STATE, action = {}) {
	return match(action.type, {
		TIME: () => {
			const result = { ...state, time: { ...action.payload }};
			return result;
		},
		_: () => state
	});
}
