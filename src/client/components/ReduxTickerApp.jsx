// @flow
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '@client/redux/actions';
import feathers from '@client/feathers';
import clone from '@utils/clone';

export default function ReduxTickerApp() {
	const { client } = feathers();

	const dispatch = useDispatch();

	const color = useSelector(state => {
		const result = !(
			state.timeReducer &&
			state.timeReducer.time &&
			state.timeReducer.time.color
		)
			? '#000'
			: clone(state).timeReducer.time.color;
		return result;
	});

	const time = useSelector(state => {
		const result = !(
			state.timeReducer &&
			state.timeReducer.time &&
			state.timeReducer.time.time
		)
			? 'Now'
			: clone(state).timeReducer.time.time;
		return result;
	});

	function dispatchTick(message) {
		dispatch(actions.tick({
			meta: {
				timestamp: message.timestamp,
			},
			payload: {
				id: message.id,
				rgb: message.payload.rgb,
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

	return (
		<main className='container text-center'>
			<h1>
				Time:&nbsp;
				<span style={{ color }}>{time}</span>
			</h1>
		</main>
	);
}
