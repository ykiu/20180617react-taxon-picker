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

  ['4', Map([
    ['id', '4'],
    ['name', 'Sect. Carex'],
    ['taxon', '4'],
  ])],

  ['5', Map([
    ['id', '5'],
    ['name', 'Cyperus'],
    ['taxon', '5'],
  ])],

  ['6', Map([
    ['id', '6'],
    ['name', 'Carex miyabei Franch.'],
    ['taxon', '6'],
  ])],
]);

export default function(state, action){
  return default_state;
};
