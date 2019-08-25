// @flow
import test from 'ava';
import { dashJoin } from './index';

test('dashJoin("a", "b")', t => {
	const result = dashJoin('a','b');
	t.is(result, 'a-b');
});

test('dashJoin("", "a")', t => {
	const result = dashJoin('', 'a');
	t.is(result, 'a');
});

test('dashJoin("a", "", "b")', t => {
	const result = dashJoin('a', '', 'b');
	t.is(result, 'a-b');
});

test('dashJoin("a", " ", "b")', t => {
	const result = dashJoin('a', ' ', 'b');
	t.is(result, 'a-b');
});

test('dashJoin("a", "b c", "d")', t => {
	const result = dashJoin('a', 'b c', 'd');
	t.is(result, 'a-b_c-d');
});

