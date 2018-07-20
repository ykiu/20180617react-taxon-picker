import {Set} from 'immutable';
import {
  TOGGLE_REFERENTIAL_TAXON_SELECTION,
  ACTIVATE_REFERENTIAL_TAXON_SELECTION_IN_BULK,
} from '../actions/types'

export default function(state=Set(), action){
  switch (action.type) {
    case TOGGLE_REFERENTIAL_TAXON_SELECTION: 
      if (state.has(action.taxonID)) {
        return state.remove(action.taxonID);
      } else {
        return state.add(action.taxonID);
      }
    case ACTIVATE_REFERENTIAL_TAXON_SELECTION_IN_BULK:
      return state.union(action.taxonIDs)
    default:
      return state;
  }
};
