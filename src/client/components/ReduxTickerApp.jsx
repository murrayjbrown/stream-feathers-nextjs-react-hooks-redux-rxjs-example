// @flow
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import timeTickAction from '@client/redux/actions/timeTick';
import feathers from '@client/feathers';

export default function ReduxTickerApp() {
	const { client } = feathers();

	const dispatch = useDispatch();

	function dispatchTick(message) {
		dispatch(timeTickAction({
			meta: {
				timestamp: message.timestamp,
			},
			payload: {
				id: message.id,
				time: message.payload.time,
			}
		}));
	}

	useEffect(() => {
		if (client) {
			if (client.io) {
				client.io.connect();
			}
			if (client.service) {
				client.service('ticks').on('created', message => {
					dispatchTick(message);
				});
			}
		}

		return () => {
			if (client && client.io) {
				client.io.disconnect();
			}
		};
	}, [client]);

	const time = useSelector(state => state.timeReducer.time);

	// const { color, time } = useSelector(state => state.timeReducer) ?? { color: '#ffffff', time: 'Now' };

	return (
		<main className='container text-center'>
			<h1>Redux Ticker</h1>
			<h2>
				{time}
			</h2>
		</main>
	);
}
