// @flow
import { createAction } from '@client/redux/actions';
import { BLUE } from '@client/redux/constants/ActionTypes';

// Blue operation action
export type BluePayload = any;
export default function blue(payload: BluePayload) {
	return createAction(BLUE, payload);
}
