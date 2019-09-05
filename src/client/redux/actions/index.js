// @flow
import colorBlue from './colorBlue';
import colorGreen from './colorGreen';
import colorRed from './colorRed';
import colorTick from './colorTick';
import noop from './noop';
import time from './time';
import timeTick from './timeTick';

// Create action object
export type Meta = any;
export type Payload = any;

export const createAction = (type: string, payload: Payload, meta: Meta) => ({
	type,
	payload,
	meta,
});

export const actions = {
	noop,
	colorBlue,
	colorGreen,
	colorTick,
	colorRed,
	time,
	timeTick,
};

export default actions;
