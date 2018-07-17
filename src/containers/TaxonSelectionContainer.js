import {
  changeSearchText,
  toggleReferentialTaxon,
  selectMultipleReferentialTaxa,
} from '../actions/ui'
import { connect } from 'react-redux'
import TaxonSelection from '../components/TaxonSelection'

function makeMapStateToProps(state, props) {
  return {
    ...props,
    searchText: state.getIn(['ui', 'taxonSelection', 'searchText']),
    selectedReferentialTaxonIDs: state.getIn(['ui', 'taxonSelection', 'selectedReferentialTaxonIDs']),
  }
}

const mapDispatchToProps = dispatch => ({
  changeSearchText: text => dispatch(changeSearchText(text)),
  toggleReferentialTaxon: taxonID => dispatch(toggleReferentialTaxon(taxonID)),
  selectMultipleReferentialTaxa: taxonIDs => dispatch(selectMultipleReferentialTaxa(taxonIDs)),
});

export default this.container = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(TaxonSelection)