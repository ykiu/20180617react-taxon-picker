import { combineReducers } from 'redux-immutable';
import taxa from './taxa';
import commonNames from './commonNames';
import scientificNames from './scientificNames';

export default combineReducers({
  taxa,
  commonNames,
  scientificNames
});