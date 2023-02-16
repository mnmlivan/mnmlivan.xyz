const { absoluteUrl, convertHtmlToAbsoluteUrls } = require('@11ty/eleventy-plugin-rss');
const hostname = require('../filters/hostname.js');

module.exports = async (item) => {
  const { app } = item.data;
  let content = '';

  if (item.data.inReplyTo) {
    content += `<p><small>↪︎ In reply to <a class="u-in-reply-to" href="${item.data.inReplyTo}">a post on ${hostname(
      item.data.inReplyTo
    )}</a></small></p>`;
  }

  content += item.templateContent.replace(/\n/g, '');

  if (item.data.layout === 'photo') {
    for (const photo of item.data.photos) {
      content += `<figure><img src="${absoluteUrl(photo.url, app.url)}" alt="${photo.alt}"></figure>`;
    }
  }

  if (item.data.type !== 'entry-untitled') {
    content += `<hr><p><a href="mailto:${app.author.email}?subject=Reply: ${item.data.title}">Reply via email</a></p>`;
  }

  const absolutePostUrl = new URL(item.url, app.url).href;
  content = await convertHtmlToAbsoluteUrls(content, absolutePostUrl);

  return content;
};
