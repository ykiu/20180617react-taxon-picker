import {OrderedMap, Stack} from 'immutable';

import {createSelector} from 'reselect';

export default function makeGetParents(getTaxa, getOriginalTaxa) {
  return createSelector(
    getTaxa,
    getOriginalTaxa,
    (taxa, originalTaxaByIDs) => {
      /**@type {Stack} */
      let taxonStack = originalTaxaByIDs.toStack();
      return OrderedMap().withMutations(resultTaxaByIDs => {
        while (taxonStack.count()) {
          const currentTaxon = taxonStack.peek();
          taxonStack = taxonStack.pop();
          resultTaxaByIDs = resultTaxaByIDs.set(currentTaxon.get('id'), currentTaxon);
          const parentTaxon = taxa.get(currentTaxon.get('parent'), null);
          if (parentTaxon !== null) {
            taxonStack = taxonStack.push(parentTaxon);
          }
        }
        return resultTaxaByIDs;
      })
    }
  );
}
