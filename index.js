const xlsx = require('node-xlsx');
const fs = require('fs');
const config = require('./xlsx-json-parser.config.js');

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
  xlsxDir = val.includes('--xlsx=') ? parseInt(val.split('=')[1]) : config.xlsxDir;
  jsonDir = val.includes('--json=') ? parseInt(val.split('=')[1]) : config.jsonDir;
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

        function getValues (array) {
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

        const tt = getValues(currentList.data);

        /**
         * Write files
         */
        for (let i = 0; i < langs.length; i++) {
          const file = config.fileTemplate(langs[i], tt[`${langs[i]}`]);

          fs.writeFile(`${jsonDir}/${langs[i]}${withFilenames ? `_${filename}` : ''}.json`, file, function(err) {
            if(err) {
              return console.log(err);
            }
            console.log(`${langs[i]}${withFilenames ? `_${filename}` : ''}.json was created in ${jsonDir}`);
          });
        }
      } else {
        console.log('File ' + file + ' has no list ' + listNumber + '.\nTry another file or list.')
      }
    }
  });
});
