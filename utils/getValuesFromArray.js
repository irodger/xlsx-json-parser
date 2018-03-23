/**
 * Get values from array
 * @param array {array<array>}
 * @param langsCount {number}
 * @returns {{}}
 */

function getValuesFromArray (array, langsCount) {
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