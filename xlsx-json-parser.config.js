const config = {
  xlsxDir: './xlsx/',
  jsonDir: './json/',
  listNumber: 1,
  fileTemplate(lang, array) {
    return `{\n "${lang}": {\n    "translations": ${JSON.stringify(array)}\n  }\n}`
  },
};

module.exports = config;