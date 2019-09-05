import hex from './hexByte';
import type { Rgb } from './types';

export default function colorString(rgb: Rgb) {
	return `#${hex(rgb.r) + hex(rgb.g) + hex(rgb.b)}`;
}
