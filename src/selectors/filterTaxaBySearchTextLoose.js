import makeFilterTaxaBySearchText from './filterTaxaBySearchText'
import makeAddSiblingTaxa from './addSiblingTaxa'

export default function makeFilterTaxaBySearchTextLoose(getSearchText, getTaxa, getCommonNames) {
  const filterTaxaBySearchText = makeFilterTaxaBySearchText(getSearchText, getTaxa, getCommonNames);
  return makeAddSiblingTaxa(
    filterTaxaBySearchText,
    getTaxa,
  );
}
