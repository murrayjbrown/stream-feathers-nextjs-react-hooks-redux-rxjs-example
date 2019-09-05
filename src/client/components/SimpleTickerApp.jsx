// @flow
import React, { useEffect, useState } from 'react';
import feathers from '@client/feathers';
import datetime from 'dayjs';

export default function SimpleTickerApp() {
	const { client } = feathers();

	const [time, setTime] = useState('Now');

	useEffect(() => {
		if (client) {
			if (client.io) {
				client.io.connect();
			}
			if (client.service) {
				// Subscribe to ticker stream
				client.service('ticks').on('created', message => {
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
			<h1>Simple Ticker</h1>
			<h2>
				{time}
			</h2>
		</main>
	);
}
