import {List, Map} from 'immutable';
import makeCreateIndex from './createIndex';


describe('createIndex()', () => {
  it('returns the mapping from field values to rows', () => {
    const originalMap = Map([
      [1234, Map([
        ['id', 1234],
        ['name', 'foo'],
      ])],
      [2345, Map([
        ['id', 2345],
        ['name', 'bar'],
      ])],
      [3456, Map([
        ['id', 3456],
        ['name', 'bar'],
      ])],
    ]);
    const expectedMap = Map([
      ['foo', List([
        Map([
          ['id', 1234],
          ['name', 'foo'],
        ]),
      ])],
      ['bar', List([
        Map([
          ['id', 2345],
          ['name', 'bar'],
        ]),
        Map([
          ['id', 3456],
          ['name', 'bar'],
        ]),
      ])],
    ]);
    const createIndex = makeCreateIndex(() => originalMap, 'name');
    const resultingMap = createIndex();
    expect(expectedMap.toJS()).toEqual(resultingMap.toJS())
  });
});

