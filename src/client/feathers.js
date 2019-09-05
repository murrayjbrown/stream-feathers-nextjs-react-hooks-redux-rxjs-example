// @flow
import io from 'socket.io-client';
import feathers from '@feathersjs/client';

type ClientApp = {
	client: ?Object,
	socket: ?Object,
};

const app: ClientApp = {
	client: null, // eslint-disable-line fp/no-nil
	socket: null, // eslint-disable-line fp/no-nil
};

export default function feathersClient() {
	if (typeof window !== 'undefined' && !app.client) {
		const socket = io();

		const client = feathers();
		client.configure(feathers.socketio(socket));
		client.configure(
			feathers.authentication({
				// eslint-disable-next-line no-undef
				storage: window.localStorage,
			}),
		);
		// eslint-disable-next-line fp/no-mutating-assign
		Object.assign(app, { client, socket });
	}

	return app;
}
