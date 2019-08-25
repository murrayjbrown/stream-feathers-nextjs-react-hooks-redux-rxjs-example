// @flow
import { createAction } from '@client/redux/actions';
import { GREEN } from '@client/redux/constants/ActionTypes';

// Blue operation action
export type GreenPayload = any;
export default function blue(payload: GreenPayload) {
	return createAction(GREEN, payload);
}
