const fs = require('fs');
const path = require('path');
const recursiveSearchValues = require('./recursiveSearchValues');

/**
 * Get values from file
 * @param file
 */
function getValuesFromFile(file) {
  file = path.resolve(__dirname + '/..', file);
  let contents;

  try {
    contents = fs.readFileSync(file, 'utf8');
  } catch(err) {
    console.log('JSON file was incorrect')
    return false;
  }

  return recursiveSearchValues(JSON.parse(contents));
}

module.exports = getValuesFromFile;