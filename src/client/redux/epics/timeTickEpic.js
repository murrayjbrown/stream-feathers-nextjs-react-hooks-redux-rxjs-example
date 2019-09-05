// @flux
import datetime from 'dayjs';
import timeAction from '@client/redux/actions/time';
import { map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { TIME_TICK } from '@client/redux/constants/ActionTypes';

// Format tick time & color
export default function tickEpic(action$) {
	return action$.pipe(
		ofType(TIME_TICK),
		map(action => {
			const time = datetime(action.payload.time).format('YYYY-MM-DD HH:mm:ss');

			const result = timeAction({
				payload: { time },
				meta: { tickId: action.payload.id, timestamp: action.meta.timestamp },
			});
			return result;
		}),
	);
}
