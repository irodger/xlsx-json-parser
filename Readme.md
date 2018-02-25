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
I hope append to exist files will be in next releases.

### Install

```javascript
npm i xlsx-json-parser
```

### Usage
#### In command line
```javascript
node xlsx-json-parser
```

#### You can add this line to your `package.json` in scripts section
```json
"scripts": {
    "xlsx-parse": "node node_modules/xlsx-json-parser"
  }
```
And when you need to parse xlsx type in your console `npm xlsx-parse`

#### Using with arguments
```javascript static
node xlsx-json-parser --ln=listNumber --xlsx=xlsxDir --json=jsonDir --wfn
```
##### Where
`--ln` - List number  
`--xlsx` - Path to xlxs
`--json` - Path to json  
`--wfn` - With file names for json files   
You can change default arguments in `xlsx-json-parser.config.js`

#### Config file
Config file `xlsx-json-parser.config.js` looks like
```javascript
const config = {
  xlsxDir: 'xlsx/',
  jsonDir: 'json/',
  listNumber: 1,
  withFilenames: false,
  fileTemplate(lang, array) {
    return `{\n "${lang}": {\n    "translations": ${JSON.stringify(array)}\n  }\n}`
  },
};

module.exports = config;
```
You can override it by put `xlsx-json-parser.config.js` to your directory

##### Where
`xlsxDir` - default folder with xlsx files  
`jsonDir` - default folder for json files  
`listNumber` - Number of needed list in Excel file  
`withFilenames` - Add to json files name of xlsx files if false, json files will be overwritten
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
You can change format in `xlsx-json-parser.config.js`

### Files
Parser looks into `xlsxDir` and parse all xls/xlsx files.  
Return filenames looks like `{lang}_{xlsxFileName}.json`

### Xlsx format
To correct parsing you need next format - First row in xlsx file is for languages. Rows are for keys and values.