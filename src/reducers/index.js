import { combineReducers } from 'redux-immutable';
import ui from './ui';
import personalTaxa from './personalTaxa';
import personalCommonNames from './personalCommonNames';
import personalScientificNames from './personalScientificNames';
import referentialTaxa from './referentialTaxa';
import referentialCommonNames from './referentialCommonNames';
import referentialScientificNames from './referentialScientificNames';

export default combineReducers({
  personalTaxa,
  personalCommonNames,
  personalScientificNames,
  referentialTaxa,
  referentialCommonNames,
  referentialScientificNames,
  ui,
});