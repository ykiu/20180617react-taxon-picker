import {IMPORT_REFERENTIAL_TAXA} from './types';
export const importReferentialTaxa = referentialTaxonIDs => ({
  type: IMPORT_REFERENTIAL_TAXA,
  IDs: referentialTaxonIDs,
})
