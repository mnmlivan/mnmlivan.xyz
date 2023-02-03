const webmentions = require('../../lib/utils/get-webmentions.js');

module.exports = {
  canonicalUrl: (data) => (data.canonical && data.canonical.url ? data.canonical.url : data.app.url + data.page.url),
  pageTitle: (data) => `${data.title} · ${data.app.title}`,
  pageDescription: (data) => `${data.summary}`,
  webmentions: data => {
    const url = data.app.url + data.page.url;
    return webmentions(data.webmentions.children, url);
  },
};
