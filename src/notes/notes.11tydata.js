module.exports = {
  layout: 'note',
  type: 'entry-untitled',
  permalink: 'notes/{{ page.fileSlug }}/',
  tags: ['post', 'note'],
  vocab: 'entry',
  eleventyComputed: {
    title: 'Бележка от {{ date | datetime: "dd LLLL yyyy" }} г. в {{ date | datetime: "HH:mm" }} ч.',
    summary: 'Бележка от {{ date | datetime: "dd LLLL yyyy" }} г. в {{ date | datetime: "HH:mm" }} ч.',
  },
};
