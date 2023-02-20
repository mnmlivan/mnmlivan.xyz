module.exports = (collectionApi) => {
  return collectionApi.getFilteredByGlob(['./src/articles/**/*.md', './src/travel/**/*.md']).sort((a, b) => {
    return b.date - a.date;
  });
};
