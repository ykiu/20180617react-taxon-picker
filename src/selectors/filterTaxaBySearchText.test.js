import {fromJS} from 'immutable';
import makeFilterTaxaBySearchText from './filterTaxaBySearchText';


describe('filterTaxaBySearchText()', () => {
  it('subsets the taxa in state by the given search text.', () => {
    const taxaByIDs = {
      '1234': {
        'id': '1234',
        'parent': null,
      },
      '2345': {
        'id': '2345',
        'parent': '1234',
      },
      '3456': {
        'id': '3456',
        'parent': null,
      },
    };
    const commonNamesByIDs = {
      'abcd': {
        'id': 'abcd',
        'name': 'foo',
        'taxon': '1234',
      },
      'bcde': {
        'id': 'bcde',
        'name': 'bar',
        'taxon': '2345',
      },
      'cdef': {
        'id': 'cdef',
        'name': 'baz',
        'taxon': '3456',
      },
    };
    const state = fromJS({
      'commonNames': commonNamesByIDs,
      'taxa': taxaByIDs
    });
    const filterTaxaBySearchText = makeFilterTaxaBySearchText();
    const actual = filterTaxaBySearchText(state, {searchText: 'foo'});
    expect(actual.toJS()).toEqual({'1234': taxaByIDs['1234']});
  });
});

