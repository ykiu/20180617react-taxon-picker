import {
  CHANGE_SEARCH_TEXT,
  TOGGLE_REFERENTIAL_TAXON_SELECTION,
  ACTIVATE_REFERENTIAL_TAXON_SELECTION_IN_BULK
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
})
