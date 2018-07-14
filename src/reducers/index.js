import { combineReducers } from 'redux-immutable';
import personalTaxa from './personalTaxa';
import personalCommonNames from './personalCommonNames';
import personalScientificNames from './personalScientificNames';
import referentialTaxa from './referentialTaxa';
import referentialCommonNames from './referentialCommonNames';
import referentialScientificNames from './referentialScientificNames';

export default combineReducers({
  personalTaxa: personalTaxa,
  personalCommonNames: personalCommonNames,
  personalScientificNames: personalScientificNames,
  referentialTaxa: referentialTaxa,
  referentialCommonNames: referentialCommonNames,
  referentialScientificNames: referentialScientificNames,
});