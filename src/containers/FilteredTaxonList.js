import { connect } from 'react-redux'
import EditableTaxonList from '../components/EditableTaxonList'
import makeFilterBySearchText from '../selectors/taxonSelectors'

function makeMapStateToProps() {
  const filterTaxaBySearchText = makeFilterBySearchText();
  return function mapStateToProps(state, props) {
    return {
      taxa: filterTaxaBySearchText(state, props),
      commonNames: state.get('commonNames'),
      scientificNames: state.get('scientificNames'),
      onItemSelect: props.onItemSelect,
    }
  }
}

const mapDispatchToProps = dispatch => Object();

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(EditableTaxonList)
