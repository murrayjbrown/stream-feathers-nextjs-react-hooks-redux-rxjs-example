// @flux
import datetime from 'dayjs';
import actions from '@client/redux/actions';
import hex from '@utils/hexByte';
import { map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { TICK } from '@client/redux/constants/ActionTypes';

// Format tick time & color
export default function tickEpic(action$) {
	return action$.pipe(
		ofType(TICK),
		map(action => {
			const time = datetime(action.payload.time).format('YYYY-MM-DD HH:mm:ss');
			const color = !(action.payload && action.payload.rgb)
				? '#000'
				: `#${hex(action.payload.rgb.r) +
						hex(action.payload.rgb.g) +
						hex(action.payload.rgb.b)}`;

			const result = actions.time({
				payload: { color, time },
				meta: { tickId: action.payload.id, timestamp: action.meta.timestamp }
			});
			return result;
		}),
	);
}
