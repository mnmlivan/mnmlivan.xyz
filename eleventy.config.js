require('dotenv').config();

module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add('./src/**/template.md');

  // Liquid
  eleventyConfig.setLiquidOptions({
    globals: {
      app: require('./src/_data/app.js'),
      navigation: require('./src/_data/navigation.js'),
    },
    layouts: './src/_layouts',
  });

  // Copy the contents of the these folders to the output folder
  eleventyConfig.addPassthroughCopy('./src/assets/icons');
  eleventyConfig.addPassthroughCopy('./src/assets/img');
  eleventyConfig.addPassthroughCopy('./src/assets/fonts');
  eleventyConfig.addPassthroughCopy('./src/media');

  // Run Eleventy when these files change:
  eleventyConfig.addWatchTarget('./src/**/*.{jpg,jpeg,png,svg,webp}');
  eleventyConfig.addWatchTarget('./src/assets/css');

  // Official plugins
  eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-rss'));

  // Filters
  eleventyConfig.addFilter('datetime', require('./lib/filters/datetime.js'));
  eleventyConfig.addFilter('excludes', require('./lib/filters/excludes.js'));
  eleventyConfig.addFilter('groupby', require('./lib/filters/groupby.js'));
  eleventyConfig.addFilter('hostname', require('./lib/filters/hostname.js'));
  eleventyConfig.addFilter('htmlfeed', require('./lib/filters/entrytofeed.js'));
  eleventyConfig.addFilter('includes', require('./lib/filters/includes.js'));
  eleventyConfig.addFilter('limit', require('./lib/filters/limit.js'));
  eleventyConfig.addFilter('markdown', require('./lib/filters/markdown.js'));
  eleventyConfig.addFilter('syndication', require('./lib/filters/syndication.js'));
  eleventyConfig.addLiquidFilter('absoluteUrl', require('@11ty/eleventy-plugin-rss').absoluteUrl);
  eleventyConfig.addLiquidFilter('dateToRfc3339', require('@11ty/eleventy-plugin-rss').dateToRfc3339);

  // Shortcodes
  eleventyConfig.addShortcode('image', require('./lib/shortcodes/image.js'));
  eleventyConfig.addShortcode('jsonfeed', require('./lib/shortcodes/jsonfeed.js'));

  // Collections
  eleventyConfig.addCollection('articles', require('./lib/collections/articles.js'));
  eleventyConfig.addCollection('books', require('./lib/collections/books.js'));
  eleventyConfig.addCollection('category', require('./lib/collections/category.js'));
  eleventyConfig.addCollection('feed', require('./lib/collections/feed.js'));
  eleventyConfig.addCollection('notes', require('./lib/collections/notes.js'));
  eleventyConfig.addCollection('photos', require('./lib/collections/photos.js'));
  eleventyConfig.addCollection('sitemap', require('./lib/collections/sitemap.js'));
  eleventyConfig.addCollection('travel', require('./lib/collections/travel.js'));

  // Transforms
  eleventyConfig.addTransform('htmlmin', require('./lib/transforms/htmlmin.js'));

  // Extensions
  eleventyConfig.addExtension('css', require('./lib/extensions/css.js'));

  // Customize Markdown library settings.
  eleventyConfig.setLibrary('md', require('./lib/libraries/markdown.js'));

  // Emulate the file copy on the dev server.
  eleventyConfig.setServerPassthroughCopyBehavior('passthrough');

  return {
    templateFormats: ['css', 'liquid', 'md', '11ty.js'],

    dir: {
      input: 'src',
      output: '_site',
      data: '_data',
      includes: '_includes',
      layouts: '_layouts',
    },
  };
};
