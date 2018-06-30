import {createSelector} from 'reselect';

import {List} from 'immutable';

import createIndex from '../indexCreator';

function getSearchText(state, props) {
  return props.searchText;
}

function getTaxa(state, props) {
  return state.get('taxa');
}
function getCommonNames(state, props) {
  return state.get('commonNames');
}

export default function makeFilterTaxaBySearchText() {
  return createSelector(
    [getSearchText, getTaxa, getCommonNames],
    (searchText, taxa, commonNames) => {
      const commonNamesByNames = createIndex(commonNames, 'name');
      const matchedCommonNames = commonNamesByNames.get(searchText, List())
      if (matchedCommonNames.count() === 0) {
        return taxa;
      }
      /**@type {List} */
      const matchedTaxonIDs = matchedCommonNames.map(x => x.get('taxon'));
    
      const children = getChildren(taxa, matchedTaxonIDs);
      const parentIDs = matchedTaxonIDs.map(x => taxa.getIn([x, 'parent'])).filterNot(x => x === null);
      const grandParents = getParents(taxa, parentIDs);
      const matchedTaxaWithSibs = children.concat(grandParents);
      return taxa.filter((value, key) => 
        matchedTaxaWithSibs.includes(value)
      );
    }
  )
}

/**
 * 
 * @param {List} taxonIDs 
 */
function getChildren(taxa, taxonIDs) {
  const childTaxaByParentIDs = createIndex(taxa, 'parent');
  const resultTaxa = [];
  /**@type {Array} */
  const taxonIDStack = taxonIDs.toArray();
  while (taxonIDStack.length) {
    const currentTaxonID = taxonIDStack.pop();
    const currentTaxon = taxa.get(currentTaxonID);
    resultTaxa.push(currentTaxon);
    /**@type {Array<Map>} */
    const childTaxa = childTaxaByParentIDs.get(currentTaxonID, List()).map(x => x.get('id')).toArray();
    Array.prototype.push.apply(taxonIDStack, childTaxa);
  }
  return resultTaxa;
}

/**
 * 
 * @param {List} taxonIDs 
 */
function getParents(taxa, taxonIDs) {
  const resultTaxa = [];
  /**@type {Array} */
  const taxonIDStack = taxonIDs.toArray();
  while (taxonIDStack.length) {
    const currentTaxonID = taxonIDStack.pop();
    const currentTaxon = taxa.get(currentTaxonID);
    resultTaxa.push(currentTaxon);
    /**@type {Array<Map>} */
    const parentTaxonID = currentTaxon.get('parent')
    if (parentTaxonID !== null) {
      taxonIDStack.push(parentTaxonID);
    }
  }
  return resultTaxa;
}