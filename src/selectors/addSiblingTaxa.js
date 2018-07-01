import {createSelector} from 'reselect';

import makeGetChildren from './getChildren'
import makeGetParents from './getParents'

export default function makeAddSiblingTaxa() {
  return createSelector(
    [makeGetChildren(), makeGetParents()],
    (children, parents) => children.merge(parents)
  )
}
