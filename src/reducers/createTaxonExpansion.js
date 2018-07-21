import {Set} from 'immutable';
import {
  TOGGLE_PERSONAL_TAXON_EXPANSION,
  PERFORM_PERSONAL_TAXON_EXPANSION_IN_BULK,
  TOGGLE_REFERENTIAL_TAXON_EXPANSION,
  PERFORM_REFERENTIAL_TAXON_EXPANSION_IN_BULK,
  CHANGE_SEARCH_TEXT,
} from '../actions/types'

const constantsByTaxonTypes = {
  personal: {
    TOGGLE_TAXON_EXPANSION: TOGGLE_PERSONAL_TAXON_EXPANSION,
    PERFORM_TAXON_EXPANSION_IN_BULK: PERFORM_PERSONAL_TAXON_EXPANSION_IN_BULK,
    MODEL_NAME: 'personalTaxa',
  },
  referential: {
    TOGGLE_TAXON_EXPANSION: TOGGLE_REFERENTIAL_TAXON_EXPANSION,
    PERFORM_TAXON_EXPANSION_IN_BULK: PERFORM_REFERENTIAL_TAXON_EXPANSION_IN_BULK,
    MODEL_NAME: 'referentialTaxa',
  },
}

export default function(taxonType) {
  const {
    TOGGLE_TAXON_EXPANSION,
    PERFORM_TAXON_EXPANSION_IN_BULK,
    MODEL_NAME,
  } = constantsByTaxonTypes[taxonType];
  return function(state=Set(), action, entireState){
    switch (action.type) {
      case TOGGLE_TAXON_EXPANSION:
        if (state.has(action.taxonID)) {
          return state.remove(action.taxonID);
        } else {
          return state.add(action.taxonID);
        }
      case PERFORM_TAXON_EXPANSION_IN_BULK:
        return Set(action.taxonIDs);
      case CHANGE_SEARCH_TEXT:
        if (action.text === '') {
          return Set();
        } else {
          const taxonModel = entireState.get(MODEL_NAME);
          if (state.count() === taxonModel.count()) {
            return state;
          } else {
            return Set(entireState.get(MODEL_NAME).keySeq());
          }
        }
      default:
        return state;
    }
  }
};
