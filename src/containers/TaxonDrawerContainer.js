import { connect } from 'react-redux'
import TaxonDrawer from '../components/TaxonDrawer'
import makeCreateIndex from '../selectors/createIndex'


function makeMapStateToProps() {
  const createIndexOnCommonNamesByTaxonIDs = makeCreateIndex(state => state.get('personalCommonNames'), 'taxon');
  return function mapStateToProps(state, props) {
    return {
      ...props,
      commonNames: state.get('personalCommonNames'),
      selectedTaxonID: props.selectedTaxonID,
      tabIndex: 0,
      role: 'button',
      commonNamesByTaxonIDs: createIndexOnCommonNamesByTaxonIDs(state, props),
    }
  }
}

const mapDispatchToProps = dispatch => Object();

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(TaxonDrawer)
