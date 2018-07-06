import {fromJS} from 'immutable';
import makeCreateIndex from './createIndex';
import makeAddSiblingTaxa from './addSiblingTaxa';


describe('addSiblingTaxa()', () => {
  it('returns the input taxa plus their children and parents.', () => {
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
    const filteredTaxa = {'2345': taxaByIDs['2345']};
    const filteredTaxaPlusSiblings = {
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
    };
    const state = fromJS({
      'taxa': taxaByIDs
    });
    const createIndex = makeCreateIndex(() => state.get('taxa'), 'parent');
    const props = {
      matchedTaxa: fromJS(filteredTaxa),
      childTaxaByParentIDs: createIndex(),
    }
    const addSiblingTaxa = makeAddSiblingTaxa();
    const actual = addSiblingTaxa(state, props);
    expect(actual.toJS()).toEqual(filteredTaxaPlusSiblings);
  });
});

