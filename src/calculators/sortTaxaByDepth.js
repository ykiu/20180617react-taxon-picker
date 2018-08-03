import { List } from 'immutable';

export default function sortTaxaByDepth(getParents, inputTaxa, entireState) {
  return inputTaxa.sort((taxonA, taxonB) => (
    getParents(entireState, List([taxonA])).count()
    > getParents(entireState, List([taxonB])).count()) ?
    1 : 0);
}
