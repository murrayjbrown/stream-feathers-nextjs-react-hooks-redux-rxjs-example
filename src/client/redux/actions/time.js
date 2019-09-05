// @flow
import { createAction } from '@client/redux/actions';
import { TIME } from '@client/redux/constants/ActionTypes';

// Time action
export type TimeProps = {
	meta: {
		tickId: String,
		timestamp: string,
	},
	payload: {
		time: string,
	},
};

export default function timeAction({ payload, meta }: TimeProps) {
	return createAction(TIME, payload, meta);
}
