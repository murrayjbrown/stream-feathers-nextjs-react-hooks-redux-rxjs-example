// @flow
export function hexByte(val: number) {
	return (`0${val.toString(16)}`).slice(-2);
}

export default hexByte;
