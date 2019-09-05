import { combineEpics, createEpicMiddleware } from 'redux-observable';
import colorTickEpic from './colorTickEpic';
import timeTickEpic from './timeTickEpic';

export const epicMiddleware = createEpicMiddleware();
export const rootEpic = combineEpics(colorTickEpic, timeTickEpic);

export default rootEpic;
