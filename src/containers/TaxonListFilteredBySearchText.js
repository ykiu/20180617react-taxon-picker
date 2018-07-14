import React, {Component} from 'react'
import { connect } from 'react-redux'
import makeFilterTaxaBySearchText from '../selectors/filterTaxaBySearchText'
import makeCreateIndex from '../selectors/createIndex'
import makeAddSiblingTaxa from '../selectors/addSiblingTaxa'

const MODEL_NAMES_BY_TAXON_TYPES = {
  personal: {
    taxonModelName: 'personalTaxa',
    commonNameModelName: 'personalCommonNames',
    scientificNameModelName: 'personalScientificNames',
  },
  referential: {
    taxonModelName: 'referentialTaxa',
    commonNameModelName: 'referentialCommonNames',
    scientificNameModelName: 'referentialScientificNames',
  }
}

function makeMapStateToProps(state, props) {
  const {taxonModelName, commonNameModelName, scientificNameModelName} = MODEL_NAMES_BY_TAXON_TYPES[props.taxonType]
  const filterTaxaBySearchText = makeFilterTaxaBySearchText(
    (_, props) => props.searchText,
    state => state.get(taxonModelName),
    state => state.get(commonNameModelName)
  );
  const createIndexOnTaxaByParents = makeCreateIndex(taxa => taxa, 'parent');
  const createIndexOnCommonNamesByTaxonIDs = makeCreateIndex(state => state.get(commonNameModelName), 'taxon');
  const createIndexOnScientificNamesByTaxonIDs = makeCreateIndex(state => state.get(scientificNameModelName), 'taxon');
  const addSiblingTaxa = makeAddSiblingTaxa(
    (_, filteredTaxa) => filteredTaxa,
    state => state.get(taxonModelName),
  );
  return function mapStateToProps(state, props) {
    let taxa;
    if (props.searchText === '') {
      taxa = state.get(taxonModelName);
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

export default class Container extends Component {
  constructor(props){
    super(props)
    this.container = connect(
      makeMapStateToProps,
      mapDispatchToProps
    )(props.childType);
  }
  render(){
    return (
      <this.container
        {...this.props}
      />
    )
  }
}