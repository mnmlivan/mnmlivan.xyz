module.exports = (collectionApi) => {
  return collectionApi.getFilteredByGlob(['./src/notes/**/*.md']).sort((a, b) => {
    return b.date - a.date;
  });
};
