const getValuesFromArray = require('../utils/getValuesFromArray');
const getValuesFromFile = require('../utils/getValuesFromFile');
const recursiveSearchValues = require('../utils/recursiveSearchValues');
const getConfig = require('../utils/getConfig');
const path = process.cwd() + '/';

const mockArray = [
  ['one', 'two'],
  ['two', 4],
  ['three', true]
];

const file = path + '__tests__/test.json';
const mockObject = {
  "one":
    {
      "three": "three",
      "two": "two"
    },
  "two": {
    "three": true,
    "two": 4
  }
};

const mockSecondObj = {
  "three": "three",
  "two": "two"
};

const emptyObj = {};

describe('getValuesFromArray', () => {
  it('getValuesFromArray converting array to Object', () => {
    expect(getValuesFromArray(mockArray, 2)).toEqual(mockObject);
  });

  it('getValuesFromFile get values from json and return Object', () => {
    expect(getValuesFromFile(file)).toEqual(mockSecondObj);
  });

  it('getValuesFromFile without correct file return false', () => {
    expect(getValuesFromFile('/fake/' + file)).toEqual(false);
  });

  it('getValuesFromFile return error when file not found', () => {
    expect(getValuesFromFile('test.json')).toEqual(false);
  });

  it('recursiveSearchValues return Array or Object with only first deepest childs', () => {
    expect(recursiveSearchValues(mockObject)).toEqual(mockSecondObj);
  });

  it('recursiveSearchValues return deepest children value' , () => {
    expect(recursiveSearchValues(mockSecondObj)).toEqual("three");
  });

  it('recursiveSearchValues with empty object return undefined' , () => {
    expect(recursiveSearchValues(emptyObj)).toEqual(undefined);
  });

  it('is getConfig still object', () => {
    expect(typeof getConfig === 'object').toEqual(true);
  });

  it('getConfig contains json dir', () => {
    expect(getConfig.jsonDir).toEqual(path + 'json/');
  });

  it('getConfig contains xlsx dir', () => {
    expect(getConfig.xlsxDir).toEqual(path + 'xlsx/');
  });

  it('getConfig contains withFilenames argument', () => {
    expect(getConfig.withFilenames).toEqual(false);
  });

  it('getConfig contains listNumber argument', () => {
    expect(getConfig.listNumber).toEqual(1);
  });
});