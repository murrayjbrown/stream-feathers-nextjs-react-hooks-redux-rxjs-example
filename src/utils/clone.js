// @flow
import json from 'json-complete';

// flowlint-next-line unclear-type:off
export function clone(obj: Object) {
	return json.decode(json.encode(obj));
};

export default clone;
