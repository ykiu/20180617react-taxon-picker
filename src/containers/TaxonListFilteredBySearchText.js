import { connect } from 'react-redux'
import makeFilterTaxaBySearchText from '../selectors/filterTaxaBySearchText'
import makeCreateIndex from '../selectors/createIndex'
import TaxonListAndImportPrompt from '../components/TaxonListAndImportPrompt'
import makeAddSiblingTaxa from '../selectors/addSiblingTaxa'


function makeMapStateToProps() {
  const filterTaxaBySearchText = makeFilterTaxaBySearchText(
    (_, props) => props.searchText,
    state => state.get('personalTaxa'),
    state => state.get('personalCommonNames')
  );
  const createIndexOnTaxaByParents = makeCreateIndex(taxa => taxa, 'parent');
  const createIndexOnCommonNamesByTaxonIDs = makeCreateIndex(state => state.get('personalCommonNames'), 'taxon');
  const createIndexOnScientificNamesByTaxonIDs = makeCreateIndex(state => state.get('personalScientificNames'), 'taxon');
  const addSiblingTaxa = makeAddSiblingTaxa(
    (_, filteredTaxa) => filteredTaxa,
    state => state.get('personalTaxa'),
  );
  return function mapStateToProps(state, props) {
    let taxa;
    if (props.searchText === '') {
      taxa = state.get('personalTaxa');
    } else {
      const filteredTaxa = filterTaxaBySearchText(state, props);
      taxa = addSiblingTaxa(state, filteredTaxa);
    }
    return {
      ...props,
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
)(TaxonListAndImportPrompt)
