# xlsx-json-parser
[![Build Status](https://travis-ci.org/irodger/xlsx-json-parser.svg?branch=master)](https://travis-ci.org/irodger/xlsx-json-parser)
[![NPM version](https://badge.fury.io/js/xlsx-json-parser.svg)](http://badge.fury.io/js/xlsx-json-parser)
[![Downloads](https://img.shields.io/npm/dm/xlsx-json-parser.svg)](http://npm-stat.com/charts.html?package=xlsx-json-parser)
[![License](https://img.shields.io/github/license/irodger/xlsx-json-parser.svg?style=flat-square)](https://github.com/irodger/xlsx-json-parser/blob/master/LICENSE)
[![Issues](https://img.shields.io/github/issues/irodger/xlsx-json-parser.svg?style=flat-square)](https://github.com/irodger/xlsx-json-parser/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/irodger/xlsx-json-parser/pulls)

## Description and nuances
xlsx to JSON parser. Also support i18next format. Relies on node-xlsx.   
*Attention!* At this version parser rewrite exist files.

### Install

```javascript
npm i xlsx-json-parser
```

### Usage
#### In command line
```javascript
node xlsx-json-parser
```

#### Using with arguments
```javascript
node xlsx-json-parser listNumber xlsxDir jsonDir
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