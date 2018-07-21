import {
  CHANGE_SEARCH_TEXT,
  TOGGLE_REFERENTIAL_TAXON_SELECTION,
  ACTIVATE_REFERENTIAL_TAXON_SELECTION_IN_BULK,
  TOGGLE_REFERENTIAL_TAXON_EXPANSION,
  TOGGLE_PERSONAL_TAXON_EXPANSION,
  PERFORM_PERSONAL_TAXON_EXPANSION_IN_BULK,
  PERFORM_REFERENTIAL_TAXON_EXPANSION_IN_BULK,
} from './types';

export const changeSearchText = text => ({
  type: CHANGE_SEARCH_TEXT,
  text
});

export const toggleReferentialTaxonSelection = taxonID => ({
  type: TOGGLE_REFERENTIAL_TAXON_SELECTION,
  taxonID
});

export const activateReferentialTaxonSelectionInBulk= (taxonIDs) => ({
  type: ACTIVATE_REFERENTIAL_TAXON_SELECTION_IN_BULK,
  taxonIDs
});

export const toggleReferentialTaxonExpansion= (taxonID) => ({
  type: TOGGLE_REFERENTIAL_TAXON_EXPANSION,
  taxonID
});

export const togglePersonalTaxonExpansion= (taxonID) => ({
  type: TOGGLE_PERSONAL_TAXON_EXPANSION,
  taxonID
});

export const performReferentialTaxonExpansionInBulk= (taxonIDs) => ({
  type: PERFORM_REFERENTIAL_TAXON_EXPANSION_IN_BULK,
  taxonIDs
});

export const performPersonalTaxonExpansionInBulk= (taxonIDs) => ({
  type: PERFORM_PERSONAL_TAXON_EXPANSION_IN_BULK,
  taxonIDs
});
