import { connect } from 'react-redux'
import makeFilterTaxaBySearchText from '../selectors/filterTaxaBySearchText'
import makeCreateIndex from '../selectors/createIndex'
import EditableTaxonList from '../components/EditableTaxonList'
import makeAddSiblingTaxa from '../selectors/addSiblingTaxa'


function makeMapStateToProps() {
  const filterTaxaBySearchText = makeFilterTaxaBySearchText(
    (_, props) => props.searchText,
    state => state.get('taxa'),
    state => state.get('commonNames')
  );
  const createIndexOnTaxaByParents = makeCreateIndex(taxa => taxa, 'parent');
  const createIndexOnCommonNamesByTaxonIDs = makeCreateIndex(state => state.get('commonNames'), 'taxon');
  const createIndexOnScientificNamesByTaxonIDs = makeCreateIndex(state => state.get('scientificNames'), 'taxon');
  const addSiblingTaxa = makeAddSiblingTaxa(
    (_, filteredTaxa) => filteredTaxa,
    state => state.get('taxa'),
  );
  return function mapStateToProps(state, props) {
    const filteredTaxa = filterTaxaBySearchText(state, props);
    const taxa = addSiblingTaxa(state, filteredTaxa);
    return {
      ...props,
      taxa,
      commonNamesByTaxonIDs: createIndexOnCommonNamesByTaxonIDs(state),
      scientificNamesByTaxonIDs: createIndexOnScientificNamesByTaxonIDs(state),
      childTaxaByParentIDs: createIndexOnTaxaByParents(taxa),
    }
  }
}

const mapDispatchToProps = dispatch => Object();

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(EditableTaxonList)
