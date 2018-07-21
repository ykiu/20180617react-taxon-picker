import {Set} from 'immutable';
import {
  TOGGLE_REFERENTIAL_TAXON_EXPANSION,
  PERFORM_REFERENTIAL_TAXON_EXPANSION_IN_BULK,
} from '../actions/types'

export default function(state=Set(), action){
  switch (action.type) {
    case TOGGLE_REFERENTIAL_TAXON_EXPANSION:
      if (state.has(action.taxonID)) {
        return state.remove(action.taxonID);
      } else {
        return state.add(action.taxonID);
      }
    case PERFORM_REFERENTIAL_TAXON_EXPANSION_IN_BULK:
      return Set(action.taxonIDs);
    default:
      return state;
  }
};
