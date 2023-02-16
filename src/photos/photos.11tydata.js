module.exports = {
  layout: 'photo',
  type: 'entry-untitled',
  permalink: 'photos/{{ page.fileSlug }}/',
  tags: ['post', 'photo'],
  vocab: 'entry',
  eleventyComputed: {
    title:
      '{% if photo.size > 1 -%}{{ photo.size }} снимки{% else %}Снимка{% endif %}: {{ date | datetime: "dd LLLL yyyy" }}',
  },
};
