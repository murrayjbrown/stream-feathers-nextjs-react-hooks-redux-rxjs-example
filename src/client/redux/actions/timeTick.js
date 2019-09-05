// @flow
import { createAction } from '@client/redux/actions';
import { TIME_TICK } from '@client/redux/constants/ActionTypes';

// Tick action
export type TimeTickActionProps = {
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
	},
};

export default function timeTickAction({ payload, meta }: TimeTickActionProps) {
	return createAction(TIME_TICK, payload, meta);
}
