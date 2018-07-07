import {createSelector} from 'reselect';
import makeCreateIndex from './createIndex';

import {List, Map, Stack} from 'immutable';

export default function makeGetChildren(getTaxa, getOriginalTaxa) {
  return createSelector(
    getOriginalTaxa,
    makeCreateIndex(getTaxa, 'parent'),
    (taxonSubsetByIDs, childTaxaByParentIDs) => {
      /**@type {Stack} */
      let taxonStack = taxonSubsetByIDs.toStack();
      return Map().withMutations(resultTaxaByIDs => {
        while (taxonStack.count()) {
          const currentTaxon = taxonStack.peek();
          const currentTaxonID = currentTaxon.get('id');
          taxonStack = taxonStack.pop();
          resultTaxaByIDs = resultTaxaByIDs.set(currentTaxonID, currentTaxon);
          /**@type {List<Map>} */
          const childTaxa = childTaxaByParentIDs.get(currentTaxonID, List());
          taxonStack = taxonStack.pushAll(childTaxa);
        }
        return resultTaxaByIDs
      })
    }
  );
}
