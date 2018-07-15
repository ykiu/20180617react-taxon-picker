import {CHANGE_SEARCH_TEXT} from '../actions/types'

export default function(state='', action){
  switch (action.type) {
    case CHANGE_SEARCH_TEXT:
      return action.text;
    default:
      return state;
  }
};
