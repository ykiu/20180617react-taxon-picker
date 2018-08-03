import {Set} from 'immutable';
import {
  PERFORM_PERSONAL_TAXON_SELECTION,
} from '../actions/types'

export default function(state=null, action){
  switch (action.type) {
    case PERFORM_PERSONAL_TAXON_SELECTION:
      return action.taxonID
    default:
      return state;
  }
};
