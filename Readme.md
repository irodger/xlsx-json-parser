# xlsx-to-json
[![Build Status](https://travis-ci.org/irodger/i18next-xlsx-to-json.svg?branch=master)](https://travis-ci.org/irodger/i18next-xlsx-to-json)
[![NPM version](https://badge.fury.io/js/i18next-xlsx-to-json.svg)](http://badge.fury.io/js/i18next-xlsx-to-json)
[![Downloads](https://img.shields.io/npm/dm/i18next-xlsx-to-json.svg)](http://npm-stat.com/charts.html?package=i18next-xlsx-to-json)
[![License](https://img.shields.io/github/license/irodger/i18next-xlsx-to-json.svg?style=flat-square)](https://github.com/irodger/i18next-xlsx-to-json/blob/master/LICENSE)
[![Issues](https://img.shields.io/github/issues/irodger/i18next-xlsx-to-json.svg?style=flat-square)](https://github.com/irodger/i18next-xlsx-to-json/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/irodger/i18next-xlsx-to-json/pulls)

## Description and nuances
xlsx to JSON parser. Also support i18next format. Relies on node-xlsx.   
*Attention!* At this version parser rewrite exist files.

### Install
Sorry but no npm yet
```
git clone https://github.com/irodger/i18next-xlsx-to-json.git
```

### Usage
#### In command line
```
node i18next-xlsx-to-json
```

#### Using with arguments
```
node i18next-xlsx-to-json listNumber xlsxDir jsonDir
```
You can change default arguments in `config.js`

#### Config file
Config file looks like
```javascript
const config = {
  xlsxDir: './xlsx/',
  jsonDir: './json/',
  listNumber: 1,
  fileTemplate(lang, array) {
    return `{\n "${lang}": {\n    "translations": ${JSON.stringify(array)}\n  }\n}`
  },
};

module.exports = config;
```

##### Where
`xlsxDir` - default folder with xlsx files  
`jsonDir` - default folder for json files  
`listNumber` - Number of needed list in Excel file  
`fileTemplate` - method for set how json might looks, where `lang` - is current language for file, `array` - items for this langugae   

### i18next Format
By default keys for all langs parser get value from first lang
```json
{
  "lang": {
    "translations": {
      "key": "value",
      "another_key": "another value"
    }
  }
}
```
You can change format in `config.js`

### Files
Parser looks into `xlsxDir` and parse all xls/xlsx files.  
Return filenames looks like `{lang}_{xlsxFileName}.json`

### Xlsx format
To correct parsing you need next format - First row in xlsx file is for languages. Rows are for keys and values.