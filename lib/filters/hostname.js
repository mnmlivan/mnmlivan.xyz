module.exports = (string) => {
  if (!string) {
    return;
  }

  return new URL(string).hostname.replace(/(?:www\.)?/g, '');
};
