// @flow
import { createAction } from '@client/redux/actions';
import { COLOR_RED } from '@client/redux/constants/ActionTypes';

// Red operation action
export type RedPayload = any;
export default function colorRedAction(payload: RedPayload) {
	return createAction(COLOR_RED, payload);
}
