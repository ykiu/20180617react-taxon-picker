import { connect } from 'react-redux'
import SelectableNestedList from '../components/SelectableNestedList'

const mapStateToProps = state => ({
  taxa: state.get('taxa'),
})

const mapDispatchToProps = dispatch => Object();

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectableNestedList)
