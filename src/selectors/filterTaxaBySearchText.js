import {createSelector} from 'reselect';

import {List} from 'immutable';

import makeCreateIndex from './createIndex'

function getSearchText(state, props) {
  return props.searchText;
}

function getCommonNames(state, props) {
  return state.get('commonNames');
}

function getTaxa(state) {
  return state.get('taxa');
}

export default function makeFilterTaxaBySearchText() {
  return createSelector(
    [getSearchText, getTaxa, makeCreateIndex(getCommonNames, 'name')],
    (searchText, taxa, commonNamesByNames) => {
      const matchedCommonNames = commonNamesByNames.get(searchText, List())
      /**@type {List} */
      const matchedTaxonIDs = matchedCommonNames.map(x => x.get('taxon'));
      // Map.filter() is not efficient
      return taxa.filter((value, key) => matchedTaxonIDs.includes(key))
    }
  )
}
