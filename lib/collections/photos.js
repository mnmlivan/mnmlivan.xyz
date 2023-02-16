module.exports = (collectionApi) => {
  return collectionApi.getFilteredByGlob(['./src/photos/**/*.md']).sort((a, b) => {
    return b.date - a.date;
  });
};
