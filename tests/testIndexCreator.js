const expect = require('chai').expect;
const Map = require('immutable').Map;
const List = require('immutable').List;

const createIndex = require('../src/indexCreator');

describe('indexCreator', () => {
    it('returns a mapping from field values to rows', () => {
        const originalMap = Map([
            [1234, Map([
                ['id', 1234],
                ['name', 'foo'],
            ])],
            [2345, Map([
                ['id', 2345],
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
            ])],
        ]);
        const resultingMap = createIndex(originalMap, 'name');
        expect(expectedMap.toJS()).to.deep.equal(resultingMap.toJS())
    });
});

