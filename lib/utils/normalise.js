module.exports = (value, defaultValue) => {
  if (value === null || value === undefined || value === false) {
    return defaultValue;
  }

  return value;
};
