/**
 * Search all translate keys and values recursive
 * @param obj
 * @returns boolean
 */
function recursiveSearchValues (obj) {
  if (!Object.keys(obj).length) return false;

  for(let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        if (Object.keys(obj[key]).length === 1) {
          return recursiveSearchValues(obj[key]);
        } else {
          return obj[key];
        }
      } else {
        return obj;
      }
    } else {
      return false;
    }
  }
}

module.exports = recursiveSearchValues;