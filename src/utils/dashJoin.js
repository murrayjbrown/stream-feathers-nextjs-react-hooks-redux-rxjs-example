// @flow
// eslint-disable-next-line fp/no-rest-parameters
export function dashJoin(ids: Array<string>): string {
	return [...ids]
		.map(e => e.trim().replace(/ /gi, '_'))
		.filter(e => e.length > 0)
		.join('-');
}

export default dashJoin;
