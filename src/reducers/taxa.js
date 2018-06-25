import {Map} from 'immutable';

const default_state = Map([
  ['1', Map([
    ['id', '1'],
    ['common_name', 'カヤツリグサ科'],
    ['scientific_name', 'Cyperaceae'],
    ['parent', null],
  ])],

  ['2', Map([
    ['id', '2'],
    ['common_name', 'スゲ属'],
    ['scientific_name', 'Carex'],
    ['parent', '1'],
  ])],

  ['3', Map([
    ['id', '3'],
    ['common_name', 'ヌカスゲ節'],
    ['scientific_name', 'Sect. Mitratae'],
    ['parent', '2'],
  ])],
]);

export default function(state, action){
  return default_state;
};
