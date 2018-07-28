
import {Map, List} from 'immutable';
import {IMPORT_REFERENTIAL_TAXA} from '../actions/types';
import makeCreateIndex from '../selectors/createIndex';
import makeGetParents from '../selectors/getParents';
import subset from '../selectors/subset';

const createIndexOnPersonalCommonNamesByNames = makeCreateIndex(
  state => state.get('personalCommonNames'), 'name')
const createIndexOnReferentialCommonNamesByTaxonIDs = makeCreateIndex(
  state => state.get('referentialCommonNames'), 'taxon')
const getParents = makeGetParents(state => state.get('referentialTaxa'), (_, props) => props);

const default_state = Map([
  ['1', Map([
    ['id', '1'],
    ['parent', null],
  ])],

  ['2', Map([
    ['id', '2'],
    ['parent', '1'],
  ])],

  ['3', Map([
    ['id', '3'],
    ['parent', '2'],
  ])],

  ['4', Map([
    ['id', '4'],
    ['parent', '2'],
  ])],

  ['5', Map([
    ['id', '5'],
    ['parent', '1'],
  ])],

]);


export default function(state=default_state, action, entireState){
  switch (action.type) {
    case IMPORT_REFERENTIAL_TAXA:
      const orderedReferentialTaxa = sortTaxaByDepth(
        subset(entireState.get('referentialTaxa'), action.IDs),
        entireState)
      const rootPersonalTaxonID = inferImportDestination(entireState, orderedReferentialTaxa);
      const personalTaxaToInsert = updateIDs(orderedReferentialTaxa, rootPersonalTaxonID);
      return state.merge(personalTaxaToInsert)
    default:
      return state
  }
};

function updateIDs(orderedReferentialTaxa, rootTaxonID) {
  const IDs = orderedReferentialTaxa.keySeq().map(x => 'fake' + x).toList();
  const parentIDs = IDs.insert(0, rootTaxonID);
  return orderedReferentialTaxa
    .valueSeq()
    .zip(IDs, parentIDs)
    .map(([taxon, ID, parentID]) =>
      [ID, taxon.set('id', ID).set('parent', parentID)]
    );
}

function inferImportDestination(entireState, orderedReferentialTaxa) {
  const personalCommonNamesByNames = createIndexOnPersonalCommonNamesByNames(entireState);
  const referentialCommonNamesByTaxonIDs = createIndexOnReferentialCommonNamesByTaxonIDs(entireState);
  const referentialTaxonParents = getParents(entireState, orderedReferentialTaxa.slice(0, 1));
  let rootPersonalTaxonID = null;
  referentialTaxonParents.forEach((_, key) => {
    /**@type {List} */
    const referentialCommonNames = referentialCommonNamesByTaxonIDs.get(key);
    const rootPersonalTaxonIDCandidate = referentialCommonNames.toSeq().map(referentialCommonName => {
      const name = referentialCommonName.get('name');
      return personalCommonNamesByNames.getIn([name, 0, 'taxon']);
    }).filter(v => v !== undefined).first();
    if (rootPersonalTaxonIDCandidate !== undefined) {
      rootPersonalTaxonID = rootPersonalTaxonIDCandidate;
      return false;
    }
  });
  return rootPersonalTaxonID;
}

function sortTaxaByDepth(selectedReferentialTaxa, entireState) {
  return selectedReferentialTaxa.sort((taxonA, taxonB) => (
    getParents(entireState, List([taxonA])).count()
    > getParents(entireState, List([taxonB])).count()) ?
    1 : 0);
}
