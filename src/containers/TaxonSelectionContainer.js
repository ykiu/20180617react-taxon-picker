import { connect } from 'react-redux'
import {Set, Map, List} from 'immutable'

import {
  changeSearchText,
  toggleReferentialTaxonSelection,
  activateReferentialTaxonSelectionInBulk,
  toggleReferentialTaxonExpansion,
  togglePersonalTaxonExpansion,
} from '../actions/ui'

import {
  importReferentialTaxa,
} from "../actions/personalTaxa";

import makeCreateIndex from '../selectors/createIndex'
import makeFilterTaxaBySearchTextLoose from '../selectors/filterTaxaBySearchTextLoose'
import getSearchText from '../selectors/getSearchText'

import TaxonSelection from '../components/TaxonSelection'

function selectRelevantReferentialTaxa(props) {
  /**@type {Array<Map>} */
  const nodeStack = props.referentialChildTaxaByParentIDs.get(null, List()).toArray();
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

  return activateReferentialTaxonSelectionInBulk(IDs);
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
  // can break memoization because of the cache size being 1.
  
  return function(state, props) {
    return {
      ...props,
      referentialChildTaxaByParentIDs: createIndexOnReferentialTaxaByParentIDs(filterReferentialTaxa(state, props)),
      personalChildTaxaByParentIDs: createIndexOnPersonalTaxaByParentIDs(filterPersonalTaxa(state, props)),
      searchText: state.getIn(['ui', 'taxonSelection', 'searchText']),
      selectedReferentialTaxonIDs: state.getIn(['ui', 'taxonSelection', 'selectedReferentialTaxonIDs']),
      expandedReferentialTaxonIDs: state.getIn(['ui', 'taxonSelection', 'expandedReferentialTaxonIDs']),
      expandedPersonalTaxonIDs: state.getIn(['ui', 'taxonSelection', 'expandedPersonalTaxonIDs']),
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeSearchText: text => dispatch(changeSearchText(text)),
  toggleReferentialTaxonSelection: taxonID => dispatch(toggleReferentialTaxonSelection(taxonID)),
  toggleReferentialTaxonExpansion: taxonID => dispatch(toggleReferentialTaxonExpansion(taxonID)),
  togglePersonalTaxonExpansion: taxonID => dispatch(togglePersonalTaxonExpansion(taxonID)),
  importReferentialTaxa: (...args) => dispatch(importReferentialTaxa(...args))
})

const mapDispatchToPropsWithOwnProps = (dispatch, ownProps) => ({
  ...ownProps,
  selectRelevantReferentialTaxa: () => dispatch(selectRelevantReferentialTaxa(ownProps)),
})


export default
connect(makeMapStateToProps, mapDispatchToProps)(
  connect(null, mapDispatchToPropsWithOwnProps)(TaxonSelection))