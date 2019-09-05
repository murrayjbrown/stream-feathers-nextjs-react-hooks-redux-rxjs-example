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

		const redStyle = {
			minWidth: '10em',
			backgroundColor: `#${hex(tick.rgb?.r ?? 0) + hex(0) + hex(0)}`,
			fontFamily: 'monospace',
		};
		const greenStyle = {
			minWidth: '10em',
			backgroundColor: `#${hex(0) + hex(tick.rgb?.g ?? 0) + hex(0)}`,
			fontFamily: 'monospace',
		};
		const blueStyle = {
			minWidth: '10em',
			backgroundColor: `#${hex(0) + hex(0) + hex(tick.rgb?.b ?? 0)}`,
			fontFamily: 'monospace',
		};
		const tickStyle = {
			minWidth: '20em',
			backgroundcolor: '#ffffff',
			color: '#000000',
			textAlign: 'left',
			fontFamily: 'monospace',
		};
		const bandStyle = {
			minWidth: '20em',
			backgroundcolor: '#ffffff',
			color: '#000000',
			textAlign: 'left',
			fontFamily: 'monospace',
		};

		const comboStyle = (bgColor: string = '#ffffff') => ({
			minWidth: '30em',
			backgroundColor: `${bgColor}`,
			fontFamily: 'monospace',
		});

		const spacerStyle = {
			height: '5px',
			maxHeight: '5px',
			width: '100%',
			backgroundColor: '#ffffff',
			fontFamily: 'monospace',
			textAlign: 'center',
		};

		return (
			<div key={tickId}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
					}}
				>
					<div key={`${tickId}-spacer`} style={spacerStyle}>
						&nbsp;
					</div>
					<div
						key={`${tickId}-combo`}
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
						}}
					>
						<div style={tickStyle}>{comboValue}</div>
						<div style={comboStyle(color)}>&nbsp;</div>
					</div>
					<div
						key={`${tickId}-bands`}
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
						}}
					>
						<div style={bandStyle}>{bandValue}</div>
						<div style={redStyle}>&nbsp;</div>
						<div style={greenStyle}>&nbsp;</div>
						<div style={blueStyle}>&nbsp;</div>
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
