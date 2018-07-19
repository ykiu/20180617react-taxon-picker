import { connect } from 'react-redux'
import {Set, Map, List} from 'immutable'

import {
  changeSearchText,
  toggleReferentialTaxon,
  selectMultipleReferentialTaxa,
} from '../actions/ui'
import makeCreateIndex from '../selectors/createIndex'
import makeFilterTaxaBySearchTextLoose from '../selectors/filterTaxaBySearchTextLoose'
import getSearchText from '../selectors/getSearchText'

import TaxonSelection from '../components/TaxonSelection'

function selectRelevantReferentialTaxa(props) {
  /**@type {Array<Map>} */
  let nodeStack = props.referentialChildTaxaByParentIDs.get(null, List()).toArray();
  const IDs = [];

  while (nodeStack.length) {
    const currentNode = nodeStack.pop();
    const currentNodeID = currentNode.get('id')
    const childNode = props.referentialChildTaxaByParentIDs.getIn([currentNodeID, 0]);
    const referentialCommonNames = props.referentialCommonNamesByTaxonIDs.get(currentNodeID).map(obj => obj.get('name'));
    const isExisting = (Set(props.personalCommonNamesByNames.keySeq()).intersect(referentialCommonNames.toSet()).count()) !== 0;

    if (!isExisting) {
      IDs.push(currentNodeID)
    }
    if (childNode !== undefined) {
      nodeStack.push(childNode);
    }
  }

  return selectMultipleReferentialTaxa(IDs);
}


function makeMapStateToProps() {
  // prepare memoized selectors related to refernetial taxa
  const getReferentialTaxa = state => state.get('referentialTaxa');
  const getReferentialCommonNames = state => state.get('referentialCommonNames');
  const filterReferentialTaxa = makeFilterTaxaBySearchTextLoose(
    getSearchText, getReferentialTaxa, getReferentialCommonNames)
  const createIndexOnReferentialTaxaByParentIDs = makeCreateIndex(taxa => taxa, 'parent');

  // prepare memoized selectors related to personal taxa
  const getPersonalTaxa = state => state.get('personalTaxa');
  const getPersonalCommonNames = state => state.get('personalCommonNames');
  const filterPersonalTaxa = makeFilterTaxaBySearchTextLoose(
    getSearchText, getPersonalTaxa, getPersonalCommonNames)
  const createIndexOnPersonalTaxaByParentIDs = makeCreateIndex(taxa => taxa, 'parent');

  // keep in mind that sharing a single selector instance for multiple models
  // breaks memoization because of the cache size being 1.
  
  return function(state, props) {
    return {
      ...props,
      referentialChildTaxaByParentIDs: createIndexOnReferentialTaxaByParentIDs(filterReferentialTaxa(state, props)),
      personalChildTaxaByParentIDs: createIndexOnPersonalTaxaByParentIDs(filterPersonalTaxa(state, props)),
      searchText: state.getIn(['ui', 'taxonSelection', 'searchText']),
      selectedReferentialTaxonIDs: state.getIn(['ui', 'taxonSelection', 'selectedReferentialTaxonIDs']),
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeSearchText: text => dispatch(changeSearchText(text)),
  toggleReferentialTaxon: taxonID => dispatch(toggleReferentialTaxon(taxonID)),
  selectMultipleReferentialTaxa: taxonIDs => dispatch(selectMultipleReferentialTaxa(taxonIDs)),
})

const mapDispatchToProps2 = (dispatch, ownProps) => ({
  ...ownProps,
  selectRelevantReferentialTaxa: () => dispatch(selectRelevantReferentialTaxa(ownProps))
})


export default
connect(makeMapStateToProps, mapDispatchToProps)(
  connect(null, mapDispatchToProps2)(TaxonSelection))