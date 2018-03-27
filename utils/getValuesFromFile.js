const fs = require('fs');
const recursiveSearchValues = require('./recursiveSearchValues');

/**
 * Get values from file
 * @param file
 */
function getValuesFromFile(file) {
  let contents;

  try {
    contents = fs.readFileSync(file, 'utf8');
  } catch(err) {
    console.log('JSON file was incorrect or not defined: ' + err);
    return false;
  }

  return recursiveSearchValues(JSON.parse(contents));
}

module.exports = getValuesFromFile;