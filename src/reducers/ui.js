import combineReducers from './combineReducers';
import taxonSelection from './taxonSelection';

export default combineReducers([
  ['taxonSelection', taxonSelection],
]);