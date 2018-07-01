import createIndex from '../indexCreator';
import {createSelector} from 'reselect';

export default function makeCreateIndex(getData, fieldName) {
  return createSelector(
    [getData],
    (data) => createIndex(data, fieldName)
  )
}
