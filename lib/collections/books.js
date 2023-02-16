module.exports = (collectionApi) => {
  return collectionApi.getFilteredByGlob(['./src/books/**/*.md']).sort((a, b) => {
    return b.date - a.date;
  });
};
