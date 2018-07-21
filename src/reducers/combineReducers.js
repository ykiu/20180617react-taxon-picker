// Similar to redux-immutable/combineReducers but passes in
// the entire state as the third argument.

import {Map, Seq} from 'immutable';

function validateNextState(nextState, reducerName, action) {
  if (nextState === undefined) {
    throw new Error('Reducer "' + reducerName + '" returned undefined when handling "' + action.type + '" action. To ignore an action, you must explicitly return the previous state.');
  }
}

export default function(reducers, getDefaultState=Map) {
  return function(state, action, entireState) {
    const cleanedState = state === undefined? getDefaultState(): state;
    return cleanedState.withMutations(temporaryState => {
      reducers.forEach(reducerEntry => {
        const reducerName = reducerEntry[0];
        const reducer = reducerEntry[1];
        const currentDomainState = temporaryState.get(reducerName);

        // The reason for wrapping temporaryState in a Seq instead of passing it down directly is
        // to prevent accidental mutation inside the reducer function.
        const cleanedEntireState = entireState === undefined? Seq(temporaryState): entireState;
        const nextDomainState = reducer(currentDomainState, action, cleanedEntireState);

        validateNextState(nextDomainState, reducerName, action);

        temporaryState.set(reducerName, nextDomainState);
      })
    })
  }
}