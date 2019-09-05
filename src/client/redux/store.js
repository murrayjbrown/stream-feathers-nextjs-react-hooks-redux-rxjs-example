// @flow
/* eslint-disable no-mixed-spaces-and-tabs */
import { applyMiddleware, compose, createStore } from 'redux';
import { epicMiddleware, rootEpic } from './epics';
import { rootReducer } from './reducers';

/* eslint-disable indent, no-undef */
const composeEnhancers: any =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
				// options here
		  })
		: compose;
/* eslint-enable indent, no-undef */

export function configureStore() {
	const middleware = [];

	const store: any = createStore(
		rootReducer,
		composeEnhancers(applyMiddleware(epicMiddleware, ...middleware)),
	);

	epicMiddleware.run(rootEpic);

	return store;
}

const store = configureStore();
export default store;
