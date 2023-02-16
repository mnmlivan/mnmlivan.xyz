const path = require('path');
const { absoluteUrl } = require('@11ty/eleventy-plugin-rss');
const markdown = require('../filters/markdown.js');
const templateContentToFeedHtml = require('../filters/entrytofeed.js');

module.exports = async (collection, app, n = 10) => {
  const items = collection.slice(0, n);

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: app.title,
    description: app.description,
    home_page_url: app.url,
    feed_url: absoluteUrl('feed.json', app.url),
    favicon: absoluteUrl(app.theme.favicon, app.url),
    icon: absoluteUrl(app.theme.icon, app.url),
    language: app.language,
    authors: [
      {
        name: app.author.name,
        url: app.author.url,
        avatar: app.author.avatar,
      },
    ],
    items: [],
  };

  for await (const item of items) {
    feed.items.push({
      id: absoluteUrl(item.url, app.url),
      url: absoluteUrl(item.url, app.url),
      date_published: item.date,
      ...(item.data.type !== 'entry-untitled' && { title: item.data.title }),
      summary: markdown(item.data.summary, 'inline'),
      content_html: await templateContentToFeedHtml(item),
      tags: item.data.category,
      external_url: item.data.bookmarkOf || item.data.inReplyTo || item.data.url,
      ...(item.data.photos && {
        attachments: item.data.photos.map((photo) => ({
          url: absoluteUrl(photo.url, app.url),
          title: photo.alt,
        })),
      }),
    });
  }

  const json = JSON.stringify(feed, null, 2);

  return json;
};
