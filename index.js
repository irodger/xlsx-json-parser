const xlsx = require('node-xlsx');
const fs = require('fs');

const DEFAULT_XLSX_DIRECTORY = './xlsx/';
const DEFAULT_JSON_DIRECTORY = './json/';
const DEFAULT_LIST_NUMBER  = 1;

/**
 * Get arguments from command line
 * >node index listNumber xlsxDir jsonDir
 */
const listNumber = typeof process.argv[2] !== 'undefined' ? parseInt(process.argv[2]) : DEFAULT_LIST_NUMBER;
const xlsxDir = typeof process.argv[3] !== 'undefined' ? process.argv[3] : DEFAULT_XLSX_DIRECTORY;
const jsonDir = typeof process.argv[4] !== 'undefined' ? process.argv[4] : DEFAULT_JSON_DIRECTORY;

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
          const file = `{\n "${langs[i]}": {\n    "translations": ${JSON.stringify(tt[`${langs[i]}`])}\n  }\n}`;

          fs.writeFile(`${jsonDir}/${langs[i]}_${filename}.json`, file, function(err) {
            if(err) {
              return console.log(err);
            }
            console.log(`${langs[i]}_${filename}.json was created in ${jsonDir}`);
          });
        }
      } else {
        console.log('File ' + file + ' has no list ' + listNumber + '.\nTry another file or list.')
      }
    }
  });
});
