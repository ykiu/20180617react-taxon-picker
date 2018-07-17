import {Set, Map, List} from 'immutable'

import {
  changeSearchText,
  toggleReferentialTaxon,
  selectMultipleReferentialTaxa,
} from '../actions/ui'
import { connect } from 'react-redux'
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


function makeMapStateToProps(state, props) {
  return {
    ...props,
    searchText: state.getIn(['ui', 'taxonSelection', 'searchText']),
    selectedReferentialTaxonIDs: state.getIn(['ui', 'taxonSelection', 'selectedReferentialTaxonIDs']),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeSearchText: text => dispatch(changeSearchText(text)),
  toggleReferentialTaxon: taxonID => dispatch(toggleReferentialTaxon(taxonID)),
  selectMultipleReferentialTaxa: taxonIDs => dispatch(selectMultipleReferentialTaxa(taxonIDs)),
  selectRelevantReferentialTaxa: () => dispatch(selectRelevantReferentialTaxa(ownProps))
});

export default this.container = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(TaxonSelection)