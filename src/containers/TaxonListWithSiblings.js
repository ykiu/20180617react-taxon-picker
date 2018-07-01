import { connect } from 'react-redux'
import EditableTaxonList from '../components/EditableTaxonList'
import makeAddSiblingTaxa from '../selectors/addSiblingTaxa'
import makeCreateIndex from '../selectors/createIndex'

function makeMapStateToProps() {
  const addSiblingTaxa = makeAddSiblingTaxa();
  const createIndex = makeCreateIndex((_, props) => props.taxa, 'parent');
  return function mapStateToProps(state, props) {
    const newProps = {
      ...props,
      taxa: addSiblingTaxa(state, props),
    }
    newProps.childTaxaByParentIDs = createIndex(state, newProps);
    return newProps
  }
}

const mapDispatchToProps = dispatch => Object();

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(EditableTaxonList)
