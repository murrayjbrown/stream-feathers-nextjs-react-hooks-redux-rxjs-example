// @flow
import { createAction } from '@client/redux/actions';
import { NOOP } from '@client/redux/constants/ActionTypes';

// No (nil) operation action
export type NoopPayload = any;
export default function noopAction(payload: NoopPayload) {
	return createAction(NOOP, payload);
}
