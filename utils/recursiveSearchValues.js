/**
 * Search all translate keys and values recursive
 * @param obj
 * @returns obj
 */
function recursiveSearchValues (obj) {
  for(let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (Object.keys(obj[key]).length === 1) {
        return recursiveSearchValues(obj[key])
      } else {
        return obj[key]
      }
    }
  }
}

module.exports = recursiveSearchValues;