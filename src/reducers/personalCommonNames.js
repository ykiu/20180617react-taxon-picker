import {Map} from 'immutable';

import createNameReducer from "./createPersonalName";

const defaultState = Map([
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

  ['3', Map([
    ['id', '3'],
    ['name', 'ヌカスゲ節'],
    ['taxon', '3'],
  ])],

  ['4', Map([
    ['id', '4'],
    ['name', 'ビロードスゲ節'],
    ['taxon', '4'],
  ])],

  ['5', Map([
    ['id', '5'],
    ['name', 'カヤツリグサ属'],
    ['taxon', '5'],
  ])],
]);

export default createNameReducer('common', defaultState);
