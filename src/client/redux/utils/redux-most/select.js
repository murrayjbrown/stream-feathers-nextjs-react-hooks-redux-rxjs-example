/**
 * select - A helper function for filtering the stream of actions by a single action type.
 *
 * Synopsis
 *
 *    select (actionType, stream)
 *
 * Arguments
 *
 *    actionType (string): The type of action to filter by.
 *    stream (Stream): The stream of actions you are filtering. Ex: actions$.
 *
 * Returns
 *
 *   (Stream): A new, filtered stream holding only the actions corresponding to the action type passed to select.
 *
 *
 * The select operator is curried, allowing you to use a fluent or functional style.
 *
 *
 * Examples
 *
 *
 * // Fluent style
 *
 * import { SEARCHED_USERS_DEBOUNCED } from '../constants/ActionTypes'
 * import { clearSearchResults } from '../actions'
 * import { select } from 'redux-most'
 *
 * const whereEmpty = ({ payload: { query } }) => !query
 *
 * const clear = action$ =>
 *   action$.thru(select(SEARCHED_USERS_DEBOUNCED))
 *     .filter(whereEmpty)
 *     .map(clearSearchResults)
 *
 * export default clear
 *
 * // Functional style
 *
 * import { SEARCHED_USERS_DEBOUNCED } from '../constants/ActionTypes'
 * import { clearSearchResults } from '../actions'
 * import { select } from 'redux-most'
 *
 * const whereEmpty = ({ payload: { query } }) => !query
 *
 * const clear = action$ => {
 *   const search$ = select(SEARCHED_USERS_DEBOUNCED, action$)
 *   const emptySearch$ = filter(whereEmpty, search$)
 *   return map(clearSearchResults, emptySearch$)
 * }
 *
 * export default clear
 *
 * // Functional & Pointfree style using functional composition
 *
 * import { SEARCHED_USERS_DEBOUNCED } from '../constants/ActionTypes'
 * import { clearSearchResults } from '../actions'
 * import { select } from 'redux-most'
 * import {
 *   curriedFilter as filter,
 *   curriedMap as map,
 * } from '../utils'
 * import { compose } from 'ramda'
 *
 * const whereEmpty = ({ payload: { query } }) => !query
 *
 * const clear = compose(
 *   map(clearSearchResults),
 *   filter(whereEmpty),
 *   select(SEARCHED_USERS_DEBOUNCED)
 * )

 * export default clear
 *
 * @file: select.js
 * @see: redux-most
 * @link: https://github.com/joshburgess/redux-most
 * @author: Josh Burgess
 * @license: MIT
 */

import { curry2 } from '@most/prelude';
import { filter } from 'most';

// Select action from Most.js stream
export const select = curry2((actionType, stream$) =>
	filter(({ type }) => type && type === actionType, stream$),
);

export default select;
