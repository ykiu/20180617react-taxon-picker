import React, {Component} from 'react'
import { connect } from 'react-redux'
import makeCreateIndex from '../selectors/createIndex'

const indexCreators = {
  personalCommonNamesByNames: makeCreateIndex(state => state.get('personalCommonNames'), 'name'),
  personalScientificNamesByNames: makeCreateIndex(state => state.get('personalScientificNames'), 'name'),
  personalCommonNamesByTaxonIDs: makeCreateIndex(state => state.get('personalCommonNames'), 'taxon'),
  personalScientificNamesByTaxonIDs: makeCreateIndex(state => state.get('personalScientificNames'), 'taxon'),
  referentialCommonNamesByTaxonIDs: makeCreateIndex(state => state.get('referentialCommonNames'), 'taxon'),
  referentialScientificNamesByTaxonIDs: makeCreateIndex(state => state.get('referentialScientificNames'), 'taxon'),
}

function mapStateToProps(state, props) {
  const newProps = {};
  for (const indexCreator of props.indexCreators || []) {
    newProps[indexCreator] = indexCreators[indexCreator](state);
  }
  return {
    ...props,
    ...newProps,
  }
}


export default class Container extends Component {
  constructor(props){
    super(props)
    this.container = connect(
      mapStateToProps,
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