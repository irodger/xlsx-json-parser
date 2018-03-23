const getValuesFromArray = require('../utils/getValuesFromArray');
const getValuesFromFile = require('../utils/getValuesFromFile');
const recursiveSearchValues = require('../utils/recursiveSearchValues');
const path = require('path');
const mockArray = [
  ['one', 'two'],
  ['two', 4],
  ['three', true]
];

const file = path.resolve(__dirname, 'test.json');
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
    expect(getValuesFromArray(mockArray, 2)).toEqual(mockObject)
  });

  it('getValuesFromFile get values from json and return Object', () => {
    expect(getValuesFromFile(file)).toEqual(mockSecondObj)
  });

  it('getValuesFromFile return error when file not found', () => {
    expect(getValuesFromFile('test.json')).toEqual(false)
  });

  it('recursiveSearchValues return Array or Object with only first deepest childs', () => {
    expect(recursiveSearchValues(mockObject)).toEqual(mockSecondObj)
  });

  it('recursiveSearchValues return deepest children value' , () => {
    expect(recursiveSearchValues(mockSecondObj)).toEqual("three")
  })

  it('recursiveSearchValues return empty obj' , () => {
    expect(recursiveSearchValues(emptyObj)).toEqual(undefined)
  })
});