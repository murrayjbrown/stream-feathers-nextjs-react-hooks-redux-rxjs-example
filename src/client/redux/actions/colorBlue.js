// @flow
import { createAction } from '@client/redux/actions';
import { COLOR_BLUE } from '@client/redux/constants/ActionTypes';

// Blue operation action
export type BluePayload = any;
export default function colorBlueAction(payload: BluePayload) {
	return createAction(COLOR_BLUE, payload);
}
