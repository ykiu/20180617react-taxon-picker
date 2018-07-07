import {createSelector} from 'reselect';

import makeGetChildren from './getChildren'
import makeGetParents from './getParents'

export default function makeAddSiblingTaxa(getOriginalTaxa, getTaxa) {
  return createSelector(
    [
      makeGetChildren(getTaxa, getOriginalTaxa),
      makeGetParents(getTaxa, getOriginalTaxa)
    ],
    (children, parents) => children.merge(parents)
  )
}
