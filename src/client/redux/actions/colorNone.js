// @flow
import { createAction } from '@client/redux/actions';
import { COLOR_NONE } from '@client/redux/constants/ActionTypes';

// Red operation action
export type NonePayload = any;
export default function colorNoneAction(payload: NonePayload) {
	return createAction(COLOR_NONE, payload);
}
