const xlsx = require('node-xlsx');
const fs = require('fs');
const getValuesFromFile = require('./utils/getValuesFromFile');
const getValuesFromArray = require('./utils/getValuesFromArray');
const config = require('./utils/getConfig');

/**
 * Close app when folder with xlsx not found
 */
if (!fs.existsSync(config.xlsxDir)) {
  console.log(`Folder ${config.xlsxDir} with Excel files doesn't exist. Checking your config file or directory.`);
  process.exit();
}

/**
 * Creating json directory if doesn't exist
 */
try {
  fs.mkdirSync(config.jsonDir);
} catch(err) {
  // No need to do something
}

fs.readdir(config.xlsxDir, (err, files) => {
  files.forEach(file => {
    if (file.toString().includes('.xls')) {
      const filename = file.replace(/((.xlsx)|(.xls))/g, '');
      const excelArray = xlsx.parse(`${config.xlsxDir + file}`);

      const list = (listNumber) => {
        return typeof excelArray[listNumber - 1] !== 'undefined' ? excelArray[listNumber - 1] : console.log('List empty');
      };

      const currentList = list(config.listNumber);

      if (typeof currentList !== 'undefined' && currentList.data.length > 0) {
        const langs = currentList.data[0];
        const langsCount = langs.length;
        const tt = getValuesFromArray(currentList.data, langsCount);

        for (let i = 0; i < langs.length; i++) {
          const file = `${config.jsonDir + langs[i]}${config.withFilenames ? `_${filename}` : ''}.json`;
          let valuesArr = tt[`${langs[i]}`];
          let valuesToWrite, status;

          valuesToWrite = !fs.existsSync(file) ? valuesArr : Object.assign({}, getValuesFromFile(file), valuesArr);
          status = !fs.existsSync(file) ? 'created' : 'edited';
          valuesToWrite = config.fileTemplate(langs[i], valuesToWrite);

          try {
            fs.writeFileSync(file, valuesToWrite);

            console.log(`${langs[i]}${config.withFilenames ? `_${filename}` : ''}.json was ${status} in ${config.jsonDir}`);
          } catch(err) {
            return console.log('Error: ' + err);
          }
        }
      } else {
        return console.log('File ' + file + ' has no list ' + config.listNumber + '.\nTry another file or list.');
      }
    }
  });
});