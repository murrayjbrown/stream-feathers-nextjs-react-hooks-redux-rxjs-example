// @flow
import { createAction } from '@client/redux/actions';
import { RED } from '@client/redux/constants/ActionTypes';

// Red operation action
export type RedPayload = any;
export default function red(payload: RedPayload) {
	return createAction(RED, payload);
}
