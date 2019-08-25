import hex from './hexByte';

export type Rgb = {
	r: string,
	g: string,
	b: string,
};

export default function colorString(rgb: Rgb) {
	return `#${hex(rgb.r) + hex(rgb.g) + hex(rgb.b)}`;
}
