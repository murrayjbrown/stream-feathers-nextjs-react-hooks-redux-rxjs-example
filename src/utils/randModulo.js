// @flow
export function randModulo(modulo: number = 1) {
	return Number(Math.floor(modulo * Math.random()));
}

export default randModulo;
