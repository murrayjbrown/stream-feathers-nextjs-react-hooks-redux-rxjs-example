// @flux
import { combineReducers } from 'redux';
import noopReducer from './noopReducer';
import colorReducer from './colorReducer';
import timeReducer from './timeReducer';

export const rootReducer = combineReducers({
	noopReducer,
	colorReducer,
	timeReducer,
});

export default rootReducer;
