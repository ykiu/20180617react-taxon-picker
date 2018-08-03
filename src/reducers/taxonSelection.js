import combineReducers from './combineReducers';
import referentialTaxonSelection from './referentialTaxonSelection';
import referentialTaxonExpansion from './referentialTaxonExpansion';
import personalTaxonExpansion from './personalTaxonExpansion';
import personalTaxonSelection from './personalTaxonSelection';
import searchText from './searchText';

export default combineReducers([
  ['selectedReferentialTaxonIDs', referentialTaxonSelection],
  ['expandedReferentialTaxonIDs', referentialTaxonExpansion],
  ['selectedPersonalTaxonID', personalTaxonSelection],
  ['expandedPersonalTaxonIDs', personalTaxonExpansion],
  ['searchText', searchText],
]);