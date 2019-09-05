// @flow
import { createAction } from '@client/redux/actions';
import { COLOR_TICK } from '@client/redux/constants/ActionTypes';

// Time action
export type ColorActionProps = {
	meta: {
		tickId: string,
		timestamp: string,
	},
	payload: {
		id: string,
		rgb: {
			r: number,
			g: number,
			b: number,
		},
		vary: string,
	},
};

export default function colorTickAction({ payload, meta }: ColorActionProps) {
	return createAction(COLOR_TICK, payload, meta);
}
