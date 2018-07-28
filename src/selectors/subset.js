import { Map } from 'immutable';
export default function subset(entitiesByIDs, IDs) {
  return Map(IDs.toSeq().map(x => [x, entitiesByIDs.get(x)]));
}