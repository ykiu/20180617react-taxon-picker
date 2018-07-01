import {Map, Stack} from 'immutable';

import {createSelector} from 'reselect';

function getTaxa(state, props) {
  return state.get('taxa');
}
function getMatchedTaxa(state, props) {
  return props.matchedTaxa;
}

export default function makeGetParents() {
  return createSelector(
    getTaxa,
    getMatchedTaxa,
    (taxa, taxonSubsetByIDs) => {
      console.log('getParents()')
      /**@type {Stack} */
      let taxonIDStack = taxonSubsetByIDs.toStack();
      return Map().withMutations(resultTaxaByIDs => {
        while (taxonIDStack.count()) {
          const currentTaxon = taxonIDStack.peek();
          taxonIDStack = taxonIDStack.pop();
          resultTaxaByIDs = resultTaxaByIDs.set(currentTaxon.get('id'), currentTaxon);
          const parentTaxon = taxa.get(currentTaxon.get('parent'), null);
          if (parentTaxon !== null) {
            taxonIDStack = taxonIDStack.push(parentTaxon);
          }
        }
        return resultTaxaByIDs;    
      })
    }
  );
}
