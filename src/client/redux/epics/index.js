import { combineEpics, createEpicMiddleware } from 'redux-observable';
import tickEpic from './tickEpic';

export const epicMiddleware = createEpicMiddleware();
export const rootEpic = combineEpics(tickEpic);

export default rootEpic;
