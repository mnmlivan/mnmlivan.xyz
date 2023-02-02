const markdown = require('../libraries/markdown.js');
const normalise = require('../utils/normalise.js');

module.exports = (string, value) => {
  string = normalise(string, '');

  if (!string) {
    return;
  }

  if (value === 'inline') {
    return markdown.renderInline(string);
  }

  return markdown.render(string);
};
