import {IMPORT_REFERENTIAL_TAXA} from './types';
export const importReferentialTaxa = (referentialTaxonIDs, getID) => ({
  type: IMPORT_REFERENTIAL_TAXA,
  IDs: referentialTaxonIDs,
  getID
})
