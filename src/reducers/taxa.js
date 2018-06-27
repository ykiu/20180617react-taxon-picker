import {Map} from 'immutable';

const default_state = Map([
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
    ['parent', '2'],
  ])],

  ['5', Map([
    ['id', '5'],
    ['parent', '1'],
  ])],

]);

export default function(state, action){
  return default_state;
};
