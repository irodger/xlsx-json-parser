const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
const getValuesFromFile = require('./utils/getValuesFromFile');
const getValuesFromArray = require('./utils/getValuesFromArray');
const config = fs.existsSync(path.resolve(__dirname, './../../xlsx-json-parser.config.js')) ? require('../../xlsx-json-parser.config.js') : require('./xlsx-json-parser.config.js');
let listNumber = config.listNumber;
let withFilenames = config.withFilenames;
let xlsxDir = config.xlsxDir;
let jsonDir = config.jsonDir;

/**
 * Get arguments from command line
 * >node index listNumber xlsxDir jsonDir --wfn
 */
process.argv.forEach(function (val) {
  listNumber = val.includes('--ln=') ? parseInt(val.split('=')[1]) : config.listNumber;
  withFilenames = val.includes('--wfn') ? val : config.withFilenames;
  xlsxDir = val.includes('--xlsx=') ? val.split('=')[1] : config.xlsxDir;
  jsonDir = val.includes('--json=') ? val.split('=')[1] : config.jsonDir;
});

/**
 * Close app when folder with xlsx not found
 */
if (!fs.existsSync(xlsxDir)) {
  console.log(`Folder ${xlsxDir} with xlsx files doesn't exist. Checking your config file or directory.`);
  process.exit();
}

/**
 * Creating json directory if doesn't exist
 */
try {
  fs.mkdirSync(jsonDir);
} catch(err) {
  console.log(`Directory ${jsonDir} already exist. And it's okay.`);
}

fs.readdir(xlsxDir, (err, files) => {
  files.forEach(file => {
    if (file.toString().includes('.xls')) {
      const filename = file.replace(/((.xlsx)|(.xls))/g, '');
      const excelArray = xlsx.parse(`./${xlsxDir}/${file}`);

      const list = (listNumber) => {
        return typeof excelArray[listNumber - 1] !== 'undefined' ? excelArray[listNumber - 1] : console.log('List empty');
      };

      const currentList = list(listNumber);

      if (typeof currentList !== 'undefined' && currentList.data.length > 0) {
        const langs = currentList.data[0];
        const langsCount = langs.length;
        const tt = getValuesFromArray(currentList.data, langsCount);

        for (let i = 0; i < langs.length; i++) {
          const file = `${jsonDir}/${langs[i]}${withFilenames ? `_${filename}` : ''}.json`;
          let valuesArr = tt[`${langs[i]}`];
          let valuesToWrite, status;

          valuesToWrite = !fs.existsSync(file) ? valuesArr : Object.assign({}, getValuesFromFile(file), valuesArr);
          status = !fs.existsSync(file) ? 'created' : 'edited';
          valuesToWrite = config.fileTemplate(langs[i], valuesToWrite);

          try {
            fs.writeFileSync(file, valuesToWrite);

            console.log(`${langs[i]}${withFilenames ? `_${filename}` : ''}.json was ${status} in ${jsonDir}`);
          } catch(err) {
            return console.log('Error: ' + err);
          }
        }
      } else {
        return console.log('File ' + file + ' has no list ' + listNumber + '.\nTry another file or list.');
      }
    }
  });
});