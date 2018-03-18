/**
 * Get values from array
 * @param array
 * @returns {{}}
 */
function getValuesFromArray (array) {
  const langsCount = array[0].length;
  const temp = {};

  for (let i = 0; i < langsCount; i++) {
    const tempInside = {};

    for (let k = 1; k < array.length; k++) {
      tempInside[`${array[k][0].replace(/ /g, '_').toLowerCase()}`] = array[k][i];
    }
    temp[array[0][i]] = tempInside;
  }
  return temp;
}

module.exports = getValuesFromArray;