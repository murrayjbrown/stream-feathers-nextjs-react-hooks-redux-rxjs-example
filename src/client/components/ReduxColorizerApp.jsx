// @flow
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import match from 'rust-match';
import colorTickAction from '@client/redux/actions/colorTick';
import colorString from '@utils/colorString';
import feathers from '@client/feathers';
import hex from '@utils/hexByte';
import type ColorState from '@client/redux/reducers/colorReducer';

export default function ReduxColorizerApp() {
	const { client } = feathers();

	const dispatch = useDispatch();

	function dispatchColorTick(message) {
		const props = {
			meta: {
				tickId: message.id,
				timestamp: message.timestamp,
			},
			payload: {
				id: message.id,
				rgb: message.payload.rgb ?? { r: 0, g: 0, b: 0 },
				vary: message.payload.vary ?? 'none',
			},
		};
		dispatch(colorTickAction(props));
	}

	useEffect(() => {
		if (client) {
			if (client.io) {
				client.io.connect();
			}
			if (client.service) {
				client.service('colors').on('created', message => {
					dispatchColorTick(message);
				});
			}
		}

		return () => {
			if (client && client.io) {
				client.io.disconnect();
			}
		};
	}, [client]);

	const ticks: Array<Object> = useSelector(state => state.colorReducer.ticks);

	function Tick(tick: ColorState) {
		const { id, vary } = tick;
		const color = colorString(tick.rgb);
		const tickId = `tick-${id}`;

		const varied: string = match(Object.keys(vary)[0], {
			r: () => `red: ${hex(vary.r)}`,
			g: () => `green: ${hex(vary.g)}`,
			b: () => `blue: ${hex(vary.b)}`,
			_: () => 'none',
		});

		const comboValue: string = `${id}: ${color}`;
		const bandValue: string = `vary ${varied}`;
		const bgColor = (value: string = '#ffffff') => ({
			backgroundColor: `${value}`,
		});

		return (
			<div className='tick' key={tickId}>
				<div className='tickSpacer'>&nbsp;</div>
				<div className='tickCombo'>
					<div className='comboHead'>{comboValue}</div>
					<div className='comboColor' style={bgColor(color)}>
						&nbsp;
					</div>
				</div>
				<div className='tickBands'>
					<div className='bandHead'>{bandValue}</div>
					{/* eslint-disable-next-line quotes */}
					<div className='redBand' style={bgColor(`#{hex(red)}0000`)}>
						&nbsp;
					</div>
					{/* eslint-disable-next-line quotes */}
					<div className='greenBand' style={bgColor(`#00{hex(green)}00`)}>
						&nbsp;
					</div>
					{/* eslint-disable-next-line quotes */}
					<div className='blueBand' style={bgColor(`#0000{hex(blue)}`)}>
						&nbsp;
					</div>
				</div>
			</div>
		);
	}

	const Ticks = ticks.map(tick => Tick(tick));

	return (
		<main className='container text-center'>
			<h1>Redux Colorizer</h1>
			{Ticks}
		</main>
	);
}
