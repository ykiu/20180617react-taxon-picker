import combineReducers from './combineReducers';
import ui from './ui';
import personalTaxa from './personalTaxa';
import personalCommonNames from './personalCommonNames';
import personalScientificNames from './personalScientificNames';
import referentialTaxa from './referentialTaxa';
import referentialCommonNames from './referentialCommonNames';
import referentialScientificNames from './referentialScientificNames';

export default combineReducers([
  ['ui', ui],
  ['personalTaxa', personalTaxa],
  ['personalCommonNames', personalCommonNames],
  ['personalScientificNames', personalScientificNames],
  ['referentialTaxa', referentialTaxa],
  ['referentialCommonNames', referentialCommonNames],
  ['referentialScientificNames', referentialScientificNames],
]);