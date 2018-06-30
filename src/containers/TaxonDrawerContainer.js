import { connect } from 'react-redux'
import TaxonDrawer from '../components/TaxonDrawer'

const mapStateToProps = (state, props) => ({
  commonNames: state.get('commonNames'),
  selectedTaxonID: props.selectedTaxonID,
  tabIndex: 0,
  role: 'button'
})

const mapDispatchToProps = dispatch => Object();

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaxonDrawer)
