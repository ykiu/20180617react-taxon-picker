import { connect } from 'react-redux'
import makeFilterTaxaBySearchText from '../selectors/filterTaxaBySearchText'
import makeCreateIndex from '../selectors/createIndex'
import TaxonListWithSiblings from './TaxonListWithSiblings';


function makeMapStateToProps() {
  const filterTaxaBySearchText = makeFilterTaxaBySearchText();
  const createIndexOnTaxaByParents = makeCreateIndex(state => state.get('taxa'), 'parent');
  const createIndexOnCommonNamesByTaxonIDs = makeCreateIndex(state => state.get('commonNames'), 'taxon');
  const createIndexOnScientificNamesByTaxonIDs = makeCreateIndex(state => state.get('scientificNames'), 'taxon');
  return function mapStateToProps(state, props) {
    return {
      ...props,
      matchedTaxa: filterTaxaBySearchText(state, props),
      childTaxaByParentIDs: createIndexOnTaxaByParents(state, props),
      commonNamesByTaxonIDs: createIndexOnCommonNamesByTaxonIDs(state, props),
      scientificNamesByTaxonIDs: createIndexOnScientificNamesByTaxonIDs(state, props),
    }
  }
}

const mapDispatchToProps = dispatch => Object();

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(TaxonListWithSiblings)
