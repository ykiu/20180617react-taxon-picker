import makeCreateIndex from "../selectors/createIndex";
import subset from '../selectors/subset';

import {IMPORT_REFERENTIAL_TAXA} from '../actions/types';

const CONSTANTS_BY_MODEL_TYPES = {
  common: {
    DESTINATION_MODEL_NAME: 'personalCommonNames',
    ORIGIN_MODEL_NAME: 'referentialCommonNames',
  },
  scientific: {
    DESTINATION_MODEL_NAME: 'personalScientificNames',
    ORIGIN_MODEL_NAME: 'referentialScientificNames',
  }
}

export default function(nameType, defaultState) {
  const {
    ORIGIN_MODEL_NAME,
  } = CONSTANTS_BY_MODEL_TYPES[nameType];

  const createIndexOnNamesByTaxonIDs = makeCreateIndex(
    state => state.get(ORIGIN_MODEL_NAME), 'taxon')
  return function (state=defaultState, action, entireState) {
   switch (action.type) {
     case IMPORT_REFERENTIAL_TAXA:
       const referentialTaxa = subset(
         entireState.get('referentialTaxa'), action.IDs);
       const referentialNamesByTaxonIDs = createIndexOnNamesByTaxonIDs(entireState);
       const referentialNameSubset = subset(
         referentialNamesByTaxonIDs, referentialTaxa.keySeq())
         .valueSeq().flatten(1);
       const personalNamesToInsert = updateIDs(referentialNameSubset, action.getID);
       return state.merge(personalNamesToInsert.map(entity => [entity.get('id'), entity]))
     default:
       return state;
   }
 };
}

function updateIDs(entities, getID) {
  return entities.map(entity => entity.withMutations(entity =>
    entity
    .set('id', getID(entity.get('id')))
    .set('taxon', getID(entity.get('taxon')))
  ))
}
