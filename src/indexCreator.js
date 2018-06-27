const Map = require('immutable').Map;
const List = require('immutable').List;
/**
 * 
 * @param {Map} data The immutable.js collection to be indexed
 * @param {*} fieldName The field to be used as the key of the index
 */
module.exports = function createIndex(data, fieldName) {
  return data.reduce(
    (index, row) => {
      const fieldValue = row.get(fieldName)
      return index.set(
        fieldValue,
        index.get(fieldValue, List()).push(row)
      )
    },
    Map(),
  )
};

