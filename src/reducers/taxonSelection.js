import { combineReducers } from 'redux-immutable';
import referentialTaxonSelection from './referentialTaxonSelection';
import referentialTaxonExpansion from './referentialTaxonExpansion';
import personalTaxonExpansion from './personalTaxonExpansion';
import searchText from './searchText';

export default combineReducers({
  selectedReferentialTaxonIDs: referentialTaxonSelection,
  expandedReferentialTaxonIDs: referentialTaxonExpansion,
  expandedPersonalTaxonIDs: personalTaxonExpansion,
  searchText: searchText,
});