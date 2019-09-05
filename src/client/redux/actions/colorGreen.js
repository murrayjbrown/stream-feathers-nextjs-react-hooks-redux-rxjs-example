// @flow
import { createAction } from '@client/redux/actions';
import { COLOR_GREEN } from '@client/redux/constants/ActionTypes';

// Blue operation action
export type GreenPayload = any;
export default function colorGreenAction(payload: GreenPayload) {
	return createAction(COLOR_GREEN, payload);
}
