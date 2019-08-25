// @flow
import noop from './noop';
import tick from './tick';
import time from './time';

// Create action object
export type Meta = any;
export type Payload = any;

export const createAction = (type: string, payload: Payload, meta: Meta ) => ({ type, payload, meta });

export const actions = {
	noop,
	tick,
	time,
};

export default actions;
