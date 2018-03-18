const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
const config = fs.existsSync(path.resolve(__dirname, './../../xlsx-json-parser.config.js')) ? require('../../xlsx-json-parser.config.js') : require('./xlsx-json-parser.config.js');
let listNumber = config.listNumber;
let withFilenames = config.withFilenames;
let xlsxDir = config.xlsxDir;
let jsonDir = config.jsonDir;

const getValuesFromFile = require('./utils/getValuesFromFile');
const getValuesFromArray = require('./utils/getValuesFromArray');

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
if (!fs.existsSync(xlsxDir)){
  console.log(`Folder ${xlsxDir} with xlsx files doesn't exist`);
  process.exit();
}

/**
 * Creating json directory if doesn't exist
 */
if (!fs.existsSync(jsonDir)){
  fs.mkdirSync(jsonDir);
}

fs.readdir(xlsxDir, (err, files) => {
  files.forEach(file => {
    if (file.toString().includes('.xls')) {
      const filename = file.replace(/((.xlsx)|(.xls))/g, '');
      const excelArray = xlsx.parse(fs.readFileSync(`./${xlsxDir}/${file}`));

      const list = (listNumber) => {
        return typeof excelArray[listNumber - 1] !== 'undefined' ? excelArray[listNumber - 1] : console.log('List empty');
      };

      const currentList = list(listNumber);

      if (typeof currentList !== 'undefined' && currentList.data.length > 0) {
        const langs = currentList.data[0];
        const tt = getValuesFromArray(currentList.data);

        /**
         * Write files
         */
        for (let i = 0; i < langs.length; i++) {
          let valuesArr = tt[`${langs[i]}`];
          const file = `${jsonDir}/${langs[i]}${withFilenames ? `_${filename}` : ''}.json`;
          let valuesToWrite, status;

          if (!fs.existsSync(file)) {
            valuesToWrite = config.fileTemplate(langs[i], valuesArr);
            status = 'created';
          } else {
            const valuesFromFile = getValuesFromFile(file);
            const allValues = Object.assign({}, valuesFromFile, valuesArr);

            valuesToWrite = config.fileTemplate(langs[i], allValues);
            status = 'edit';
          }

          fs.writeFile(file, valuesToWrite, function(err) {
            if(err) {
              return console.log('Error: ' + err);
            }
            console.log(`${langs[i]}${withFilenames ? `_${filename}` : ''}.json was ${status} in ${jsonDir}`);
          });
        }
      } else {
        console.log('File ' + file + ' has no list ' + listNumber + '.\nTry another file or list.')
      }
    }
  });
});