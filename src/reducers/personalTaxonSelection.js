import {
  PERFORM_PERSONAL_TAXON_SELECTION,
  CHANGE_SEARCH_TEXT,
  IMPORT_REFERENTIAL_TAXA,
} from '../actions/types'
import makeCreateIndex from '../selectors/createIndex';
import makeGetParents from '../selectors/getParents';
import sortTaxaByDepth from '../calculators/sortTaxaByDepth';
import { List } from 'immutable';

const createIndexOnPersonalCommonNamesByNames = makeCreateIndex(
  state => state.get('personalCommonNames'), 'name');

const getReferentialTaxonParents = makeGetParents(
  entireState => entireState.get('referentialTaxa'),
  (_, props) => props
)

function selectTaxonOnSearchText(state, action, entireState) {
  const searchText = action.text;
  if (searchText === '') {
    return null;
  } else {
    const commonNamesByNames = createIndexOnPersonalCommonNamesByNames(entireState);
    const taxonID = commonNamesByNames.getIn([searchText, 0, 'taxon']);
    if (taxonID === undefined) {
      return state;
    } else {
      return taxonID;
    }
  }
}

function selectTaxonOnImportData(_, action, entireState) {
  const sortedTaxa = sortTaxaByDepth(getReferentialTaxonParents, List(action.IDs), entireState);
  const newID = action.getID(sortedTaxa.first());
  return newID;
}

export default function(state=null, action, entireState){
  switch (action.type) {
    case PERFORM_PERSONAL_TAXON_SELECTION:
      return action.taxonID
    case CHANGE_SEARCH_TEXT:
      return selectTaxonOnSearchText(state, action, entireState);
    case IMPORT_REFERENTIAL_TAXA:
      return selectTaxonOnImportData(state, action, entireState);
    default:
      return state;
  }
};

