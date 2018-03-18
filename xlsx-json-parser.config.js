const config = {
  xlsxDir: './xlsx/',
  jsonDir: './json/',
  listNumber: 1,
  withFilenames: false,
  fileTemplate(lang, array) {
    return `
    {
      "${lang}": {
        "translations": ${JSON.stringify(array)}
      }
    }`
  },
};

module.exports = config;