// @flow
/* eslint-disable no-mixed-spaces-and-tabs */
import { applyMiddleware, compose, createStore } from 'redux';
import { epicMiddleware, rootEpic } from './epics';
import { rootReducer } from './reducers';

const composeEnhancers: any =
	// eslint-disable-next-line no-undef
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? // eslint-disable-next-line no-undef
		  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			// options here
		  })
		: compose;

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
