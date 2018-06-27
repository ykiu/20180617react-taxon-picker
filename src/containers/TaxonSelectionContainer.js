import { connect } from 'react-redux'
import TaxonSelection from '../components/TaxonSelection'

const mapStateToProps = state => ({
  taxa: state.get('taxa'),
  commonNames: state.get('commonNames'),
  scientificNames: state.get('scientificNames'),
})

const mapDispatchToProps = dispatch => Object();

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaxonSelection)
