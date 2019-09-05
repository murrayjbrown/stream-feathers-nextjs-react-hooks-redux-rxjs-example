// @flux
import colorBlueAction from '@client/redux/actions/colorBlue';
import colorGreenAction from '@client/redux/actions/colorGreen';
import colorNoneAction from '@client/redux/actions/colorNone';
import colorRedAction from '@client/redux/actions/colorRed';
import match from 'rust-match';
import { map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { COLOR_TICK } from '@client/redux/constants/ActionTypes';

// Format tick time & color
export default function colorTickEpic(action$) {
	return action$.pipe(
		ofType(COLOR_TICK),
		map(action => {
			const { id, rgb, vary } = action.payload ?? {
				id: 99999,
				rgb: { r: 255, g: 255, b: 255 },
				vary: 'none',
			};
			const result = match(vary?.toUpperCase(), {
				RED: () => {
					const res = colorRedAction({ id, rgb, vary });
					return res;
				},
				GREEN: () => {
					const res = colorGreenAction({ id, rgb, vary });
					return res;
				},
				BLUE: () => {
					const res = colorBlueAction({ id, rgb, vary });
					return res;
				},
				_: () => {
					const res = colorNoneAction({ id, rgb, vary });
					return res;
				},
			});

			return result;
		}),
	);
}
