import {
  CHANGE_SEARCH_TEXT,
  TOGGLE_REFERENTIAL_TAXON,
  SELECT_MULTIPLE_REFERENTIAL_TAXA
} from './types';

export const changeSearchText = text => ({
  type: CHANGE_SEARCH_TEXT,
  text
});

export const toggleReferentialTaxon = taxonID => ({
  type: TOGGLE_REFERENTIAL_TAXON,
  taxonID
});

export const selectMultipleReferentialTaxa= (taxonIDs) => ({
  type: SELECT_MULTIPLE_REFERENTIAL_TAXA,
  taxonIDs
})
