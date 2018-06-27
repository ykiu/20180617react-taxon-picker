import {Map} from 'immutable';

const default_state = Map([
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
    ['name', 'Sect. Mitratae'],
    ['taxon', '3'],
  ])],
]);

export default function(state, action){
  return default_state;
};
