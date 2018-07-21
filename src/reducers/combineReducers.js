// Similar to redux-immutable/combineReducers but passes in
// the entire state as the third argument.

import {Map} from 'immutable';

function validateNextState(nextState, reducerName, action) {
  if (nextState === undefined) {
    throw new Error('Reducer "' + reducerName + '" returned undefined when handling "' + action.type + '" action. To ignore an action, you must explicitly return the previous state.');
  }
}

export default function(reducers, getDefaultState=Map) {
  return function(state, action) {
    const cleanedState = state === undefined? getDefaultState(): state;
    return cleanedState.withMutations(temporaryState => {
      reducers.forEach(reducerEntry => {
        const reducerName = reducerEntry[0];
        const reducer = reducerEntry[1];
        const currentDomainState = temporaryState.get(reducerName);
        const nextDomainState = reducer(currentDomainState, action, temporaryState);

        validateNextState(nextDomainState, reducerName, action);

        temporaryState.set(reducerName, nextDomainState);
      })
    })
  }
}