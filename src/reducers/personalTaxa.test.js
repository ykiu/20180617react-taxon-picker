// A superset of redux-immutable/tests/combineReducers.js

import {Map, Set} from 'immutable'
import personalTaxaReducer from './personalTaxa';
import { importReferentialTaxa } from "../actions/personalTaxa";


describe('personalTaxa', () => {
  describe('importReferentialTaxa', () => {
    it('copies the specified taxa into an appropriate super taxon', () => {
      const personalTaxa = Map([
        ['1', Map([
          ['id', '1'],
          ['parent', null],
        ])],
      
        ['2', Map([
          ['id', '2'],
          ['parent', '1'],
        ])],
      
        ['3', Map([
          ['id', '3'],
          ['parent', null],
        ])],
      ]);

      const personalCommonNames = Map([
        ['1', Map([
          ['id', '1'],
          ['name', 'カヤツリグサ科'],
          ['taxon', '1'],
        ])],
      
        ['2', Map([
          ['id', '2'],
          ['name', 'スゲ属'],
          ['taxon', '2'],
        ])],
      
        ['3', Map([
          ['id', '3'],
          ['name', 'イネ科'],
          ['taxon', '3'],
        ])],
      ]);

      const personalScientificNames = Map([
        ['1', Map([
          ['id', '1'],
          ['name', 'Cyperaceae'],
          ['taxon', '1'],
        ])],
      
        ['2', Map([
          ['id', '2'],
          ['name', 'Carex'],
          ['taxon', '2'],
        ])],
      
        ['3', Map([
          ['id', '3'],
          ['name', 'Poaceae'],
          ['taxon', '3'],
        ])],
      ]);
      
      const referentialTaxa = Map([
        ['1', Map([
          ['id', '1'],
          ['parent', null],
        ])],
      
        ['2', Map([
          ['id', '2'],
          ['parent', '1'],
        ])],
      
        ['3', Map([
          ['id', '3'],
          ['parent', '2'],
        ])],

        ['4', Map([
          ['id', '4'],
          ['parent', '3'],
        ])],
      ]);

      const referentialCommonNames = Map([
        ['1', Map([
          ['id', '1'],
          ['name', 'カヤツリグサ科'],
          ['taxon', '1'],
        ])],
      
        ['2', Map([
          ['id', '2'],
          ['name', 'スゲ属'],
          ['taxon', '2'],
        ])],
      
        ['3', Map([
          ['id', '3'],
          ['name', 'ビロードスゲ節'],
          ['taxon', '3'],
        ])],

        ['4', Map([
          ['id', '4'],
          ['name', 'ビロードスゲ'],
          ['taxon', '4'],
        ])],
      ]);

      const referentialScientificNames = Map([
        ['1', Map([
          ['id', '1'],
          ['name', 'Cyperaceae'],
          ['taxon', '1'],
        ])],
      
        ['2', Map([
          ['id', '2'],
          ['name', 'Carex'],
          ['taxon', '2'],
        ])],
      
        ['3', Map([
          ['id', '3'],
          ['name', 'Sect. Carex'],
          ['taxon', '3'],
        ])],

        ['4', Map([
          ['id', '4'],
          ['name', 'Carex miyabei'],
          ['taxon', '4'],
        ])],
      ]);

      const entireState = Map([
        ['referentialTaxa', referentialTaxa],
        ['referentialCommonNames', referentialCommonNames],
        ['referentialScientificNames', referentialScientificNames],
        ['personalTaxa', personalTaxa],
        ['personalCommonNames', personalCommonNames],
        ['personalScientificNames', personalScientificNames],
      ])

      const acion = importReferentialTaxa(Set(['3', '4']));
      const actual = personalTaxaReducer(personalTaxa, acion, entireState);
      const expected = personalTaxa.withMutations(taxa => taxa.set('fake3', Map([
        ['id', 'fake3'],
        ['parent', '2'],
      ])).set('fake4', Map([
        ['id', 'fake4'],
        ['parent', 'fake3'],
      ])))
      expect(actual).toEqual(expected);
    });
  })
});