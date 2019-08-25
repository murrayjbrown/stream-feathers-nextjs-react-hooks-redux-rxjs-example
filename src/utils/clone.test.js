// @flow
import test from 'ava';
import { clone } from './index';

test('clone(object)', t => {
	const obj = {a: 1};
	const result = clone(obj);
	t.deepEqual(result, obj);
	t.not(result, obj);
});

test('clone(array)', t => {
	const arr = [1, 2, 3];
	const result = clone(arr);
	t.deepEqual(result, arr);
	t.not(result, arr);
});
