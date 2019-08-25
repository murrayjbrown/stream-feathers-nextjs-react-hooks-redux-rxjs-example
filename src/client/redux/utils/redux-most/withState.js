/**
 * withState - Access latest stream state change.
 *
 * A utility function for use with redux-most's optional state stream API. This provides a convenient way to sample the latest state change value. Note: accessing the alternate API requires using createStateStreamEnhancer.
 *
 * Synopsis
 *
 *    withState (stateStream, actionStream)
 *
 * Arguments
 *
 *    stateStream (Stream): The state stream provided by redux-most's alternate API.
 *    actionStream (Stream): The filtered stream of action events used to trigger sampling of the latest state. (Ex: actions$).
 *
 * Returns
 *
 *  ([state, action]): An Array of length 2 (or Tuple) containing the latest state value at index 0 and the latest action of the filtered action stream at index 1.
 *
 *
 * withState is curried, allowing you to pass in the state stream & action stream together, at the same time, or separately, delaying passing in the action stream. This provides the user extra flexibility, allowing it to easily be used within functional composition pipelines.
 *
 *
 * Example
 *
 * import { select, withState } from 'redux-most'
 * import { curriedMap as map } from '../utils'
 * import compose from 'ramda/src/compose'
 *
 * const accessStateFromArray = ([state, action]) => ({
 *   type: 'ACCESS_STATE',
 *   payload: {
 *     latestState: state,
 *     accessedByAction: action,
 *   },
 * })
 *
 * // dispatch { type: 'STATE_STREAM_TEST' } in Redux DevTools to test
 * const stateStreamTest = (action$, state$) => compose(
 *   map(accessStateFromArray),
 *   withState(state$),
 *   select('STATE_STREAM_TEST')
 *  )(action$)
 *
 * export default stateStreamTest
 *
 * @file: withState.js
 * @see: redux-most
 * @link: https://github.com/joshburgess/redux-most
 * @author: Josh Burgess
 * @license: MIT
 */

import { sampleArray } from 'most';
import { curry3 } from '@most/prelude';

const flippedSampleState = curry3((f, stateStream, samplerStream) =>
	sampleArray(f, samplerStream, [stateStream, samplerStream]),
);

const toArray = (state, samplerStreamEvent) => [state, samplerStreamEvent];

export const withState = flippedSampleState(toArray);

export default withState;
