// @flow
import { createAction } from '@client/redux/actions';
import { TICK } from '@client/redux/constants/ActionTypes';

// Tick action
export type TickProps = {
	meta: {
		timestamp: string,
	},
	payload: {
		id: string,
		rgb?: {
			r: string,
			g: string,
			b: string,
		},
		time: string,
	}
};

export default function tickAction({payload, meta}: TickProps) {
	return createAction(TICK, payload, meta);
}
