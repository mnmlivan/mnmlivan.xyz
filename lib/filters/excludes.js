module.exports = (array, keyPath, value) => array.filter(item => {
  let data = item;
  for (const key of keyPath.split('.')) {
    data = data[key];
  }

  if (!data) {
    return false;
  }

  return (data === value ? false : item);
});
