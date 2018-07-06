import {createSelector} from 'reselect';

import {List, Map, Stack} from 'immutable';

function getMatched(state, props) {
  return props.matchedTaxa;
}

function getChildTaxaByParentIDs(state, props) {
  return props.childTaxaByParentIDs
}

export default function makeGetChildren() {
  return createSelector(
    getMatched,
    getChildTaxaByParentIDs,
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
