module.exports = (collectionApi) => {
  return collectionApi.getAllSorted().filter(function (item) {
    // Only return content that was originally a markdown file
    let extension = item.inputPath.split('.').pop();
    return extension === 'md';
  });
};
