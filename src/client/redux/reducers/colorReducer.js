import match from 'rust-match';
import produce from 'immer';
import type { Rgb } from '@utils/types';

const RGB: Rgb = {
	r: 0,
	g: 0,
	b: 0,
};

type ColorState = {
	id: number,
	rgb: Rgb,
	vary: string,
};

const INITIAL_STATE: {
	ticks: Array<ColorState>,
} = {
	rgb: { ...RGB },
	ticks: [
		{
			id: 0,
			lastRgb: { ...RGB },
			rgb: { ...RGB },
			vary: {},
		},
	],
};

export default function colorReducer(state = INITIAL_STATE, action) {
	const update = (draft, band: { r?: number, g?: number, b?: number }) => {
		const { id } = action.payload;
		const lastRgb = { ...draft.rgb };
		const rgb = {
			...lastRgb,
			...band,
		};

		return {
			rgb,
			ticks: [
				{
					id,
					rgb,
					vary: match(Object.keys(band)[0], {
						r: () => ({ r: band.r }),
						g: () => ({ g: band.g }),
						b: () => ({ b: band.b }),
						_: () => ({}),
					}),
				},
				...draft.ticks,
			],
		};
	};

	return produce(state, draft =>
		match(action.type, {
			COLOR_BLUE: () => {
				const { b } = action.payload.rgb;
				const revised = update(draft, { b });
				return revised;
			},
			COLOR_GREEN: () => {
				const { g } = action.payload.rgb;
				const revised = update(draft, { g });
				return revised;
			},
			COLOR_RED: () => {
				const { r } = action.payload.rgb;
				const revised = update(draft, { r });
				return revised;
			},
			COLOR_NONE: () => {
				const revised = update(draft, {});
				return revised;
			},
			_: () => {
				const result = { ...draft };
				return result;
			},
		}),
	);
}
