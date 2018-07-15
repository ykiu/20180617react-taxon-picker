import { combineReducers } from 'redux-immutable';
import referentialTaxonSelection from './referentialTaxonSelection';
import searchText from './searchText';

export default combineReducers({
  selectedReferentialTaxonIDs: referentialTaxonSelection,
  searchText: searchText
});