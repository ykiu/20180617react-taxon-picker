import {Set} from 'immutable';
import {
  TOGGLE_REFERENTIAL_TAXON,
  SELECT_ALL_REFERENTIAL_TAXA,
} from '../actions/types'

export default function(state=Set(), action){
  switch (action.type) {
    case TOGGLE_REFERENTIAL_TAXON: 
      if (state.has(action.taxonID)) {
        return state.remove(action.taxonID);
      } else {
        return state.add(action.taxonID);
      }
    case SELECT_ALL_REFERENTIAL_TAXA:
      return state;
    default:
      return state;
  }
};
