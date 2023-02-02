require('dotenv').config();

const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');
const { EleventyRenderPlugin } = require('@11ty/eleventy');

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

  // Run Eleventy when these files change:
  eleventyConfig.addWatchTarget('./src/**/*.{jpg,jpeg,png,svg,webp}');
  eleventyConfig.addWatchTarget('./src/assets/css');

  // Official plugins
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-rss'));

  // Filters
  eleventyConfig.addFilter('datetime', require('./lib/filters/datetime.js'));
  eleventyConfig.addFilter('hostname', require('./lib/filters/hostname.js'));
  eleventyConfig.addFilter('limit', require('./lib/filters/limit.js'));
  eleventyConfig.addFilter('markdown', require('./lib/filters/markdown.js'));
  eleventyConfig.addLiquidFilter('absoluteUrl', require('@11ty/eleventy-plugin-rss').absoluteUrl);
  eleventyConfig.addLiquidFilter('dateToRfc3339', require('@11ty/eleventy-plugin-rss').dateToRfc3339);

  // Shortcodes

  // Collections
  eleventyConfig.addCollection('sitemap', require('./lib/collections/sitemap.js'));

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

    pathPrefix: '/',
  };
};
