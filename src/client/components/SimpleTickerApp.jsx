// @flow
import React, { useEffect, useState } from 'react';
import feathers from '@client/feathers';
import datetime from 'dayjs';
import colorString from '@utils/colorString';

export default function SimpleTickerApp() {
	const { client } = feathers();

	const [time, setTime] = useState('Now');
	const [color, setColor] = useState('#000000');

	useEffect(() => {
		if (client) {
			if (client.io) {
				client.io.connect();
			}
			if (client.service) {
				// Subscribe to ticker stream
				client.service('ticks').on('created', message => {
					if (message.payload.rgb) {
						setColor(colorString(message.payload.rgb));
					}
					setTime(datetime(message.payload.time).format('YYYY-MM-DD HH:mm:ss'));
				});
			}
		}

		return () => {
			if (client) {
				if (client.logoff) {
					client.logoff();
				}
				if (client.io) {
					client.io.disconnect();
				}
			}
		};
	}, [client]);

	return (
		<main className='container text-center'>
			<h1>
				Time:&nbsp;
				<span style={{ color }}>{time}</span>
			</h1>
		</main>
	);
}
