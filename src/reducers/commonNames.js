import {Map} from 'immutable';

const default_state = Map([
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
    ['name', 'ヌカスゲ節'],
    ['taxon', '3'],
  ])],
]);

export default function(state, action){
  return default_state;
};
