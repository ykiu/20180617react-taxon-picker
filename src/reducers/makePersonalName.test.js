import {Map, Set} from 'immutable'
import createNameReducer from './makePersonalName';
import { importReferentialTaxa } from "../actions/personalTaxa";


describe('personalTaxa', () => {
  describe('importReferentialTaxa', () => {
    it('copies the common names of the specified taxa', () => {
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

      const acion = importReferentialTaxa(Set(['3', '4']), oldID => `fake${oldID}`);
      const reducer = createNameReducer('common');
      const actual = reducer(personalCommonNames, acion, entireState);
      const expected = personalCommonNames.withMutations(commonName => commonName.set('fake3', Map([
        ['id', 'fake3'],
        ['name', 'ビロードスゲ節'],
        ['taxon', 'fake3'],
      ])).set('fake4', Map([
        ['id', 'fake4'],
        ['name', 'ビロードスゲ'],
        ['taxon', 'fake4'],
      ])))
      expect(actual).toEqual(expected);
    });
  })
});