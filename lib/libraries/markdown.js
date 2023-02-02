const markdown = require('markdown-it');

module.exports = (() => {
  const options = {
    html: true,
    linkify: true,
    typographer: true,
    quotes: '„ “‘’',
  };

  const plugins = [
    require('markdown-it-abbr'),
    require('markdown-it-footnote'),
    require('markdown-it-sub'),
    require('markdown-it-sup'),
    require('./blockquote.js'),
    require('./footnote.js'),
  ];

  const parser = markdown(options);

  if (plugins) {
    for (const plugin of plugins) {
      if (Array.isArray(plugin)) {
        parser.use(...plugin);
      } else {
        parser.use(plugin);
      }
    }
  }

  return parser;
})();
