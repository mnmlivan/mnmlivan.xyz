module.exports = (collectionApi) => {
  return collectionApi.getFilteredByGlob(['./src/articles/**/*.md']).sort((a, b) => {
    return b.date - a.date;
  });
};
