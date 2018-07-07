import {fromJS} from 'immutable';
import makeGetChildren from './getChildren';


describe('getChildren()', () => {
  it('returns the input taxa plus their children.', () => {
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
      '1234': {
        'id': '1234',
        'parent': null,
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
    const getChildren = makeGetChildren(
      () => allTaxaByIDs,
      () => subsetTaxaByIDs,
    );
    const actualChildTaxaByID = getChildren();
    expect(actualChildTaxaByID.toJS()).toEqual(expectedChildTaxaByIDs);
  });
});

