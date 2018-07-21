// A superset of redux-immutable/tests/combineReducers.js

import Immutable from 'immutable'
import combineReducers from './combineReducers';

const context = describe;

describe('combineReducers', () => {
  context('reducer returns received state', () => {
    it('returns initial state', () => {
      const rootReducer = combineReducers([
        ['foo', (state) => {
          return state;
        }]
      ]);

      const initialState = Immutable.fromJS({
        foo: {
          count: 0
        }
      });

      expect(rootReducer(initialState, {type: 'ADD'})).toEqual(initialState);
    });
  });

  context('reducer creates new domain state', () => {
    it('returns new state', () => {
      const rootReducer = combineReducers([
        ['foo', (state) => {
          return state.set('count', state.get('count') + 1);
        }]
      ]);

      const initialState = Immutable.fromJS({
        foo: {
          count: 0
        }
      });

      expect(rootReducer(initialState, {type: 'ADD'}).getIn(['foo', 'count'])).toEqual(1);
    })
  })

  context('root reducer is created from nested combineReducers', () => {
    it('returns initial state from default values', () => {
      const initialState = Immutable.fromJS({
        outer: {
          inner: {
            bar: false,
            foo: true
          }
        }
      });

      const innerDefaultState = Immutable.fromJS({
        bar: false,
        foo: true
      });

      const rootReducer = combineReducers([
        ['outer', combineReducers([
          ['inner', (state = innerDefaultState) => {
            return state;
          }]
        ])]
      ]);

      expect(rootReducer(undefined, {})).toEqual(initialState);
    });
  });

  context('root reducer uses a custom Immutable.Iterable as default state', () => {
    it('returns initial state as instance of supplied Immutable.Record', () => {
      const defaultRecord = Immutable.Record({
        bar: {
          prop: 1
        },
        foo: undefined  // eslint-disable-line no-undefined
      });
      const rootReducer = combineReducers([
        ['bar', (state) => {
          return state;
        }],
        ['foo', (state = {count: 0}) => {
          return state;
        }]
      ], defaultRecord);

      const initialState = {
        bar: {
          prop: 1
        },
        foo: {
          count: 0
        }
      };

      const reducedState = rootReducer(undefined, {});

      expect(reducedState.toJS()).toEqual(initialState);
      expect(reducedState).toBeInstanceOf(defaultRecord);
    });
    it('returns initial state as instance of Immutable.OrderedMap', () => {
      const rootReducer = combineReducers([
        ['bar', (state = {prop: 1}) => {
          return state;
        }],
        ['foo', (state = {count: 0}) => {
          return state;
        }]
      ], Immutable.OrderedMap);

      const initialState = {
        bar: {
          prop: 1
        },
        foo: {
          count: 0
        }
      };

      const reducedState = rootReducer(undefined, {});

      expect(reducedState.toJS()).toEqual(initialState);
      expect(reducedState).toBeInstanceOf(Immutable.OrderedMap);
    });
    it('returns initial state as result of custom function call', () => {
      const getDefaultState = () => {
        return Immutable.Map({
          bar: {
            prop: 1
          }
        });
      };
      const rootReducer = combineReducers([
        ['bar', (state) => {
          return state;
        }],
        ['foo', (state = {count: 0}) => {
          return state;
        }]
      ], getDefaultState);

      const initialState = {
        bar: {
          prop: 1
        },
        foo: {
          count: 0
        }
      };

      const reducedState = rootReducer(undefined, {});

      expect(reducedState.toJS()).toEqual(initialState);
      expect(reducedState).toBeInstanceOf(Immutable.Map);
    });
  });

  context('child reducer needs access to the entire state', () => {
    it('passes in the entire state', () => {
      const rootReducer = combineReducers([
        ['foo', (state) => {
          return true;
        }],
        ['bar', (state, action, entireState) => {
          return !entireState.get('foo');
        }],
      ]);

      const expectedInitialState = Immutable.fromJS({
        foo: true,
        bar: false
      });

      expect(rootReducer(undefined, {})).toEqual(expectedInitialState);
    })
  })
});