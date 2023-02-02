module.exports = {
  canonicalUrl: (data) => (data.canonical && data.canonical.url ? data.canonical.url : data.app.url + data.page.url),
  pageTitle: (data) => `${data.title} · ${data.app.title}`,
  pageDescription: (data) => `${data.summary}`,
};
