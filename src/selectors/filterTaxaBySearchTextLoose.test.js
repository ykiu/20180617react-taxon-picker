import {fromJS} from 'immutable';
import makeFilterTaxaBySearchText from './filterTaxaBySearchTextLoose';


describe('filterTaxaBySearchText()', () => {
  it('returns those taxa returned by filterTaxaBySearchText() ' +
     'but also their decendants and ancestors.', () => {
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
        'parent': '2345',
      },
      '4567': {
        'id': '4567',
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
      'defg': {
        'id': 'defg',
        'name': 'qux',
        'taxon': '4567',
      },
    };
    const state = fromJS({
      'commonNames': commonNamesByIDs,
      'taxa': taxaByIDs
    });
    const filterTaxaBySearchText = makeFilterTaxaBySearchText(
      () => 'bar',
      () => fromJS(taxaByIDs),
      () => fromJS(commonNamesByIDs)
    );
    const actual = filterTaxaBySearchText();
    expect(actual.toJS()).toEqual({
      '1234': taxaByIDs['1234'],
      '2345': taxaByIDs['2345'],
      '3456': taxaByIDs['3456'],
    });
  });
});

