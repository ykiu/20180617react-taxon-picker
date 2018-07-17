import React, {Component} from 'react'
import { connect } from 'react-redux'
import makeFilterTaxaBySearchText from '../selectors/filterTaxaBySearchText'
import makeCreateIndex from '../selectors/createIndex'
import makeAddSiblingTaxa from '../selectors/addSiblingTaxa'
import getSearchText from '../selectors/getSearchText'

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
  const {taxonModelName, commonNameModelName} = MODEL_NAMES_BY_TAXON_TYPES[props.taxonType]
  const filterTaxaBySearchText = makeFilterTaxaBySearchText(
    getSearchText,
    state => state.get(taxonModelName),
    state => state.get(commonNameModelName)
  );
  const createIndexOnTaxaByParents = makeCreateIndex(taxa => taxa, 'parent');
  const addSiblingTaxa = makeAddSiblingTaxa(
    (_, filteredTaxa) => filteredTaxa,
    state => state.get(taxonModelName),
  );
  return function mapStateToProps(state, props) {
    let taxa;
    if (getSearchText(state) === '') {
      taxa = state.get(taxonModelName);
    } else {
      const filteredTaxa = filterTaxaBySearchText(state, props);
      taxa = addSiblingTaxa(state, filteredTaxa);
    }
    return {
      ...props,
      searchText: getSearchText(state),
      childTaxaByParentIDs: createIndexOnTaxaByParents(taxa),
    }
  }
}

export default class Container extends Component {
  constructor(props){
    super(props)
    this.container = connect(
      makeMapStateToProps,
    )(props.children);
  }
  render(){
    return (
      <this.container
        {...this.props}
      />
    )
  }
}