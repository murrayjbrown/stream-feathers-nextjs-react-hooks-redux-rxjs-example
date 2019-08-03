// @flow
import React, { useContext, useEffect, useReducer } from 'react';

import feathers from '@client/feathers';
import match from 'rust-match';
import produce from 'immer';
import AppLogin from '@client/containers/AppLogin';

const app = {
	client: null,
	socket: null,
};

export const appClient = () => app.client;

const initClient = () => {
	if (!app.client) {
		Object.assign(app, feathers());
	}
	return app.client;
};

type Action = {
	type: string,
	payload: any,
};

type State = {
	email: string,
	error: ?Error,
	isStarted: boolean,
	login: ?Object,
};

type Update = {
	email?: string,
	error?: ?Error,
	isStarted?: ?boolean,
	login?: ?Object,
};

const initialState: State = {
	email: '',
	error: null,
	isStarted: false,
	login: null,
};

export const actions = {
	reset: (error?: Error) => ({
		type: 'reset',
		payload: error,
	}),
	start: () => ({
		type: 'start',
	}),
	update: (stateProps: Update) => ({
		type: 'update',
		payload: stateProps,
	}),
};

export const reducer = (state: State, action: Action) =>
	produce(state, draft =>
		match(action.type, {
			reset: () => {
				return {
					...initialState,
					error: !action.payload ? null : action.payload,
				};
			},
			start: () => {
				return { ...draft, ...action.payload };
			},
			update: () => {
				return { ...draft, ...action.payload };
			},
			_: () => {
				throw new Error('Unexpected action: ' + action.type);
			},
		}),
	);

/*
 * Custom hook
 */

export function useAppContainer() {
	const contextValue = useContext(AppContainerContext);

	return useReducer(reducer, contextValue);
}

export const AppContainerContext: any = React.createContext<State>(
	initialState,
);

type Props = {
	authenticate?: string,
	children: any,
	label?: string
};

export default function AppContainer({
	authenticate = 'anonymous',
	children,
	label
}: Props) {
	const [state, dispatch] = useAppContainer();

	useEffect(() => {
		const client = initClient();
		if (client && !state.isStarted) {
			client.service('authenticated').removeListener('created');
			client.on('authenticated', login => {
				dispatch(actions.update({ login }));
			});
			// On logout reset all all local state (which will then show the login screen)
			client.service('logout').removeListener('created');
			client.on('logout', () => {
				dispatch(actions.reset());
			});
			// Attempt to authenticate with the JWT stored in localStorage
			client.authenticate().catch(() => {});
		}

		return () => {
			if (client) {
				client.service('authenticated').removeListener('created');
				client.service('logout').removeListener('created');
			}
		};
	}, [state.isStarted]);

	if (!authenticate.startsWith('anon') && !state.login) {
		return (
			<AppContainerContext.Provider value={state}>
				<AppLogin data-testid={'AppLogin'} label={label}>
					{children}
				</AppLogin>
			</AppContainerContext.Provider>
		);
	}

	return (
		<AppContainerContext.Provider value={state}>
			<div id={label}>{children}</div>
		</AppContainerContext.Provider>
	);
}
