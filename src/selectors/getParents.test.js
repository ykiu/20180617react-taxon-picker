import {fromJS} from 'immutable';
import makeGetParents from './getParents';


describe('getParents()', () => {
  it('returns the input taxa plus their parents.', () => {
    const allTaxaByIDs = fromJS({
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
    });
    const subsetTaxaByIDs = fromJS({
      '2345': {
        'id': '2345',
        'parent': '1234',
      },
    });
    const expectedChildTaxaByIDs = {
      '1234': {
        'id': '1234',
        'parent': null,
      },
      '2345': {
        'id': '2345',
        'parent': '1234',
      },
    };
    const getParents = makeGetParents(() => allTaxaByIDs, () => subsetTaxaByIDs);
    const actualChildTaxaByID = getParents();
    expect(actualChildTaxaByID.toJS()).toEqual(expectedChildTaxaByIDs);
  });
});

