import { combineReducers } from 'redux-immutable';
import taxa from './taxa';
import commonNames from './commonNames';
import scientificNames from './scientificNames';

export default combineReducers({
  personalTaxa: taxa,
  personalCommonNames: commonNames,
  personalScientificNames: scientificNames,
  referentialTaxa: taxa,
  referentialCommonNames: commonNames,
  referentialScientificNames: scientificNames,
});