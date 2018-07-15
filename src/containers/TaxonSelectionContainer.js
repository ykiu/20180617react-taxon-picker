import {
  changeSearchText,
  toggleReferentialTaxon,
  selectAllReferentialTaxa,
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
  selectAllReferentialTaxa: () => dispatch(selectAllReferentialTaxa()),
});

export default this.container = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(TaxonSelection)