let configFile;
const selfConfig = require('../xlsx-json-parser.config.js');
const path = process.cwd() + '/';

try {
  configFile = require(path + 'xlsx-json-parser.config.js');
} catch(err) {
  configFile = require('../xlsx-json-parser.config.js');
}

const config = {
  listNumber: configFile.listNumber || selfConfig.listNumber,
  withFilenames: configFile.withFilenames || selfConfig.withFilenames,
  xlsxDir: path + (configFile.xlsxDir || selfConfig.xlsxDir) + '/',
  jsonDir: path + (configFile.jsonDir || selfConfig.jsonDir) + '/',
  fileTemplate(lang, template) {
    return configFile.fileTemplate ? configFile.fileTemplate(lang, template) : selfConfig.fileTemplate(lang, template)
  }
};

/**
 * Get arguments from command line
 * >node index listNumber xlsxDir jsonDir --wfn
 */
process.argv.forEach(function (val) {
  config.listNumber = val.includes('--ln=') ? parseInt(val.split('=')[1]) : config.listNumber;
  config.withFilenames = val.includes('--wfn') ? val : config.withFilenames;
  config.xlsxDir = val.includes('--xlsx=') ? val.split('=')[1] : config.xlsxDir;
  config.jsonDir = val.includes('--json=') ? val.split('=')[1] : config.jsonDir;
});

module.exports = config;