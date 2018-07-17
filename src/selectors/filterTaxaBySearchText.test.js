import {fromJS} from 'immutable';
import makeFilterTaxaBySearchText from './filterTaxaBySearchText';


describe('filterTaxaBySearchText()', () => {
  it('returns those taxa with names that match the given search text ' +
     '(their ancestors and decendants are ignored).', () => {
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
    const filterTaxaBySearchText = makeFilterTaxaBySearchText(
      () => 'foo',
      () => fromJS(taxaByIDs),
      () => fromJS(commonNamesByIDs)
    );
    const actual = filterTaxaBySearchText();
    expect(actual.toJS()).toEqual({'1234': taxaByIDs['1234']});
  });
  it('returns the given taxa as is if the search text is empty.', () => {
    const taxaByIDs = {
      '1234': {
        'id': '1234',
        'parent': null,
      },
      '2345': {
        'id': '2345',
        'parent': '1234',
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
    };
    const state = fromJS({
      'commonNames': commonNamesByIDs,
      'taxa': taxaByIDs
    });
    const filterTaxaBySearchText = makeFilterTaxaBySearchText(
      () => '',
      () => fromJS(taxaByIDs),
      () => fromJS(commonNamesByIDs)
    );
    const actual = filterTaxaBySearchText();
    expect(actual.toJS()).toEqual({
      '1234': taxaByIDs['1234'],
      '2345': taxaByIDs['2345'],
    });
  });
});

