// @flux
import { combineReducers } from 'redux';
import noopReducer from './noopReducer';
// import colorReducer from './colorReducer';
import tickReducer from './tickReducer';
import timeReducer from './timeReducer';

export const rootReducer = combineReducers({
	noopReducer,
	// colorReducer,
	tickReducer,
	timeReducer,
});

export default rootReducer;
