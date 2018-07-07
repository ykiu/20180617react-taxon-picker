import {createSelector} from 'reselect';

import {List} from 'immutable';

import makeCreateIndex from './createIndex'

export default function makeFilterTaxaBySearchText(getSearchText, getTaxa, getCommonNames) {
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
